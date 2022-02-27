"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerDetails = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const address_model_1 = require("./address.model");
let PartnerDetails = class PartnerDetails extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "partnerIdentifier", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "partnerName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        id: true,
        generated: false,
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "rib", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "formeJuridique", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "rc", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "codeTVA", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'object',
    }),
    tslib_1.__metadata("design:type", address_model_1.Addresse)
], PartnerDetails.prototype, "address", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "site", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "tel", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "fax", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], PartnerDetails.prototype, "partnerReference", void 0);
PartnerDetails = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], PartnerDetails);
exports.PartnerDetails = PartnerDetails;
//# sourceMappingURL=partner-details.model.js.map