"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgDocument = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let NgDocument = class NgDocument extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NgDocument.prototype, "size", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgDocument.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgDocument.prototype, "extension", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NgDocument.prototype, "identifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], NgDocument.prototype, "pdfA", void 0);
NgDocument = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgDocument);
exports.NgDocument = NgDocument;
//# sourceMappingURL=ng-document.model.js.map