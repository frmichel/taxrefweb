define(["underscore", "jquery", "./section", "text!../../templates/add-syns.html"], function(_, $, SectionView, template){
    var SuggValuesView = function(data){
        this.data = data;
        SectionView.apply(this, arguments);
    };

    SuggValuesView.prototype = _.extend(SuggValuesView.prototype, SectionView.prototype);

    SuggValuesView.prototype.id = "";

    SuggValuesView.prototype.tagName = "div";

    SuggValuesView.prototype.className = "sugg-values";

    SuggValuesView.prototype.template = template;

    SuggValuesView.prototype.render = function(){
        var self = this;
        if (this.template) {
            var compiled = _.template(self.template);
            this.$el.html(compiled(self.data));
        }
    };


    return SuggValuesView;
});