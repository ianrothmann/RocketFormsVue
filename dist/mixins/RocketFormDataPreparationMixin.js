'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = {
    data: function data() {
        return {};
    },

    methods: {
        prepareDataForSubmission: function prepareDataForSubmission(data) {
            var _this = this;

            var newData = Object.assign({}, data);
            Object.keys(this.fieldSet).forEach(function (fieldId) {
                var field = _this.fieldSet[fieldId];
                if (field.dataType === 'file' || field.dataType === 'image') {
                    if (Array.isArray(data[fieldId])) {
                        delete newData[fieldId];
                        newData[fieldId] = data[fieldId][0];
                    }
                } else if (field.dataType === 'time') {
                    newData[fieldId] = Vue.filter('rwtime')(newData[fieldId]);
                }

                if (field.orderPivotField) {
                    var items = data[fieldId];
                    if (Array.isArray(items)) {
                        var _iteratorNormalCompletion = true;
                        var _didIteratorError = false;
                        var _iteratorError = undefined;

                        try {
                            for (var _iterator = items.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                var _ref = _step.value;

                                var _ref2 = _slicedToArray(_ref, 2);

                                var index = _ref2[0];
                                var item = _ref2[1];

                                if (!item.pivot) item.pivot = [];

                                item.pivot[field.orderPivotField] = index;
                            }
                        } catch (err) {
                            _didIteratorError = true;
                            _iteratorError = err;
                        } finally {
                            try {
                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }
                            } finally {
                                if (_didIteratorError) {
                                    throw _iteratorError;
                                }
                            }
                        }
                    }
                }
            });

            return newData;
        },
        prepareIncomingData: function prepareIncomingData(data) {
            var _this2 = this;

            Object.keys(this.fieldSet).forEach(function (fieldId) {
                var field = _this2.fieldSet[fieldId];

                if (field.dataType === 'file' || field.dataType === 'image') {
                    data[fieldId] = [data[fieldId]];
                } else if (field.dataType === 'date') {
                    if (_typeof(data[fieldId]) === 'object' && data[fieldId].date) {
                        data[fieldId] = Vue.filter('rdate')(data[fieldId].date, 'dbdate');
                    } else data[fieldId] = Vue.filter('rdate')(data[fieldId], 'dbdate');
                } else if (field.dataType === 'time') {
                    data[fieldId] = Vue.filter('rdate')(data[fieldId], 'time');
                } else if (field.dataType === 'datetime') {
                    data[fieldId] = Vue.filter('rdate')(data[fieldId], 'dbdatetime');
                }

                if (field.orderPivotField) {
                    var items = data[fieldId];
                    if (Array.isArray(items)) {
                        items.sort(function (a, b) {
                            return a.pivot[field.orderPivotField] - b.pivot[field.orderPivotField];
                        });
                    }
                }
            });

            return data;
        }
    }
};