"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let InvoiceRepository = class InvoiceRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, documentRepositoryGetter) {
        super(models_1.Invoice, dataSource);
        this.documentRepositoryGetter = documentRepositoryGetter;
        this.document = this.createHasOneRepositoryFactoryFor('document', documentRepositoryGetter);
        this.registerInclusionResolver('document', this.document.inclusionResolver);
    }
};
InvoiceRepository = tslib_1.__decorate([
    tslib_1.__param(0, core_1.inject('datasources.mongo_db')),
    tslib_1.__param(1, repository_1.repository.getter('DocumentRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MongoDbDataSource, Function])
], InvoiceRepository);
exports.InvoiceRepository = InvoiceRepository;
//# sourceMappingURL=invoice.repository.js.map