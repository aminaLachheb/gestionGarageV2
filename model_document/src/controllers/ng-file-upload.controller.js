"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgFileUploadController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const axios = require('axios');
const pdf2base64 = require('pdf-to-base64');
const FileSaver = require('file-saver');
const ChromeLauncher = require('chrome-launcher');
const Blob = require('node-fetch');
var Buffer = require('buffer');
const download = require('downloadjs');
let NgFileUploadController = class NgFileUploadController {
    //transaction: NgTransaction = new NgTransaction();
    constructor(ngFileUploadRepository, NGTransactionRepository) {
        this.ngFileUploadRepository = ngFileUploadRepository;
        this.NGTransactionRepository = NGTransactionRepository;
    }
    async create(ngFileUpload) {
        return this.ngFileUploadRepository.create(ngFileUpload);
    }
    async count(where) {
        var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';
        axios.get('https://app.ng-sign.com.tn/server/any/transaction/58dd0d89-0401-4256-a5d9-4fc90a4bd06f', { headers: { "Authorization": `Bearer ${token}`, 'Content-Type': 'application/json' } })
            .then((response) => {
            //console.log(response.data.object);
            axios.get('https://app.ng-sign.com.tn/server/any/transaction/58dd0d89-0401-4256-a5d9-4fc90a4bd06f/pdfs/' + response.data.object.signers[0].pdfsUuid[0], {
                responseType: 'arraybuffer',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Accept': 'application/pdf'
                }
            })
                .then(async (response) => {
                await fs_1.default.writeFileSync("public/storage/test.pdf", response.data);
            });
        })
            .catch((error) => {
            console.error(error);
        });
        return this.ngFileUploadRepository.count(where);
    }
    async find(filter) {
        return this.ngFileUploadRepository.find(filter);
    }
    async updateAll(ngFileUpload, where) {
        return this.ngFileUploadRepository.updateAll(ngFileUpload, where);
    }
    async findById(id, filter) {
        return this.ngFileUploadRepository.findById(id, filter);
    }
    async updateById(id, ngFileUpload) {
        await this.ngFileUploadRepository.updateById(id, ngFileUpload);
    }
    async replaceById(id, ngFileUpload) {
        await this.ngFileUploadRepository.replaceById(id, ngFileUpload);
    }
    async deleteById(id) {
        await this.ngFileUploadRepository.deleteById(id);
    }
    async uploadFile(fileName, ngFileUpload) {
        return 'success';
    }
    async postSign() {
        return 'pdfSigné';
    }
};
tslib_1.__decorate([
    rest_1.post('/ng-file-uploads'),
    rest_1.response(200, {
        description: 'NgFileUpload model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.NgFileUpload) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgFileUpload, {
                    title: 'NewNgFileUpload',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/ng-file-uploads/count'),
    rest_1.response(200, {
        description: 'NgFileUpload model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.NgFileUpload)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/ng-file-uploads'),
    rest_1.response(200, {
        description: 'Array of NgFileUpload model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.NgFileUpload, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.NgFileUpload)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/ng-file-uploads'),
    rest_1.response(200, {
        description: 'NgFileUpload PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgFileUpload, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.NgFileUpload)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.NgFileUpload, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/ng-file-uploads/{id}'),
    rest_1.response(200, {
        description: 'NgFileUpload model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgFileUpload, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.NgFileUpload, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/ng-file-uploads/{id}'),
    rest_1.response(204, {
        description: 'NgFileUpload PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgFileUpload, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.NgFileUpload]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/ng-file-uploads/{id}'),
    rest_1.response(204, {
        description: 'NgFileUpload PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.NgFileUpload]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/ng-file-uploads/{id}'),
    rest_1.response(204, {
        description: 'NgFileUpload DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.post('/api/ngFileUpload/{fileName}'),
    rest_1.response(200, {
        description: 'NgFileUpload model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.NgFileUpload) } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgFileUpload, {
                    title: 'NewNgFileUpload',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "uploadFile", null);
tslib_1.__decorate([
    rest_1.get('/ng-file-uploads'),
    rest_1.response(200, {
        description: 'NgFileUpload model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], NgFileUploadController.prototype, "postSign", null);
NgFileUploadController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.NgFileUploadRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.NgTransactionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.NgFileUploadRepository,
        repositories_1.NgFileUploadRepository])
], NgFileUploadController);
exports.NgFileUploadController = NgFileUploadController;
//# sourceMappingURL=ng-file-upload.controller.js.map