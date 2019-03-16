'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    data: function data() {
        return {};
    },

    methods: {
        getDefinition: function getDefinition() {
            var _this = this;

            var prepareDefinition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            return this.dataProvider({
                formType: this.formType,
                command: 'def'
            }).then(function (result) {
                if (prepareDefinition) _this.createRocketFormDefinition(result);else return result;
            });
        },
        getData: function getData() {
            var _this2 = this;

            var prepareData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

            if (!this.value) {
                console.error("RocketForm: No record ID provided. Please v-model or bind :value to the ID you want to edit. To add records, change the operation property to 'add' or 'add-edit'");
            } else {
                return this.dataProvider({
                    formType: this.formType,
                    command: 'get',
                    id: this.value
                }).then(function (data) {

                    if (prepareData) _this2.formData = _this2.prepareIncomingData(data);else return data;
                });
            }
        },
        submitData: function submitData(data) {
            if (this.isEditMode) {
                return this.saveRecord(data);
            } else {
                return this.createRecord(data);
            }
        },
        saveRecord: function saveRecord(data) {
            var _this3 = this;

            this.dataProvider({
                formType: 'edit',
                command: 'save',
                data: this.prepareDataForSubmission(data)
            }).then(function (data) {
                _this3.formData = _this3.prepareIncomingData(data);
                _this3.$emit('saved', data);
            });
        },
        deleteRecord: function deleteRecord() {
            var _this4 = this;

            this.dataProvider({
                formType: 'delete',
                command: 'delete',
                id: this.value
            }).then(function () {
                _this4.$emit('delete');
            });
        },
        createRecord: function createRecord(data) {
            var _this5 = this;

            this.dataProvider({
                formType: 'add',
                command: 'createThenEdit',
                data: this.prepareDataForSubmission(data)
            }).then(function (data) {
                _this5.prepareDataAndDefinition(data.def, data.data);
                _this5.$emit('input', _this5.formData[_this5.serverDefinition.primaryKey]);
                _this5.$emit('created', _this5.formData);
            });
        },
        getDataAndDefinition: function getDataAndDefinition() {
            var _this6 = this;

            if (!this.value) {
                console.error("Rocket: No record ID provided. Please v-model or bind :value to the ID you want to edit. To add records, change the operation property to 'add' or 'add-edit'");
            } else {
                return this.dataProvider({
                    formType: this.formType,
                    command: 'defGet',
                    id: this.value
                }).then(function (data) {
                    _this6.prepareDataAndDefinition(data.def, data.data);
                });
            }
        },
        prepareDataAndDefinition: function prepareDataAndDefinition(def, data) {
            this.definition = [];
            this.createRocketFormDefinition(def);
            this.formData = this.prepareIncomingData(data);
        }
    }
};