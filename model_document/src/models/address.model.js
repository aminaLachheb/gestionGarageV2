"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Addresse = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Addresse = class Addresse extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Addresse.prototype, "description", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Addresse.prototype, "street", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Addresse.prototype, "cityName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Addresse.prototype, "cityCode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Addresse.prototype, "country", void 0);
Addresse = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Addresse);
exports.Addresse = Addresse;
//# sourceMappingURL=address.model.js.map