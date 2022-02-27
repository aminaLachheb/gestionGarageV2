"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDocumentController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let InvoiceDocumentController = class InvoiceDocumentController {
    constructor(invoiceRepository) {
        this.invoiceRepository = invoiceRepository;
    }
    async get(id, filter) {
        return this.invoiceRepository.document(id).get(filter);
    }
    async create(id, document) {
        return this.invoiceRepository.document(id).create(document);
    }
    async patch(id, document, where) {
        return this.invoiceRepository.document(id).patch(document, where);
    }
    async delete(id, where) {
        return this.invoiceRepository.document(id).delete(where);
    }
};
tslib_1.__decorate([
    rest_1.get('/invoices/{id}/document', {
        responses: {
            '200': {
                description: 'Invoice has one Document',
                content: {
                    'application/json': {
                        schema: rest_1.getModelSchemaRef(models_1.Document),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceDocumentController.prototype, "get", null);
tslib_1.__decorate([
    rest_1.post('/invoices/{id}/document', {
        responses: {
            '200': {
                description: 'Invoice model instance',
                content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Document) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, {
                    title: 'NewDocumentInInvoice',
                    exclude: ['identifier'],
                    optional: ['invoiceId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceDocumentController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.patch('/invoices/{id}/document', {
        responses: {
            '200': {
                description: 'Invoice.Document PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Document))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceDocumentController.prototype, "patch", null);
tslib_1.__decorate([
    rest_1.del('/invoices/{id}/document', {
        responses: {
            '200': {
                description: 'Invoice.Document DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', rest_1.getWhereSchemaFor(models_1.Document))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceDocumentController.prototype, "delete", null);
InvoiceDocumentController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InvoiceRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InvoiceRepository])
], InvoiceDocumentController);
exports.InvoiceDocumentController = InvoiceDocumentController;
//# sourceMappingURL=invoice-document.controller.js.map