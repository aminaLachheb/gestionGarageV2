"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const pdf = require('pdf-creator-node');
var download = require('file-download');
//@authenticate('jwt')
let DocumentController = class DocumentController {
    constructor(documentRepository, invoiceRepository) {
        this.documentRepository = documentRepository;
        this.invoiceRepository = invoiceRepository;
    }
    async create(document) {
        return this.documentRepository.create(document);
    }
    async count(where) {
        return this.documentRepository.count();
    }
    async countSigne(where) {
        return this.documentRepository.count(where = { etat: "signe" });
    }
    async countNonSigne(where) {
        return this.documentRepository.count(where = { etat: "non signe" });
    }
    async countProjetNonSigne(projet, where) {
        return this.documentRepository.count(where = { etat: "non signe", module: projet });
    }
    async countProjetSigne(projet, where) {
        return this.documentRepository.count(where = { etat: "signe", module: projet });
    }
    async find(filter) {
        return this.documentRepository.find(filter);
    }
    async updateAll(document, where) {
        return this.documentRepository.updateAll(document, where);
    }
    async findById(id, filter) {
        return this.documentRepository.findById(id, filter);
    }
    async updateById(id, document) {
        await this.documentRepository.updateById(id, document);
    }
    async replaceById(id, document) {
        await this.documentRepository.replaceById(id, document);
    }
    async deleteById(id) {
        await this.documentRepository.deleteById(id);
    }
    async download() {
        return;
    }
};
tslib_1.__decorate([
    rest_1.post('/documents'),
    rest_1.response(200, {
        description: 'Document model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Document) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, {
                    title: 'NewDocument',
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/documents/count'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/documents/signe'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "countSigne", null);
tslib_1.__decorate([
    rest_1.get('/documents/nonsigne'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "countNonSigne", null);
tslib_1.__decorate([
    rest_1.get('/documents/nonsigne/{projet}'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.path.string('projet')),
    tslib_1.__param(1, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "countProjetNonSigne", null);
tslib_1.__decorate([
    rest_1.get('/documents/signe/{projet}'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.path.string('projet')),
    tslib_1.__param(1, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "countProjetSigne", null);
tslib_1.__decorate([
    rest_1.get('/documents'),
    rest_1.response(200, {
        description: 'Array of Document model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Document, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/documents'),
    rest_1.response(200, {
        description: 'Document PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Document)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Document, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/documents/{id}'),
    rest_1.response(200, {
        description: 'Document model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Document, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/documents/{id}'),
    rest_1.response(204, {
        description: 'Document PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Document, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Document]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/documents/{id}'),
    rest_1.response(204, {
        description: 'Document PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Document]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/documents/{id}'),
    rest_1.response(204, {
        description: 'Document DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.get('/downloadDocument'),
    rest_1.response(200, {
        description: 'Document model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], DocumentController.prototype, "download", null);
DocumentController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DocumentRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.InvoiceRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DocumentRepository,
        repositories_1.InvoiceRepository])
], DocumentController);
exports.DocumentController = DocumentController;
//# sourceMappingURL=document.controller.js.map