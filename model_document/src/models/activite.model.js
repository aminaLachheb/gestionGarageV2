"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activite = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Activite = class Activite extends repository_1.Entity {
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
], Activite.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Activite.prototype, "date", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Activite.prototype, "nom", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Activite.prototype, "docName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Activite.prototype, "action", void 0);
Activite = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Activite);
exports.Activite = Activite;
//# sourceMappingURL=activite.model.js.map