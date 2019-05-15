define(["underscore", "jquery", "text!../../templates/advdiff.html"], function(_, $, template){
    var AdvertiseDifferencesView = function(){
        this.initialize();
    };

    AdvertiseDifferencesView.prototype.tagName = "div";

    AdvertiseDifferencesView.prototype.className = "modal";

    AdvertiseDifferencesView.prototype.id = "adv-diff";

    AdvertiseDifferencesView.prototype.template = template;

    AdvertiseDifferencesView.prototype.el = null;

    AdvertiseDifferencesView.prototype.$el = null;

    AdvertiseDifferencesView.prototype.initialize = function () {
        this.initElement();
    };

    AdvertiseDifferencesView.prototype.initElement = function(){
        this.el = document.createElement(this.tagName);
        this.$el = $(this.el);
        this.el.tabindex = -1;
        this.el.role = "dialog";
        this.$el.addClass(this.className);
        this.el.id = this.id;
        this.compiledTemplate = _.template(this.template);
    };

    AdvertiseDifferencesView.prototype.render = function () {
        this.$el.html(this.compiledTemplate(this.currentData));
        this.addEvents();
    };

    AdvertiseDifferencesView.prototype.getElement = function(){
        return this.el;
    };

    AdvertiseDifferencesView.prototype.show = function(diff){
        this.currentData = diff;
        this.render();
        this.$el.addClass("show");
    };

    AdvertiseDifferencesView.prototype.hide = function(){
        this.$el.removeClass("show");
    };

    AdvertiseDifferencesView.prototype.addEvents = function(){
        var self = this;
        $("[data-dismiss='modal']").on("click", function(){
            self.hide();
        })
    };

    return AdvertiseDifferencesView;

});