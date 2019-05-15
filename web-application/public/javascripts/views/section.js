define(["jquery", "underscore"], function ($, _) {
    var SectionView = function () {
        this.initialize();
    };

    SectionView.prototype.tagName = "section";

    SectionView.prototype.className = "";

    SectionView.prototype.id = "";

    SectionView.prototype.template = null;

    SectionView.prototype.el = null;

    SectionView.prototype.$el = null;

    SectionView.prototype.model = null;

    SectionView.prototype.initialize = function () {
        this.initElement();
        this.render();
    };

    SectionView.prototype.initElement = function(){
        this.el = document.createElement(this.tagName);
        this.$el = $(this.el);
        this.$el.addClass(this.className);
        this.el.id = this.id;
    };

    SectionView.prototype.render = function () {

    };

    SectionView.prototype.getElement = function(){
      return this.el;
    };

    return SectionView;
});