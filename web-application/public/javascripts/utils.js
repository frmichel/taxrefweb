define(["jquery"], function ($) {
    var utils = {
        /**
         * Given the bindings array of a JSON response to a SPARQL query, return an object whose keys are the values
         * of the variable indicated by propLabel, and values are the ones of the variable indicated by valLabel.
         *
         * @param {Array} data - array of bindings
         * @param {string} propLabel - name of the variable whose values will be the keys of the returned object
         * @param {string} valLabel- name of the variable whose values will be the values of the returned object
         * @returns {Object.<string, string>} obj
         */
        getPropertyValueObject: function (data, propLabel, valLabel) {
            if (!data || data.length == 0) return null;
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                var key = data[i][propLabel].value;
                var n = key.lastIndexOf("/");
                key = key.substr(n + 1);
                if (key.indexOf("#") != -1) {
                    n = key.lastIndexOf("#");
                    key = key.substr(n + 1);
                }
                if (obj[key]) {
                    if (!Array.isArray(obj[key])) {
                        var temp = obj[key];
                        obj[key] = [];
                        obj[key].push(temp);
                    }
                    obj[key].push(data[i][valLabel].value);
                } else {
                    obj[key] = data[i][valLabel].value;
                }
            }
            return obj;
        },
        getSubjectPropertyValue: function (data, subjectLabel, propLabel, valLabel, useSubURI = false, usePropURI = false) {
            if (!data || data.length == 0) return null;
            var obj = {};
            for (var i = 0; i < data.length; i++) {
                var sub = data[i][subjectLabel].value;
                if (!useSubURI) {
                    var n = sub.lastIndexOf("/");
                    sub = sub.substr(n + 1);
                    if (sub.indexOf("#") != -1) {
                        n = sub.lastIndexOf("#");
                        sub = sub.substr(n + 1);
                    }
                }

                var key = data[i][propLabel].value;
                if (!usePropURI) {
                    n = key.lastIndexOf("/");
                    key = key.substr(n + 1);
                    if (key.indexOf("#") != -1) {
                        n = key.lastIndexOf("#");
                        key = key.substr(n + 1);
                    }
                }
                if (!obj[sub]) {
                    obj[sub] = {};
                }
                if (obj[sub][key]) {
                    if (!Array.isArray(obj[sub][key])) {
                        var temp = obj[sub][key];
                        obj[sub][key] = [];
                        obj[sub][key].push(temp);
                    }
                    obj[sub][key].push(data[i][valLabel].value);
                } else {
                    obj[sub][key] = data[i][valLabel].value;
                }
            }
            return obj;
        },
        /**
         * Given an object, substitute string values that are URIs with an object having a label (last part of the URI)
         * and href (URI itself)
         * @param {Object<string, string|int|object>} data
         * @returns {Object}
         */
        convertURIValuesIntoString: function (data) {
            if(!data || !_.isObject(data)) return null;
            var d = _.clone(data);
            _.each(data, function (val, key) {
                if (typeof  val === "object"){
                    d[key] = utils.convertURIValuesIntoString(val);
                }
                if (typeof val !== "string")
                    return;
                var n = val.lastIndexOf("/");
                if (n == -1)
                    return;
                var label = val.substr(n + 1);
                if (label.indexOf("#") != -1) {
                    n = label.lastIndexOf("#");
                    label = label.substr(n + 1);
                }
                d[key] = {label: label, href: val};
            });
            return d;
        },
        /**
         * Execute a SPARQL query through the specified endpoint
         * @param {string} endpoint - the URL of the SPARQL endpoint to query
         * @param {string} query - the SPARQL query to execute
         * @param {function(*, string, *, object)} successCallback
         * @param {function(*, string, string, object)} errorCallback
         * @param {Object} args - an object containing the parameters to be passed to success and error callbacks
         */
        executeQuery: function (endpoint, query, successCallback, errorCallback, args) {
            var url = endpoint + "?query=" + encodeURIComponent(query);
            $.ajax({
                headers: {
                    Accept: "application/sparql-results+json"
                },
                url: url,
                success: function(data, status, response){
                    successCallback(data, status, response, args);
                },
                error: errorCallback ? function(xhr, status, error){
                    errorCallback(xhr, status, error, args)
                } : null
            });
        }
    };

    return utils;
});