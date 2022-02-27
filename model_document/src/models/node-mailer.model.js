"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeMailer = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const envelope_model_1 = require("./envelope.model");
let NodeMailer = class NodeMailer extends repository_1.Model {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property.array({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", Array)
], NodeMailer.prototype, "accepted", void 0);
tslib_1.__decorate([
    repository_1.property.array({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", Array)
], NodeMailer.prototype, "rejected", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NodeMailer.prototype, "envelopeTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NodeMailer.prototype, "messageTime", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], NodeMailer.prototype, "messageSize", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NodeMailer.prototype, "response", void 0);
tslib_1.__decorate([
    repository_1.property(() => envelope_model_1.Envelope),
    tslib_1.__metadata("design:type", envelope_model_1.Envelope)
], NodeMailer.prototype, "envelope", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NodeMailer.prototype, "messageId", void 0);
NodeMailer = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NodeMailer);
exports.NodeMailer = NodeMailer;
//# sourceMappingURL=node-mailer.model.js.map