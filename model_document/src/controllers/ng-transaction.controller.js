"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NgTransactionController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const fs_1 = tslib_1.__importDefault(require("fs"));
const models_1 = require("../models");
const repositories_1 = require("../repositories");
const pdf2base64 = require('pdf-to-base64');
const axios = require('axios');
const ChromeLauncher = require('chrome-launcher');
let NgTransactionController = class NgTransactionController {
    constructor(documentRepository, ngFileUploadRepository, ngTransactionRepository) {
        this.documentRepository = documentRepository;
        this.ngFileUploadRepository = ngFileUploadRepository;
        this.ngTransactionRepository = ngTransactionRepository;
        this.transaction = new models_1.NgTransaction();
    }
    async create(fileName) {
        var ngTransaction = new models_1.NgTransaction();
        var ngFileUpload = new models_1.NgFileUpload();
        var fileArray = [];
        ngFileUpload.fileBase64 = await pdf2base64('http://localhost:3000/storage/' + fileName + '.pdf');
        ngFileUpload.fileName = fileName;
        ngFileUpload.fileExtension = 'pdf';
        fileArray.push(ngFileUpload);
        var api = 'https://app.ng-sign.com.tn/';
        var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';
        var ngRedirectionUrl = {
            "sucessUrl": "http://www.google.com",
            "failureUrl": ""
        };
        await axios.post(api + 'server/protected/transaction/pdfs', fileArray, {
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(async (response) => {
            var confData = {
                "sigConf": [{
                        "signer": response.data.object.creator,
                        "sigType": "CERTIFIED_TIMESTAMP",
                        "docsConfigs": [{
                                "page": 1,
                                "xAxis": 530,
                                "yAxis": 1000,
                                "documentName": "test",
                                "documentExtension": "pdf",
                                "identifier": response.data.object.pdfs[0].identifier
                            }],
                        "mode": "FACE_TO_FACE",
                        "otp": "OTP",
                        "receiveDocument": true,
                        "redirectionUrl": ngRedirectionUrl
                    }]
            };
            ngTransaction = await axios.post(api + 'server/protected/transaction/' + response.data.object.uuid + '/launch', confData, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then((response) => {
                return response.data.object;
            });
            return response.data.object;
        });
        return await this.ngTransactionRepository.create(ngTransaction);
    }
    async count(where) {
        return this.ngTransactionRepository.count(where);
    }
    async find(filter) {
        return this.ngTransactionRepository.find({ order: ['creationDate DESC'], limit: 5 });
    }
    async updateAll(ngTransaction, where) {
        return this.ngTransactionRepository.updateAll(ngTransaction, where);
    }
    async findById(id, filter) {
        return this.ngTransactionRepository.findById(id, filter);
    }
    async updateById(id, ngTransaction) {
        await this.ngTransactionRepository.updateById(id, ngTransaction);
    }
    async replaceById(id, ngTransaction) {
        await this.ngTransactionRepository.replaceById(id, ngTransaction);
    }
    async deleteById(id) {
        await this.ngTransactionRepository.deleteById(id);
    }
    async postSign(uuid, fileId) {
        var result;
        var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';
        result = await axios.get('https://app.ng-sign.com.tn/server/any/transaction/' + uuid, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
            .then(async (res) => {
            if (res.data.object.status === "SIGNED") {
                this.ngTransactionRepository.replaceById(uuid, res.data.object);
                console.log(await this.ngTransactionRepository.findById(uuid));
                await this.documentRepository.updateById(fileId, { etat: 'signe' });
                axios.get('https://app.ng-sign.com.tn/server/any/transaction/' + res.data.object.uuid + '/pdfs/'
                    + res.data.object.pdfs[0].identifier, {
                    responseType: 'arraybuffer',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Accept': 'application/pdf'
                    }
                })
                    .then(async (response) => {
                    await fs_1.default.writeFileSync('public/storage/' + res.data.object.pdfs[0].name + '.pdf', response.data);
                })
                    .catch((error) => {
                    console.error(error);
                });
                return 'signed';
            }
            else {
                return 'unsigned';
            }
        }).catch((error) => {
            console.error(error);
        });
        return result;
    }
};
tslib_1.__decorate([
    rest_1.post('post/ng-transactions/{fileName}'),
    rest_1.response(200, {
        description: 'NgTransaction model instance',
        content: { 'application/json': { schema: rest_1.getModelSchemaRef(models_1.NgTransaction) } },
    }),
    tslib_1.__param(0, rest_1.param.path.string('fileName')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "create", null);
tslib_1.__decorate([
    rest_1.get('/ng-transactions/count'),
    rest_1.response(200, {
        description: 'NgTransaction model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.NgTransaction)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "count", null);
tslib_1.__decorate([
    rest_1.get('/ng-transactions'),
    rest_1.response(200, {
        description: 'Array of NgTransaction model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: rest_1.getModelSchemaRef(models_1.NgTransaction, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.NgTransaction)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "find", null);
tslib_1.__decorate([
    rest_1.patch('/ng-transactions'),
    rest_1.response(200, {
        description: 'NgTransaction PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgTransaction, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.NgTransaction)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.NgTransaction, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "updateAll", null);
tslib_1.__decorate([
    rest_1.get('/ng-transactions/{id}'),
    rest_1.response(200, {
        description: 'NgTransaction model instance',
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgTransaction, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.NgTransaction, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "findById", null);
tslib_1.__decorate([
    rest_1.patch('/ng-transactions/{id}'),
    rest_1.response(204, {
        description: 'NgTransaction PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody({
        content: {
            'application/json': {
                schema: rest_1.getModelSchemaRef(models_1.NgTransaction, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.NgTransaction]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "updateById", null);
tslib_1.__decorate([
    rest_1.put('/ng-transactions/{id}'),
    rest_1.response(204, {
        description: 'NgTransaction PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__param(1, rest_1.requestBody()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, models_1.NgTransaction]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "replaceById", null);
tslib_1.__decorate([
    rest_1.del('/ng-transactions/{id}'),
    rest_1.response(204, {
        description: 'NgTransaction DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.string('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "deleteById", null);
tslib_1.__decorate([
    rest_1.get('/ng-transactions/api/{uuid}/{fileId}'),
    rest_1.response(200, {
        description: 'NgTransaction model count',
    }),
    tslib_1.__param(0, rest_1.param.path.string('uuid')),
    tslib_1.__param(1, rest_1.param.path.string('fileId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], NgTransactionController.prototype, "postSign", null);
NgTransactionController = tslib_1.__decorate([
    tslib_1.__param(0, repository_1.repository(repositories_1.DocumentRepository)),
    tslib_1.__param(1, repository_1.repository(repositories_1.NgFileUploadRepository)),
    tslib_1.__param(2, repository_1.repository(repositories_1.NgTransactionRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.DocumentRepository,
        repositories_1.NgFileUploadRepository,
        repositories_1.NgTransactionRepository])
], NgTransactionController);
exports.NgTransactionController = NgTransactionController;
//# sourceMappingURL=ng-transaction.controller.js.map