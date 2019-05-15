define(["jquery", "./config", "./utils", "./models/taxon", "./views/datasets-list", "./views/details",
        "./views/synonyms", "text!../SPARQL/select_taxon.rq", "text!../SPARQL/select_parent.rq",
        "text!../SPARQL/select_name.rq", "text!../SPARQL/select_synonyms.rq", "text!../SPARQL/cmp_refname.rq",
        "text!../SPARQL/cmp_authors.rq", "text!../SPARQL/cmp_ranks.rq", "text!../SPARQL/cmp_habitats.rq",
        "text!../SPARQL/cmp_parent.rq", "text!../SPARQL/cmp_parent_worms.rq",
        "text!../SPARQL/cmp_parent_gbif.rq", "text!../SPARQL/check_synonyms.rq",
        "text!../SPARQL/cmp_synonyms.rq", "bootstrap"],
    function ($, config, utils, Taxon, DatasetsListView, DetailsView, SynonymsView, SelectQuery, ParentTaxonQuery, SelectNameQuery, SelectSynonymsQuery, CmpRefNamesQuery, CmpAuthorQuery, CmpRanksQuery,
              CmpHabitatsQuery, CmpParentTaxonQuery, CmpWoRMSParentTaxonQuery, CmpGBIFParentTaxonQuery,
              CheckSynonymsQuery, CmpSynonymsQuery) {
        var Application = function () {
            this.IDs = IDs;
        };

        Application.prototype.init = function () {
            if(!this.getConfig()){
                console.error("Configuration file is not complete.");
                return;
            }
            this.$el = $("#container");
            this.getExternalIDs();
        };

        Application.prototype.getConfig = function(){
            if(!config || !config.sparqlEndpoint || !config.microservices || !config.microservices.TAXREF) return false;
            this.sparqlEndPoint = config.sparqlEndpoint;
            this.taxrefServices = _.mapObject(config.microservices.TAXREF, function(val, key){
                return val + IDs.taxref;
            });
            this.services = _.omit(config.microservices, "TAXREF");
            return true;
        };

        Application.prototype.getExternalIDs = function () {
            var self = this;
            $.ajax({
                url: "https://taxref.mnhn.fr/api/taxa/" + this.IDs.taxref + "/externalIds",
                success: function (data) {
                    if (!data || !data._embedded || !data._embedded.externalDb) {
                        self.initContents();
                        return;
                    }
                    var IDObjs = data._embedded.externalDb;
                    for (var i in IDObjs) {
                        var obj = IDObjs[i];
                        self.IDs[obj.externalDbName] = obj.externalId;
                    }
                    self.initContents();
                }
            });
        };

        Application.prototype.initContents = function () {
            this.getTaxonData();
        };

        Application.prototype.getTaxonData = function () {
            var self = this;
            var compiled = _.template(SelectQuery);
            var query = compiled({service: this.taxrefServices.taxon});
            utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                if(!data.results || !data.results.bindings || data.results.bindings.length === 0) return;
                var dataObj = utils.getPropertyValueObject(data.results.bindings, "p", "o");
                var taxon = utils.convertURIValuesIntoString(dataObj);
                taxon.broader = taxon.broader ? taxon.broader.href : null;
                compiled = _.template(ParentTaxonQuery);
                var parentQuery = compiled({service: self.taxrefServices.classification, params: {parentUri: taxon.broader} });
                utils.executeQuery(self.sparqlEndPoint, parentQuery, function (data, status) {
                    var dataObj = utils.getPropertyValueObject(data.results.bindings, "p", "o");
                    taxon.parentTaxon = utils.convertURIValuesIntoString(dataObj);
                    self.createBlocks(taxon);
                }, function(){
                    self.createBlocks(taxon);
                });
            }, function(xhr, status, error){
                if(status === "parsererror"){
                    console.error("Error in the SPARQL micro-service response.", error)
                }else {
                    console.error("Error while querying the SPARQL endpoint.")
                }
            });
        };

        Application.prototype.createBlocks = function (taxObj) {
            this.taxon = new Taxon(taxObj);
            $("#title h1").text(this.taxon.getScientificName());
            this.detailsView = new DetailsView(this.taxon);
            this.$el.append(this.detailsView.getElement());
            this.addDatasetsList();
            this.addSynonyms();
            this.checkInfo();
            this.checkSynonyms();
        };

        Application.prototype.addDatasetsList = function () {
            var compiled = _.template(SelectNameQuery);
            var services = this.getAvailableServices("taxon");
            if (services.length === 0) {
                this.datasetsListView = new DatasetsListView();
                this.$el.prepend(this.datasetsListView.getElement());
                return;
            }
            var self = this;
            for (var i = 0; i < services.length; i++) {
                var query = compiled({
                    service: services[i]
                });
                utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                    if (data.results.bindings.length === 0) return;
                    var d = data.results.bindings[0];
                    d = _.mapObject(d, function (val, key) {
                        return val.value;
                    });
                    d.ID = self.IDs[d.service];
                    if (!self.datasetsListView) {
                        self.datasetsListView = new DatasetsListView([d]);
                        self.$el.prepend(self.datasetsListView.getElement());
                    } else {
                        self.datasetsListView.addDataset(d);
                    }

                }, function (xhr, status, error, args) {
                    var d = {
                        ID: self.IDs[args.service.label],
                        service : args.service.label,
                    };
                    if (!self.datasetsListView) {
                        self.datasetsListView = new DatasetsListView([d]);
                        self.$el.prepend(self.datasetsListView.getElement());
                    } else {
                        self.datasetsListView.addDataset(d);
                    }
                    self.notifyErrorResponse(args.service.label, "taxon");
                }, {service: services[i]})
            }
        };

        Application.prototype.addSynonyms = function () {
            var compiled = _.template(SelectSynonymsQuery);
            var query = compiled({service: this.taxrefServices.synonyms});
            var self = this;
            utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                var syns = utils.getSubjectPropertyValue(data.results.bindings, "s", "p", "o", true);
                var d = [];
                _.each(syns, function (value, key) {
                    d.push(value);
                });
                self.createSynonymsBlock(d);
            });
        };

        Application.prototype.createSynonymsBlock = function (synonyms) {
            this.taxon.setSynonyms(synonyms);
            this.synonymsView = new SynonymsView(this.taxon);
            this.$el.append(this.synonymsView.getElement());
        };

        Application.prototype.checkInfo = function () {
            this.checkReferenceNames();
            this.checkAuthors();
            this.checkRanks();
            this.checkHabitats();
            this.checkParentTaxon();
        };

        Application.prototype.checkReferenceNames = function () {
            var compiled = _.template(CmpRefNamesQuery);
            var services = this.getAvailableServices("taxon");
            var self = this;
            for (var i = 0; i < services.length; i++) {
                this.compareAttributeWithService("acceptedNameUsage", services[i], compiled, "reference name");
            }
        };

        Application.prototype.compareAttributeWithService = function (attribute, service, compiledQuery, label) {
            var self = this;
            var query = compiledQuery({
                mainService: this.taxrefServices.taxon,
                service: service
            });
            utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                var diff = utils.getPropertyValueObject(data.results.bindings, "service", "o");
                self.detailsView.highlightDifferencesOnAttribute(diff, attribute);
            }, function (xhr, status, error, args) {
                self.notifyErrorResponse(args.service.label, args.type);
            }, {service: service, type: label});
        };

        Application.prototype.checkAuthors = function () {
            var compiled = _.template(CmpAuthorQuery);
            var services = this.getAvailableServices("taxon");
            for (var i = 0; i < services.length; i++) {
                this.compareAttributeWithService("scientificNameAuthorship", services[i], compiled, "author");
            }
        };

        Application.prototype.checkRanks = function () {
            var compiled = _.template(CmpRanksQuery);
            var services = this.getAvailableServices("taxon");
            for (var i = 0; i < services.length; i++) {
                this.compareAttributeWithService("hasRank", services[i], compiled, "rank");
            }
        };

        Application.prototype.checkHabitats = function () {
            this.checkTaxrefHabitats();
            var a = this.getAvailableServices("habitats");
            for (var i = 0; i < a.length; i++) {
                this.addHabitatsFromService(a[i]);
            }
        };

        Application.prototype.checkParentTaxon = function () {
            var services = this.getAvailableServices("classification");
            var self = this;
            for (var i = 0; i < services.length; i++) {
                var compiled = null;
                if(services[i].label === "WoRMS"){
                    compiled = _.template(CmpWoRMSParentTaxonQuery);
                } else if (services[i].label === "GBIF") {
                    compiled = _.template(CmpGBIFParentTaxonQuery);
                } else{
                    compiled = _.template(CmpParentTaxonQuery);
                }
                var query = compiled({
                    mainService: this.taxrefServices.classification,
                    service: services[i],
                    params: {
                        serviceTaxonID: this.IDs[services[i].label],
                        urlParentID: this.getServiceUrl("GBIF", "taxon"),
                        parentUri: this.taxon.getParentURI()
                    }
                });
                utils.executeQuery(this.sparqlEndPoint, query, function (data, status, response, args) {
                    var diff = data.results ? data.results.bindings : null;
                    diff = utils.convertURIValuesIntoString(diff);
                    var d = {};
                    d[args.service.label] = diff;
                    self.detailsView.highlightParentTaxonDifferences(d);

                }, function (xhr, status, error, args) {
                    self.notifyErrorResponse(args.service.label, "parent");
                }, {service: services[i]});
            }
        };

        Application.prototype.checkTaxrefHabitats = function () {
            if (this.getAvailableServices("habitats").length === 0) return;
            var compiled = _.template(CmpHabitatsQuery);
            var services = this.getAvailableServices("habitats");
            var self = this;
            for (var i = 0; i < services.length; i++) {
                var query = compiled({
                    mainService: this.taxrefServices.habitats,
                    service: services[i]
                });
                utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                    var diff = utils.getPropertyValueObject(data.results.bindings, "service", "habitat");
                    self.detailsView.showHabitatsDisagreements(diff);
                })
            }
        };

        Application.prototype.addHabitatsFromService = function (service) {
            var compiled = _.template(CmpHabitatsQuery);
            var query = compiled({
                mainService: service.url,
                service: {url: this.taxrefServices.habitats, label: service.label}
            });
            var self = this;
            utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                var diff = utils.getPropertyValueObject(data.results.bindings, "service", "habitat");
                diff = utils.convertURIValuesIntoString(diff);
                self.detailsView.highlightHabitatsDifferences(diff);
            }, function (xhr, status) {
                self.notifyErrorResponse(service.label, "habitats");
            });
        };

        Application.prototype.resetDifferences = function () {
            this.detailsView.resetDifferences();
        };

        Application.prototype.checkSynonyms = function () {
            this.checkTaxrefSynonyms();
            var a = this.getAvailableServices("synonyms");
            for (var i = 0; i < a.length; i++) {
                this.addSynonymsFromService(a[i]);
            }
        };

        Application.prototype.checkTaxrefSynonyms = function () {
            var services = this.getAvailableServices("synonyms");
            var compiled = _.template(CheckSynonymsQuery);
            var self = this;
            for (var i = 0; i < services.length; i++) {
                var query = compiled({
                    mainService: this.taxrefServices.synonyms,
                    service: services[i]
                });
                utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                    var diff = utils.getPropertyValueObject(data.results.bindings, "name", "service");
                    self.synonymsView.showNonExistingSynonyms(diff);
                })
            }
        };

        Application.prototype.addSynonymsFromService = function (service) {
            var compiled = _.template(CmpSynonymsQuery);
            var query = compiled({
                mainService: this.taxrefServices.synonyms,
                service: service
            });
            var self = this;
            utils.executeQuery(this.sparqlEndPoint, query, function (data, status) {
                if (data.results.bindings && data.results.bindings.length > 0) {
                    var diff = {};
                    diff[service.label] = data.results.bindings;
                    self.synonymsView.addSuggestedSynonyms(diff[service.label], service.label);
                }
            }, function (xhr, status) {
                self.notifyErrorResponse(service.label, "synonyms");
            });
        };

        Application.prototype.getAvailableServices = function (type) {
            var availableServices = [];
            var self = this;
            _.each(this.IDs, function (value, key) {
                if (self.services.hasOwnProperty(key) && self.services[key][type]) {
                    availableServices.push({label: key, url: self.services[key][type] + value});
                }
            });
            return availableServices;
        };

        Application.prototype.getServiceUrl = function(service, type){
            return (this.services[service] && this.services[service][type] && this.IDs[service]) ? this.services[service][type] + this.IDs[service] : null;
        };

        Application.prototype.notifyErrorResponse = function (label, type) {
            this.datasetsListView.showNonWorkingServices(label, type);
        };

        var app = new Application();
        app.init();
    });