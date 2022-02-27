"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceItem = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let InvoiceItem = class InvoiceItem extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "ref", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "name", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "code", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "quantity", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "PU", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number'
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceItem.prototype, "montantHT", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceItem.prototype, "tvaRate", void 0);
InvoiceItem = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], InvoiceItem);
exports.InvoiceItem = InvoiceItem;
//# sourceMappingURL=invoice-item.model.js.map