"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceTiefController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let InvoiceTiefController = class InvoiceTiefController {
    constructor(invoiceTiefRepository) {
        this.invoiceTiefRepository = invoiceTiefRepository;
    }
    async create(invoiceTief) {
        return this.invoiceTiefRepository.create(invoiceTief);
    }
    async count(where) {
        return this.invoiceTiefRepository.count(where);
    }
    async find(filter) {
        return this.invoiceTiefRepository.find(filter);
    }
    async updateAll(invoiceTief, where) {
        return this.invoiceTiefRepository.updateAll(invoiceTief, where);
    }
    async findById(id, filter) {
        return this.invoiceTiefRepository.findById(id, filter);
    }
    async updateById(id, invoiceTief) {
        await this.invoiceTiefRepository.updateById(id, invoiceTief);
    }
    async replaceById(id, invoiceTief) {
        await this.invoiceTiefRepository.replaceById(id, invoiceTief);
    }
    async deleteById(id) {
        await this.invoiceTiefRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/invoice-tiefs'),
    rest_1.response(200, {
        description: 'InvoiceTief model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.InvoiceTief) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.InvoiceTief, {
                    title: 'NewInvoiceTief',
                    exclude: ['documentIdentifier'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/invoice-tiefs/count'),
    rest_1.response(200, {
        description: 'InvoiceTief model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.InvoiceTief)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/invoice-tiefs'),
    rest_1.response(200, {
        description: 'Array of InvoiceTief model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.InvoiceTief, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.InvoiceTief)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/invoice-tiefs'),
    rest_1.response(200, {
        description: 'InvoiceTief PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.InvoiceTief, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.InvoiceTief)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.InvoiceTief, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/invoice-tiefs/{id}'),
    rest_1.response(200, {
        description: 'InvoiceTief model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.InvoiceTief, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.InvoiceTief, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/invoice-tiefs/{id}'),
    rest_1.response(204, {
        description: 'InvoiceTief PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.InvoiceTief, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.InvoiceTief]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/invoice-tiefs/{id}'),
    rest_1.response(204, {
        description: 'InvoiceTief PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.InvoiceTief]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/invoice-tiefs/{id}'),
    rest_1.response(204, {
        description: 'InvoiceTief DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], InvoiceTiefController.prototype, "deleteById", null);
InvoiceTiefController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.InvoiceTiefRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.InvoiceTiefRepository])
], InvoiceTiefController);
exports.InvoiceTiefController = InvoiceTiefController;
//# sourceMappingURL=invoice-tief.controller.js.map