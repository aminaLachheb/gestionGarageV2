"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const pdf2base64 = require('pdf-to-base64');
const pdf = require('pdf-creator-node');
const { ToWords } = require('to-words');
const axios = require('axios');
let InvoiceController = class InvoiceController {
    constructor(invoiceRepository, documentRepository, societeRepository) {
        this.invoiceRepository = invoiceRepository;
        this.documentRepository = documentRepository;
        this.societeRepository = societeRepository;
    }
    async create(invoice) {
        const toWords = new ToWords({
            localeCode: 'fr-FR',
            converterOptions: {
                ignoreDecimal: false,
                ignoreZeroCurrency: false,
            }
        });
        var total = 0;
        for (let item of invoice.items) {
            item.montantHT = item.quantity * item.PU;
            total += item.montantHT;
        }
        var societes = await this.societeRepository.find();
        invoice.supplierDetails = new models_1.PartnerDetails();
        invoice.supplierDetails.partnerName = societes[0].nomSociete;
        invoice.supplierDetails.rib = societes[0].rib;
        invoice.supplierDetails.formeJuridique = societes[0].formeJuridique;
        invoice.supplierDetails.rc = societes[0].respCivile;
        invoice.supplierDetails.codeTVA = societes[0].codeTVA;
        invoice.supplierDetails.address = new models_1.Addresse();
        invoice.supplierDetails.address = societes[0].address;
        invoice.supplierDetails.site = societes[0].site;
        invoice.supplierDetails.fax = societes[0].fax;
        invoice.supplierDetails.tel = societes[0].tel;
        invoice.stampTax = 0.600;
        invoice.invoiceTotalWithoutTax = parseFloat(total.toFixed(3));
        invoice.totalTva = parseFloat(((invoice.invoiceTotalWithoutTax * invoice.tvaRate) / 100).toFixed(3));
        invoice.invoiceTotalWithTax = parseFloat((invoice.invoiceTotalWithoutTax + invoice.totalTva + invoice.stampTax).toFixed(3));
        invoice.invoiceTotalinLetters = toWords.convert(invoice.invoiceTotalWithTax);
        var identifiant = (await this.invoiceRepository.create(invoice)).id;
        var body = (await this.invoiceRepository.findById(identifiant));
        var html = fs_1.default.readFileSync('src/template.html', 'utf8');
        var options = {
            format: "A3",
            orientation: "portrait",
            type: "pdf",
            displayHeaderFooter: false,
        };
        var output = {
            html: html,
            data: {
                invoices: await body,
            },
            path: "public/storage/" + (await body).documentIdentifier + ".pdf",
        };
        var document = new models_1.Document();
        pdf.create(output, options)
            .then((res) => {
            console.log(res);
        })
            .catch((error) => {
            console.error(error);
        });
        document.id = (await this.documentRepository.count()).count + 1;
        document.size = fs_1.default.statSync('public/storage/' + body.documentIdentifier + '.pdf').size / 1024;
        document.name = body.documentIdentifier;
        document.etat = "non signe";
        document.extension = "pdf";
        document.invoiceId = identifiant;
        document.module = body.clientDetails.partnerName;
        //console.log(document);
        return this.documentRepository.create(document);
        //DocumentController.prototype.createNew(identifiant?.toString());
    }
    async count(where) {
        return this.invoiceRepository.count(where);
    }
    async find(filter) {
        return this.invoiceRepository.find(filter);
    }
    async updateAll(invoice, where) {
        return this.invoiceRepository.updateAll(invoice, where);
    }
    async findById(id, filter) {
        return this.invoiceRepository.findById(id, filter);
    }
    async updateById(id, invoice) {
        await this.invoiceRepository.updateById(id, invoice);
    }
    async replaceById(id, invoice) {
        await this.invoiceRepository.replaceById(id, invoice);
    }
    async deleteById(id) {
        await this.invoiceRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/invoices'),
    rest_1.response(200, {
        description: 'Invoice model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Invoice) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Invoice, {
                    title: 'NewInvoice',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/invoices/count'),
    rest_1.response(200, {
        description: 'Invoice model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Invoice)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/invoices'),
    rest_1.response(200, {
        description: 'Array of Invoice model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Invoice, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Invoice)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/invoices'),
    rest_1.response(200, {
        description: 'Invoice PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Invoice, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Invoice)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Invoice, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/invoices/{id}'),
    rest_1.response(200, {
        description: 'Invoice model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Invoice, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Invoice, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/invoices/{id}'),
    rest_1.response(204, {
        description: 'Invoice PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Invoice, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Invoice]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/invoices/{id}'),
    rest_1.response(204, {
        description: 'Invoice PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Invoice]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/invoices/{id}'),
    rest_1.response(204, {
        description: 'Invoice DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceController.prototype, "deleteById", null);
InvoiceController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InvoiceRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.DocumentRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.SocieteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InvoiceRepository,
        repositories_1.DocumentRepository,
        repositories_1.SocieteRepository])
], InvoiceController);
exports.InvoiceController = InvoiceController;
//# sourceMappingURL=invoice.controller.js.map