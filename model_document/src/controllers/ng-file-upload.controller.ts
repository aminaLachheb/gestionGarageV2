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
import {NgFileUpload} from '../models';
import {NgFileUploadRepository, NgTransactionRepository} from '../repositories';
const axios = require('axios');
const pdf2base64 = require('pdf-to-base64');
const FileSaver = require('file-saver');
const ChromeLauncher = require('chrome-launcher');
const Blob = require('node-fetch');
var Buffer = require('buffer');
const download = require('downloadjs');
export class NgFileUploadController {
  //transaction: NgTransaction = new NgTransaction();

  constructor(
    @repository(NgFileUploadRepository)
    public ngFileUploadRepository: NgFileUploadRepository,
    @repository(NgTransactionRepository)
    public NGTransactionRepository: NgFileUploadRepository,
  ) { }

  @post('/ng-file-uploads')
  @response(200, {
    description: 'NgFileUpload model instance',
    content: {'application/json': {schema: getModelSchemaRef(NgFileUpload)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgFileUpload, {
            title: 'NewNgFileUpload',
            exclude: ['id'],
          }),
        },
      },
    })
    ngFileUpload: Omit<NgFileUpload, 'id'>,
  ): Promise<NgFileUpload> {
    return this.ngFileUploadRepository.create(ngFileUpload);
  }

  @get('/ng-file-uploads/count')
  @response(200, {
    description: 'NgFileUpload model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(NgFileUpload) where?: Where<NgFileUpload>,
  ): Promise<Count> {

    var token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyLm1hbm5vdWJpQHNyYS10dW5pc2llLmNvbSIsImlhdCI6MTYyMTg0NzY0MH0.hwl5-D4urHt-6SM-7DVidI0ervNxBhgQuoDXzLJrkxW9bkUzqLVeEpN_UlkwWhpVGgc-ViAb84lRLatfPlTy-Q';


    axios.get('https://app.ng-sign.com.tn/server/any/transaction/58dd0d89-0401-4256-a5d9-4fc90a4bd06f',
      {headers: {"Authorization": `Bearer ${token}`, 'Content-Type': 'application/json'}})
      .then((response: any) => {
        //console.log(response.data.object);
        axios.get('https://app.ng-sign.com.tn/server/any/transaction/58dd0d89-0401-4256-a5d9-4fc90a4bd06f/pdfs/' + response.data.object.signers[0].pdfsUuid[0],
          {
            responseType: 'arraybuffer',
            headers: {
              "Authorization": `Bearer ${token}`,
              'Accept': 'application/pdf'
            }
          })
          .then(async (response: any) => {
            await fs.writeFileSync("public/storage/test.pdf", response.data)
          });

      })
      .catch((error: any) => {
        console.error(error);
      })
    return this.ngFileUploadRepository.count(where);
  }

  @get('/ng-file-uploads')
  @response(200, {
    description: 'Array of NgFileUpload model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(NgFileUpload, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(NgFileUpload) filter?: Filter<NgFileUpload>,
  ): Promise<NgFileUpload[]> {
    return this.ngFileUploadRepository.find(filter);
  }

  @patch('/ng-file-uploads')
  @response(200, {
    description: 'NgFileUpload PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgFileUpload, {partial: true}),
        },
      },
    })
    ngFileUpload: NgFileUpload,
    @param.where(NgFileUpload) where?: Where<NgFileUpload>,
  ): Promise<Count> {
    return this.ngFileUploadRepository.updateAll(ngFileUpload, where);
  }

  @get('/ng-file-uploads/{id}')
  @response(200, {
    description: 'NgFileUpload model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(NgFileUpload, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(NgFileUpload, {exclude: 'where'}) filter?: FilterExcludingWhere<NgFileUpload>
  ): Promise<NgFileUpload> {
    return this.ngFileUploadRepository.findById(id, filter);
  }

  @patch('/ng-file-uploads/{id}')
  @response(204, {
    description: 'NgFileUpload PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgFileUpload, {partial: true}),
        },
      },
    })
    ngFileUpload: NgFileUpload,
  ): Promise<void> {
    await this.ngFileUploadRepository.updateById(id, ngFileUpload);
  }

  @put('/ng-file-uploads/{id}')
  @response(204, {
    description: 'NgFileUpload PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ngFileUpload: NgFileUpload,
  ): Promise<void> {
    await this.ngFileUploadRepository.replaceById(id, ngFileUpload);
  }

  @del('/ng-file-uploads/{id}')
  @response(204, {
    description: 'NgFileUpload DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ngFileUploadRepository.deleteById(id);
  }

  @post('/api/ngFileUpload/{fileName}')
  @response(200, {
    description: 'NgFileUpload model instance',
    content: {'application/json': {schema: getModelSchemaRef(NgFileUpload)}},
  })
  async uploadFile(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NgFileUpload, {
            title: 'NewNgFileUpload',
            exclude: ['id'],
          }),
        },
      },
    })
    @param.path.string('fileName') fileName: string,
    ngFileUpload: Omit<NgFileUpload, 'id'>,
  ): Promise<any> {
    return 'success';
  }

  @get('/ng-file-uploads')
  @response(200, {
    description: 'NgFileUpload model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async postSign(
  ): Promise<string> {


    return 'pdfSigné';
  }


}
