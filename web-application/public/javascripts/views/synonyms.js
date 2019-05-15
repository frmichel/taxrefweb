define(["underscore", "jquery", "./section", "text!../../templates/synonyms.html", "./suggValuesView"], function(_, $, SectionView, template, SuggestedValuesView){
    var SynonymsView = function(model){
        this.model = model;
        SectionView.apply(this, arguments);
    };

    SynonymsView.prototype = _.extend(SynonymsView.prototype, SectionView.prototype);

    SynonymsView.prototype.id = "synonyms";

    SynonymsView.prototype.template = template;

    SynonymsView.prototype.render = function(){
        var self = this;
        if (this.template) {
            var compiled = _.template(self.template);
            this.$el.html(compiled({scientificName: this.model.getScientificName(), data: this.model.getSynonyms()}));
        }
    };

    SynonymsView.prototype.addSuggestedSynonyms = function(synonyms, label){
        var suggestedSynonymsView = new SuggestedValuesView({values: synonyms, service: label});
        $(".suggested-syns-container").append(suggestedSynonymsView.getElement());
        $(".suggested-syns-container").addClass("show");
    };

    SynonymsView.prototype.showNonExistingSynonyms = function (diff) {
        _.each(diff, function (value, key) {
            $("li[name='" + key + "']").addClass("show-diff");
            var serviceSpan = "";
            if (typeof value === "string") {
                serviceSpan = "<span class='service-label'>" + value + "</span>";
                $("li[name='" + key + "'] .missing-services .service-container").append(serviceSpan)
            } else {
                for (var i = 0; i < value.length; i++) {
                    serviceSpan = "<span class='service-label'>" + value[i] + "</span>";
                    $("li[name='" + key + "'] .missing-services .service-container").append(serviceSpan)
                }
            }
        })
    };

    return SynonymsView;
});