"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocieteController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let SocieteController = class SocieteController {
    constructor(societeRepository) {
        this.societeRepository = societeRepository;
    }
    async create(societe) {
        return this.societeRepository.create(societe);
    }
    async count(where) {
        return this.societeRepository.count(where);
    }
    async find(filter) {
        return this.societeRepository.find(filter);
    }
    async updateAll(societe, where) {
        return this.societeRepository.updateAll(societe, where);
    }
    async findById(id, filter) {
        return this.societeRepository.findById(id, filter);
    }
    async updateById(id, societe) {
        await this.societeRepository.updateById(id, societe);
    }
    async replaceById(id, societe) {
        await this.societeRepository.replaceById(id, societe);
    }
    async deleteById(id) {
        await this.societeRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/societes'),
    rest_1.response(200, {
        description: 'Societe model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Societe) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Societe, {
                    title: 'NewSociete',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/societes/count'),
    rest_1.response(200, {
        description: 'Societe model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Societe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/societes'),
    rest_1.response(200, {
        description: 'Array of Societe model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Societe, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Societe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/societes'),
    rest_1.response(200, {
        description: 'Societe PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Societe, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Societe)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Societe, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/societes/{id}'),
    rest_1.response(200, {
        description: 'Societe model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Societe, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Societe, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/societes/{id}'),
    rest_1.response(204, {
        description: 'Societe PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Societe, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Societe]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/societes/{id}'),
    rest_1.response(204, {
        description: 'Societe PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Societe]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/societes/{id}'),
    rest_1.response(204, {
        description: 'Societe DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], SocieteController.prototype, "deleteById", null);
SocieteController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.SocieteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.SocieteRepository])
], SocieteController);
exports.SocieteController = SocieteController;
//# sourceMappingURL=societe.controller.js.map