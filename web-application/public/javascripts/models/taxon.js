define(["underscore"], function (_) {
    var Taxon = function (obj) {
        this.addAttributes(obj);
    };

    Taxon.prototype.defaults = {
        "scientificName": "",
        "scientificNameAuthorship": "",
        "habitat": null,
        "hasRank": "",
        "kingdom": "",
        "family": "",
        "genus": "",
        "phylum": "",
        "order": "",
        "synonyms": [],
        "acceptedNameUsage": "",
        "parentTaxon": null,
        "broader": null
    };

    Taxon.prototype.attributes = _.extend({}, Taxon.prototype.defaults);

    Taxon.prototype.addAttributes = function (obj) {
        var keys = _.keys(obj);
        var values = _.values(obj);
        for (var i = 0; i < keys.length; i++) {
            Taxon.prototype.attributes[keys[i]] = values[i];
        }
    };

    Taxon.prototype.getDetails = function () {
        return _.pick(this.attributes, "scientificName", "scientificNameAuthorship", "hasRank", "habitat", "acceptedNameUsage", "parentTaxon");
    };

    Taxon.prototype.getClassification = function () {
        var classification = _.omit(this.attributes, "class");
        classification.classe = this.attributes.class;
        return classification;
    };

    Taxon.prototype.getScientificName = function () {
        return this.attributes.scientificName;
    };

    Taxon.prototype.setSynonyms = function (synonyms) {
        this.attributes.synonyms = synonyms;
    };

    Taxon.prototype.getSynonyms = function () {
        return this.attributes.synonyms;
    };

    Taxon.prototype.getParentURI = function(){
        return this.attributes.broader;
    };
    
    return Taxon;
});