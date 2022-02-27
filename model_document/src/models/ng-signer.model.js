"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgSigner = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const ng_user_model_1 = require("./ng-user.model");
let NgSigner = class NgSigner extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", ng_user_model_1.NgUser)
], NgSigner.prototype, "signer", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSigner.prototype, "status", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSigner.prototype, "type", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSigner.prototype, "mode", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], NgSigner.prototype, "signingTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgSigner.prototype, "otp", void 0);
NgSigner = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgSigner);
exports.NgSigner = NgSigner;
//# sourceMappingURL=ng-signer.model.js.map