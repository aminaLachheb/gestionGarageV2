"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgDocumentConfig = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let NgDocumentConfig = class NgDocumentConfig extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NgDocumentConfig.prototype, "page", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NgDocumentConfig.prototype, "xAxis", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NgDocumentConfig.prototype, "yAxis", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NgDocumentConfig.prototype, "identifier", void 0);
NgDocumentConfig = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgDocumentConfig);
exports.NgDocumentConfig = NgDocumentConfig;
//# sourceMappingURL=ng-document-config.model.js.map