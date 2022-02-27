import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {InvoiceTief} from '../models';
import {InvoiceTiefRepository} from '../repositories';

export class InvoiceTiefController {
  constructor(
    @repository(InvoiceTiefRepository)
    public invoiceTiefRepository : InvoiceTiefRepository,
  ) {}

  @post('/invoice-tiefs')
  @response(200, {
    description: 'InvoiceTief model instance',
    content: {'application/json': {schema: getModelSchemaRef(InvoiceTief)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceTief, {
            title: 'NewInvoiceTief',
            exclude: ['documentIdentifier'],
          }),
        },
      },
    })
    invoiceTief: Omit<InvoiceTief, 'documentIdentifier'>,
  ): Promise<InvoiceTief> {
    return this.invoiceTiefRepository.create(invoiceTief);
  }

  @get('/invoice-tiefs/count')
  @response(200, {
    description: 'InvoiceTief model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InvoiceTief) where?: Where<InvoiceTief>,
  ): Promise<Count> {
    return this.invoiceTiefRepository.count(where);
  }

  @get('/invoice-tiefs')
  @response(200, {
    description: 'Array of InvoiceTief model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InvoiceTief, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InvoiceTief) filter?: Filter<InvoiceTief>,
  ): Promise<InvoiceTief[]> {
    return this.invoiceTiefRepository.find(filter);
  }

  @patch('/invoice-tiefs')
  @response(200, {
    description: 'InvoiceTief PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceTief, {partial: true}),
        },
      },
    })
    invoiceTief: InvoiceTief,
    @param.where(InvoiceTief) where?: Where<InvoiceTief>,
  ): Promise<Count> {
    return this.invoiceTiefRepository.updateAll(invoiceTief, where);
  }

  @get('/invoice-tiefs/{id}')
  @response(200, {
    description: 'InvoiceTief model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InvoiceTief, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InvoiceTief, {exclude: 'where'}) filter?: FilterExcludingWhere<InvoiceTief>
  ): Promise<InvoiceTief> {
    return this.invoiceTiefRepository.findById(id, filter);
  }

  @patch('/invoice-tiefs/{id}')
  @response(204, {
    description: 'InvoiceTief PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InvoiceTief, {partial: true}),
        },
      },
    })
    invoiceTief: InvoiceTief,
  ): Promise<void> {
    await this.invoiceTiefRepository.updateById(id, invoiceTief);
  }

  @put('/invoice-tiefs/{id}')
  @response(204, {
    description: 'InvoiceTief PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() invoiceTief: InvoiceTief,
  ): Promise<void> {
    await this.invoiceTiefRepository.replaceById(id, invoiceTief);
  }

  @del('/invoice-tiefs/{id}')
  @response(204, {
    description: 'InvoiceTief DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.invoiceTiefRepository.deleteById(id);
  }
}
