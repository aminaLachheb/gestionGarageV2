"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Envelope = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let Envelope = class Envelope extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Envelope.prototype, "from", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], Envelope.prototype, "to", void 0);
Envelope = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], Envelope);
exports.Envelope = Envelope;
//# sourceMappingURL=envelope.model.js.map