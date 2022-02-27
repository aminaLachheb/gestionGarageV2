"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgTransaction = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ng_document_model_1 = require("./ng-document.model");
const ng_signer_model_1 = require("./ng-signer.model");
const ng_user_model_1 = require("./ng-user.model");
let NgTransaction = class NgTransaction extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "uuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "puuid", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "creationDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "digestAlgo", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "signingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_user_model_1.NgUser)
], NgTransaction.prototype, "creator", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "nextSigner", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], NgTransaction.prototype, "parallelSignatures", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'boolean',
    }),
    tslib_1.__metadata("design:type", Boolean)
], NgTransaction.prototype, "byApi", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "lockDate", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgTransaction.prototype, "lockingSigner", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: ng_signer_model_1.NgSigner,
    }),
    tslib_1.__metadata("design:type", Array)
], NgTransaction.prototype, "signers", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: ng_user_model_1.NgUser,
    }),
    tslib_1.__metadata("design:type", Array)
], NgTransaction.prototype, "observers", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'array',
        itemType: ng_document_model_1.NgDocument,
    }),
    tslib_1.__metadata("design:type", Array)
], NgTransaction.prototype, "pdfs", void 0);
NgTransaction = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgTransaction);
exports.NgTransaction = NgTransaction;
//# sourceMappingURL=ng-transaction.model.js.map