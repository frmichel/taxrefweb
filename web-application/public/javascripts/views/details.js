define(["underscore", "jquery", "./section", "text!../../templates/details.html", "text!../../templates/list-diff.html"],
    function (_, $, SectionView, template, listDiffTempl) {
    var DetailsView = function (model) {
        this.model = model;
        this.differences = {};
        this.listDiffTemplate = _.template(listDiffTempl);
        SectionView.apply(this, arguments);
    };

    DetailsView.prototype = _.extend(DetailsView.prototype, SectionView.prototype);

    DetailsView.prototype.id = "overview";

    DetailsView.prototype.template = template;

    DetailsView.prototype.render = function () {
        var self = this;
        if (this.template) {
            var compiled = _.template(self.template);
            this.$el.html(compiled(this.model.getDetails()));
        }
    };

    DetailsView.prototype.resetDifferences = function () {
        $("#" + this.id + " li.show-diff").removeClass("show-diff");
    };

    DetailsView.prototype.showHabitatsDisagreements = function (differences) {
        if (!differences || !_.isObject(differences)) return;
        $("li#habitat").addClass("show-diff");
        _.each(differences, function (val, key) {
            $("a[href='" + val + "']").addClass("error");
        })

    };

    DetailsView.prototype.highlightHabitatsDifferences = function(differences){
        if (differences) {
            var html = "";
            _.each(differences, function (obj, service) {
                html = html + "<a href='" + obj.href + "'>" + obj.label + "</a> &nbsp;";
            });
            if (!this.differences["habitat"]) {
                this.differences["habitat"] = [];
            }
            this.differences["habitat"].push({service: _.keys(differences)[0], attrValue: html});
            this.highlightDifferences(this.differences)
        }
    };

    DetailsView.prototype.highlightDifferencesOnAttribute = function(diff, attribute){
        var self = this;
        if (diff) {
            _.each(diff, function (value, key) {
                if (!self.differences[attribute]) {
                    self.differences[attribute] = [];
                }
                self.differences[attribute].push({service: key, attrValue: value});
            });
            this.highlightDifferences(this.differences);
        }
    };

    DetailsView.prototype.highlightDifferences = function(diff){
        var self = this;
        _.each(diff, function (attributeDiffArray, attribute) {
            $("#" + attribute + "Collapse").html(self.listDiffTemplate({data: attributeDiffArray}));
            $("li#" + attribute).addClass("show-diff");
        })
    };

    DetailsView.prototype.highlightParentTaxonDifferences = function(d){
        var service = _.keys(d)[0];
        var diff = d[service];
        if (diff) {
            if (!this.differences["parentTaxon"]) {
                this.differences["parentTaxon"] = [];
            }
            for (var j = 0; j < diff.length; j++) {
                var html = "<a href='"+ (diff[j].page ? diff[j].page.value.href : "#")+"'>"+diff[j].name.value+" &nbsp;("+diff[j].rank.value.label+") </a>";
                this.differences["parentTaxon"].push({service: service, attrValue: html});
                this.highlightDifferences(this.differences);
            }
        }
    };

    return DetailsView;
});