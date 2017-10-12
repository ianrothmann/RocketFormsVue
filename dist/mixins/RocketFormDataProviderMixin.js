"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    props: {
        url: {
            required: true,
            type: String
        }
    },
    data: function data() {
        return {
            loading: false
        };
    },

    methods: {
        dataProvider: function dataProvider(command) {
            var _this = this;

            this.loading = true;
            return this.$http.post(this.url, command).then(function (response) {
                _this.loading = false;
                return response.body;
            }).catch(function (err) {
                console.error(err);
                _this.loading = false;
            });
        }
    },
    mounted: function mounted() {}
};