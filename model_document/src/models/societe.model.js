"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Societe = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const address_model_1 = require("./address.model");
let Societe = class Societe extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "nomSociete", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "rib", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "formeJuridique", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "respCivile", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "codeTVA", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
        required: true,
    }),
    tslib_1.__metadata("design:type", address_model_1.Addresse)
], Societe.prototype, "address", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "site", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "tel", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Societe.prototype, "fax", void 0);
Societe = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Societe);
exports.Societe = Societe;
//# sourceMappingURL=societe.model.js.map