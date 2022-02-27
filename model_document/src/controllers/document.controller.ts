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
import {Document} from '../models';
import {DocumentRepository, InvoiceRepository} from '../repositories';
const pdf = require('pdf-creator-node');
var download = require('file-download');

//@authenticate('jwt')
export class DocumentController {

  constructor(
    @repository(DocumentRepository)
    public documentRepository: DocumentRepository,
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
  ) { }

  @post('/documents')
  @response(200, {
    description: 'Document model instance',
    content: {'application/json': {schema: getModelSchemaRef(Document)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {
            title: 'NewDocument',

          }),
        },
      },
    })
    document: Omit<Document, 'id'>,
  ): Promise<Document> {
    return this.documentRepository.create(document);
  }

  @get('/documents/count')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count();
  }


  @get('/documents/signe')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countSigne(
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count(where = {etat: "signe"});
  }

  @get('/documents/nonsigne')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countNonSigne(
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count(where = {etat: "non signe"});
  }

  @get('/documents/nonsigne/{projet}')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countProjetNonSigne(
    @param.path.string('projet') projet: string,
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count(where = {etat: "non signe", module: projet});
  }

  @get('/documents/signe/{projet}')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countProjetSigne(
    @param.path.string('projet') projet: string,
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.count(where = {etat: "signe", module: projet});
  }


  @get('/documents')
  @response(200, {
    description: 'Array of Document model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Document, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Document) filter?: Filter<Document>,
  ): Promise<Document[]> {
    return this.documentRepository.find(filter);
  }

  @patch('/documents')
  @response(200, {
    description: 'Document PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
    @param.where(Document) where?: Where<Document>,
  ): Promise<Count> {
    return this.documentRepository.updateAll(document, where);
  }

  @get('/documents/{id}')
  @response(200, {
    description: 'Document model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Document, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Document, {exclude: 'where'}) filter?: FilterExcludingWhere<Document>
  ): Promise<Document> {
    return this.documentRepository.findById(id, filter);
  }

  @patch('/documents/{id}')
  @response(204, {
    description: 'Document PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Document,
  ): Promise<void> {
    await this.documentRepository.updateById(id, document);
  }

  @put('/documents/{id}')
  @response(204, {
    description: 'Document PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() document: Document,
  ): Promise<void> {
    await this.documentRepository.replaceById(id, document);
  }

  @del('/documents/{id}')
  @response(204, {
    description: 'Document DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.documentRepository.deleteById(id);
  }

  @get('/downloadDocument')
  @response(200, {
    description: 'Document model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async download(): Promise<any> {
    return;
  }


}
