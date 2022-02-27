"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiturController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let VoiturController = class VoiturController {
    constructor(voitureRepository) {
        this.voitureRepository = voitureRepository;
    }
    async create(voiture) {
        return this.voitureRepository.create(voiture);
    }
    async count(where) {
        return this.voitureRepository.count(where);
    }
    async find(filter) {
        return this.voitureRepository.find(filter);
    }
    async updateAll(voiture, where) {
        return this.voitureRepository.updateAll(voiture, where);
    }
    async countDispo(where) {
        return this.voitureRepository.count(where = { status: "disponible" });
    }
    async countnonDispo(where) {
        return this.voitureRepository.count(where = { status: "vendu" });
    }
    async countVoitureNonDispo(employe, where) {
        return this.voitureRepository.count(where = { status: "vendu", employe: employe });
    }
    async countVoitureDispo(employe, where) {
        return this.voitureRepository.count(where = { status: "disponible", employe: employe });
    }
    async findById(id, filter) {
        return this.voitureRepository.findById(id, filter);
    }
    async updateById(id, voiture) {
        await this.voitureRepository.updateById(id, voiture);
    }
    async replaceById(id, voiture) {
        await this.voitureRepository.replaceById(id, voiture);
    }
    async deleteById(id) {
        await this.voitureRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    rest_1.post('/voitures'),
    rest_1.response(200, {
        description: 'Voiture model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.Voiture) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Voiture, {
                    title: 'NewVoiture',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/voitures/count'),
    rest_1.response(200, {
        description: 'Voiture model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/voitures'),
    rest_1.response(200, {
        description: 'Array of Voiture model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.Voiture, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/voitures'),
    rest_1.response(200, {
        description: 'Voiture PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Voiture, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Voiture, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/voitures/dispo'),
    rest_1.response(200, {
        description: 'voiture model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "countDispo", null);
tslib_1.__decorate([
    rest_1.get('/voitures/nonDispo'),
    rest_1.response(200, {
        description: 'voiture model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "countnonDispo", null);
tslib_1.__decorate([
    rest_1.get('/voitures/nonDispo/{employe}'),
    rest_1.response(200, {
        description: 'voiture_ model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.path.string('employe')),
    tslib_1.__param(1, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "countVoitureNonDispo", null);
tslib_1.__decorate([
    rest_1.get('/voitures/dispo/{employe}'),
    rest_1.response(200, {
        description: 'voiture_ model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.path.string('employe')),
    tslib_1.__param(1, rest_1.param.where(models_1.Voiture)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "countVoitureDispo", null);
tslib_1.__decorate([
    rest_1.get('/voitures/{id}'),
    rest_1.response(200, {
        description: 'Voiture model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Voiture, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Voiture, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/voitures/{id}'),
    rest_1.response(204, {
        description: 'Voiture PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.Voiture, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Voiture]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/voitures/{id}'),
    rest_1.response(204, {
        description: 'Voiture PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.Voiture]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/voitures/{id}'),
    rest_1.response(204, {
        description: 'Voiture DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], VoiturController.prototype, "deleteById", null);
VoiturController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.VoitureRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.VoitureRepository])
], VoiturController);
exports.VoiturController = VoiturController;
//# sourceMappingURL=voitur.controller.js.map