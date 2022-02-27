"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoitureRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let VoitureRepository = class VoitureRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource) {
        super(models_1.Voiture, dataSource);
    }
};
VoitureRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo_db')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDbDataSource])
], VoitureRepository);
exports.VoitureRepository = VoitureRepository;
//# sourceMappingURL=voiture.repository.js.map