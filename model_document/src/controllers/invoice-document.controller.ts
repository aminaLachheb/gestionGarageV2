import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Invoice,
  Document,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceDocumentController {
  constructor(
    @repository(InvoiceRepository) protected invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/document', {
    responses: {
      '200': {
        description: 'Invoice has one Document',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Document),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Document>,
  ): Promise<Document> {
    return this.invoiceRepository.document(id).get(filter);
  }

  @post('/invoices/{id}/document', {
    responses: {
      '200': {
        description: 'Invoice model instance',
        content: {'application/json': {schema: getModelSchemaRef(Document)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Invoice.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {
            title: 'NewDocumentInInvoice',
            exclude: ['identifier'],
            optional: ['invoiceId']
          }),
        },
      },
    }) document: Omit<Document, 'identifier'>,
  ): Promise<Document> {
    return this.invoiceRepository.document(id).create(document);
  }

  @patch('/invoices/{id}/document', {
    responses: {
      '200': {
        description: 'Invoice.Document PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Document, {partial: true}),
        },
      },
    })
    document: Partial<Document>,
    @param.query.object('where', getWhereSchemaFor(Document)) where?: Where<Document>,
  ): Promise<Count> {
    return this.invoiceRepository.document(id).patch(document, where);
  }

  @del('/invoices/{id}/document', {
    responses: {
      '200': {
        description: 'Invoice.Document DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Document)) where?: Where<Document>,
  ): Promise<Count> {
    return this.invoiceRepository.document(id).delete(where);
  }
}
