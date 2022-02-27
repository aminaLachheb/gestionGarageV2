"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgSignerConfiguration = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ng_document_config_model_1 = require("./ng-document-config.model");
const ng_redirection_url_model_1 = require("./ng-redirection-url.model");
let NgSignerConfiguration = class NgSignerConfiguration extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", Object)
], NgSignerConfiguration.prototype, "signer", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSignerConfiguration.prototype, "sigType", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSignerConfiguration.prototype, "mode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSignerConfiguration.prototype, "otp", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_document_config_model_1.NgDocumentConfig)
], NgSignerConfiguration.prototype, "docsConfigs", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], NgSignerConfiguration.prototype, "receiveDocument", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_redirection_url_model_1.NgRedirectionUrl)
], NgSignerConfiguration.prototype, "redirectionUrl", void 0);
NgSignerConfiguration = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgSignerConfiguration);
exports.NgSignerConfiguration = NgSignerConfiguration;
//# sourceMappingURL=ng-signer-configuration.model.js.map