define(["underscore", "jquery", "./section", "text!../../templates/datasets-list.html"], function(_, $, SectionView, template){
    var DatasetsListView = function(datasets){
        this.datasetsList = datasets;
        SectionView.apply(this, arguments);
    };

    DatasetsListView.prototype = _.extend(DatasetsListView.prototype, SectionView.prototype);

    DatasetsListView.prototype.id = "datasets-list";

    DatasetsListView.prototype.template = template;

    DatasetsListView.prototype.render = function(){
        var self = this;
        if (this.template) {
            var compiled = _.template(self.template);
            this.$el.html(compiled({data: this.datasetsList}));
        }
    };

    DatasetsListView.prototype.addDataset = function(dataset){
        this.datasetsList.push(dataset);
        this.render();
    };

    DatasetsListView.prototype.showNonWorkingServices = function (label, type) {
        $("#" + label + "-list").addClass("show-diff");
        $("#" + label + "-list .missing-services").prepend("<span>" + type + "</span>");
    };



    return DatasetsListView;
});