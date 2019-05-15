requirejs.config({
    baseUrl: 'public/javascripts/',
    paths:{
        jquery: './libs/jquery-3.3.1.min',
        underscore: './libs/underscore-min',
        bootstrap: './libs/bootstrap/bootstrap.bundle.min',
        text: './libs/text',
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        'bootstrap': {
            deps: ['jquery']
        }
    }
});
// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['./application']);