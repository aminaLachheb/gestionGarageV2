"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActiviteController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ActiviteController = class ActiviteController {
    constructor(activiteRepository) {
        this.activiteRepository = activiteRepository;
    }
    async create(activite) {
        return this.activiteRepository.create(activite);
    }
    async count(where) {
        return this.activiteRepository.count(where);
    }
    async find(filter) {
        return this.activiteRepository.find({ order: ['date DESC'], limit: 5 });
    }
    async updateAll(activite, where) {
        return this.activiteRepository.updateAll(activite, where);
    }
    async findById(id, filter) {
        return this.activiteRepository.findById(id, filter);
    }
    async updateById(id, activite) {
        await this.activiteRepository.updateById(id, activite);
    }
    async replaceById(id, activite) {
        await this.activiteRepository.replaceById(id, activite);
    }
    async deleteById(id) {
        await this.activiteRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/activites'),
    rest_1.response(200, {
        description: 'Activite model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Activite) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Activite, {
                    title: 'NewActivite',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/activites/count'),
    rest_1.response(200, {
        description: 'Activite model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Activite)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/activites'),
    rest_1.response(200, {
        description: 'Array of Activite model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Activite, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Activite)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/activites'),
    rest_1.response(200, {
        description: 'Activite PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Activite, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Activite)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Activite, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/activites/{id}'),
    rest_1.response(200, {
        description: 'Activite model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Activite, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Activite, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/activites/{id}'),
    rest_1.response(204, {
        description: 'Activite PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Activite, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Activite]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/activites/{id}'),
    rest_1.response(204, {
        description: 'Activite PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Activite]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/activites/{id}'),
    rest_1.response(204, {
        description: 'Activite DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ActiviteController.prototype, "deleteById", null);
ActiviteController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.ActiviteRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ActiviteRepository])
], ActiviteController);
exports.ActiviteController = ActiviteController;
//# sourceMappingURL=activite.controller.js.map