import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import fs from 'fs';
import {NgFileUpload, NgTransaction} from '../models';
import {DocumentRepository, NgFileUploadRepository, NgTransactionRepository} from '../repositories';
const pdf2base64 = require('pdf-to-base64');
const axios = require('axios');
const ChromeLauncher = require('chrome-launcher');
export class NgTransactionController {
  transaction: NgTransaction = new NgTransaction();

  constructor(
    @repository(DocumentRepository)
    public documentRepository: DocumentRepository,
    @repository(NgFileUploadRepository)
    public ngFileUploadRepository: NgFileUploadRepository,
    @repository(NgTransactionRepository)
    public ngTransactionRepository: NgTransactionRepository,

  ) { }

  @post('post/ng-transactions/{fileName}')
  @response(200, {
    description: 'NgTransaction model instance',
    content: {'application/json': {schema: getModelSchemaRef(NgTransaction)}},
  })
  async create(
    @param.path.string('fileName') fileName: string,

  ): Promise<NgTransaction> {
    var ngTransaction: NgTransaction = new NgTransaction();
    var ngFileUpload: NgFileUpload = new NgFileUpload();
    var fileArray: NgFileUpload[] = [];
    ngFileUpload.fileBase64 = await pdf2base64('http://localhost:3000/storage/' + fileName + '.pdf');
    ngFileUpload.fileName = fileName;
    ngFileUpload.fileExtension = 'pdf';
    fileArray.push(ngFileUpload);
    var api = 'https://app.ng-sign.com.tn/';
    var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';
    var ngRedirectionUrl = {
      "sucessUrl": "http://www.google.com",
      "failureUrl": ""
    }
    await axios.post(api + 'server/protected/transaction/pdfs', fileArray, {
      headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(async (response: any) => {
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
          .then((response: any) => {
            return response.data.object
          })
        return response.data.object;
      })
    return await this.ngTransactionRepository.create(ngTransaction);
  }

  @get('/ng-transactions/count')
  @response(200, {
    description: 'NgTransaction model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NgTransaction) where?: Where<NgTransaction>,
  ): Promise<Count> {
    return this.ngTransactionRepository.count(where);
  }

  @get('/ng-transactions')
  @response(200, {
    description: 'Array of NgTransaction model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NgTransaction, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NgTransaction) filter?: Filter<NgTransaction>,
  ): Promise<NgTransaction[]> {
    return this.ngTransactionRepository.find({order: ['creationDate DESC'], limit: 5});
  }

  @patch('/ng-transactions')
  @response(200, {
    description: 'NgTransaction PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgTransaction, {partial: true}),
        },
      },
    })
    ngTransaction: NgTransaction,
    @param.where(NgTransaction) where?: Where<NgTransaction>,
  ): Promise<Count> {
    return this.ngTransactionRepository.updateAll(ngTransaction, where);
  }

  @get('/ng-transactions/{id}')
  @response(200, {
    description: 'NgTransaction model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NgTransaction, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NgTransaction, {exclude: 'where'}) filter?: FilterExcludingWhere<NgTransaction>
  ): Promise<NgTransaction> {
    return this.ngTransactionRepository.findById(id, filter);
  }

  @patch('/ng-transactions/{id}')
  @response(204, {
    description: 'NgTransaction PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgTransaction, {partial: true}),
        },
      },
    })
    ngTransaction: NgTransaction,
  ): Promise<void> {
    await this.ngTransactionRepository.updateById(id, ngTransaction);
  }

  @put('/ng-transactions/{id}')
  @response(204, {
    description: 'NgTransaction PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ngTransaction: NgTransaction,
  ): Promise<void> {
    await this.ngTransactionRepository.replaceById(id, ngTransaction);
  }

  @del('/ng-transactions/{id}')
  @response(204, {
    description: 'NgTransaction DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ngTransactionRepository.deleteById(id);
  }

  @get('/ng-transactions/api/{uuid}/{fileId}')
  @response(200, {
    description: 'NgTransaction model count',
  })
  async postSign(
    @param.path.string('uuid') uuid: string,
    @param.path.string('fileId') fileId: string,

  ): Promise<string> {
    var result: string;
    var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';
    result = await axios.get('https://app.ng-sign.com.tn/server/any/transaction/' + uuid,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      })
      .then(async (res: any) => {
        if (res.data.object.status === "SIGNED") {
          this.ngTransactionRepository.replaceById(uuid, res.data.object);
          console.log(await this.ngTransactionRepository.findById(uuid));

          await this.documentRepository.updateById(fileId, {etat: 'signe'});
          axios.get('https://app.ng-sign.com.tn/server/any/transaction/' + res.data.object.uuid + '/pdfs/'
            + res.data.object.pdfs[0].identifier,
            {
              responseType: 'arraybuffer',
              headers: {
                "Authorization": `Bearer ${token}`,
                'Accept': 'application/pdf'
              }
            })
            .then(async (response: any) => {
              await fs.writeFileSync('public/storage/' + res.data.object.pdfs[0].name + '.pdf', response.data)
            })
            .catch((error: any) => {
              console.error(error);
            })
          return 'signed'
        } else {
          return 'unsigned'
        }
      }).catch((error: any) => {
        console.error(error);
      })

    return result;
  }

}
