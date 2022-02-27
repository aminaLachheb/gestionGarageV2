"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgFileUpload = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
let NgFileUpload = class NgFileUpload extends repository_1.Entity {
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
], NgFileUpload.prototype, "id", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NgFileUpload.prototype, "fileName", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], NgFileUpload.prototype, "fileExtension", void 0);
tslib_1.__decorate([
    repository_1.property({
        type: 'string',
    }),
    tslib_1.__metadata("design:type", String)
], NgFileUpload.prototype, "fileBase64", void 0);
NgFileUpload = tslib_1.__decorate([
    repository_1.model(),
    tslib_1.__metadata("design:paramtypes", [Object])
], NgFileUpload);
exports.NgFileUpload = NgFileUpload;
//# sourceMappingURL=ng-file-upload.model.js.map