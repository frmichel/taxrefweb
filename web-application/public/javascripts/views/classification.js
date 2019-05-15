define(["underscore", "jquery", "./section", "text!../../templates/classification.html"], function(_, $, SectionView, template){
    var ClassificationView = function(model, app){
        this.model = model;
        this.app = app;
        SectionView.apply(this, arguments);
    };

    ClassificationView.prototype = _.extend(ClassificationView.prototype, SectionView.prototype);

    ClassificationView.prototype.id = "classification";

    ClassificationView.prototype.template = template;

    ClassificationView.prototype.render = function(){
        var self = this;
        if (this.template) {
            var compiled = _.template(self.template);
            this.$el.html(compiled(self.model.getClassification()));
        }

    };

    ClassificationView.prototype.resetDifferences = function(){
        $("#"+this.id+" li.show-diff").removeClass("show-diff");
    };

    return ClassificationView;
});