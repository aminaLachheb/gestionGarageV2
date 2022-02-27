"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.KeyAndPassword = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let KeyAndPassword = class KeyAndPassword extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], KeyAndPassword.prototype, "resetKey", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], KeyAndPassword.prototype, "password", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], KeyAndPassword.prototype, "confirmPassword", void 0);
KeyAndPassword = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], KeyAndPassword);
exports.KeyAndPassword = KeyAndPassword;
//# sourceMappingURL=key-and-password.model.js.map