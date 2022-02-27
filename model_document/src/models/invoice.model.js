"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Invoice = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const document_model_1 = require("./document.model");
const invoice_item_model_1 = require("./invoice-item.model");
const partner_details_model_1 = require("./partner-details.model");
let Invoice = class Invoice extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "supplierIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", partner_details_model_1.PartnerDetails)
], Invoice.prototype, "supplierDetails", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "clientIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", partner_details_model_1.PartnerDetails)
], Invoice.prototype, "clientDetails", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "documentIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "invoiceDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: invoice_item_model_1.InvoiceItem,
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "invoiceTotalWithoutTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "invoiceTotalWithTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "stampTax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "tvaRate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "totalTva", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Invoice.prototype, "totalDiscount", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string'
    }),
    tslib_1.__metadata("design:type", String)
], Invoice.prototype, "invoiceTotalinLetters", void 0);
tslib_1.__decorate([
    repository_1.hasOne(() => document_model_1.Document),
    tslib_1.__metadata("design:type", document_model_1.Document)
], Invoice.prototype, "document", void 0);
Invoice = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Invoice);
exports.Invoice = Invoice;
//# sourceMappingURL=invoice.model.js.map