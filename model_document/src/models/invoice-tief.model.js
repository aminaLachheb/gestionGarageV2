"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceTief = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const invoice_item_model_1 = require("./invoice-item.model");
const partner_details_model_1 = require("./partner-details.model");
let InvoiceTief = class InvoiceTief extends repository_1.Entity {
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
], InvoiceTief.prototype, "supplierIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", partner_details_model_1.PartnerDetails)
], InvoiceTief.prototype, "supplierDetails", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceTief.prototype, "clientIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", partner_details_model_1.PartnerDetails)
], InvoiceTief.prototype, "clientDetails", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceTief.prototype, "documentIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", Date)
], InvoiceTief.prototype, "invoiceDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: invoice_item_model_1.InvoiceItem,
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], InvoiceTief.prototype, "items", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "invoiceTotalWithoutTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "invoiceTotalWithTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "invoiceTotalTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], InvoiceTief.prototype, "invoiceTotalinLetters", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "stampTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "tvaRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "tvaTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], InvoiceTief.prototype, "totalDiscount", void 0);
InvoiceTief = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], InvoiceTief);
exports.InvoiceTief = InvoiceTief;
//# sourceMappingURL=invoice-tief.model.js.map