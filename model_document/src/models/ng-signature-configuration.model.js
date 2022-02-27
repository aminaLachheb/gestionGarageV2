"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgSignatureConfiguration = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ng_signer_configuration_model_1 = require("./ng-signer-configuration.model");
const ng_user_model_1 = require("./ng-user.model");
let NgSignatureConfiguration = class NgSignatureConfiguration extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_signer_configuration_model_1.NgSignerConfiguration)
], NgSignatureConfiguration.prototype, "signConf", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_user_model_1.NgUser)
], NgSignatureConfiguration.prototype, "observers", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NgSignatureConfiguration.prototype, "lang", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], NgSignatureConfiguration.prototype, "parallelSignatures", void 0);
NgSignatureConfiguration = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgSignatureConfiguration);
exports.NgSignatureConfiguration = NgSignatureConfiguration;
//# sourceMappingURL=ng-signature-configuration.model.js.map