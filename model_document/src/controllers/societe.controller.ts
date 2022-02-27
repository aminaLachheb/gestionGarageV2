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
import {Societe} from '../models';
import {SocieteRepository} from '../repositories';

export class SocieteController {
  constructor(
    @repository(SocieteRepository)
    public societeRepository : SocieteRepository,
  ) {}

  @post('/societes')
  @response(200, {
    description: 'Societe model instance',
    content: {'application/json': {schema: getModelSchemaRef(Societe)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Societe, {
            title: 'NewSociete',
            exclude: ['id'],
          }),
        },
      },
    })
    societe: Omit<Societe, 'id'>,
  ): Promise<Societe> {
    return this.societeRepository.create(societe);
  }

  @get('/societes/count')
  @response(200, {
    description: 'Societe model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Societe) where?: Where<Societe>,
  ): Promise<Count> {
    return this.societeRepository.count(where);
  }

  @get('/societes')
  @response(200, {
    description: 'Array of Societe model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Societe, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Societe) filter?: Filter<Societe>,
  ): Promise<Societe[]> {
    return this.societeRepository.find(filter);
  }

  @patch('/societes')
  @response(200, {
    description: 'Societe PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Societe, {partial: true}),
        },
      },
    })
    societe: Societe,
    @param.where(Societe) where?: Where<Societe>,
  ): Promise<Count> {
    return this.societeRepository.updateAll(societe, where);
  }

  @get('/societes/{id}')
  @response(200, {
    description: 'Societe model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Societe, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Societe, {exclude: 'where'}) filter?: FilterExcludingWhere<Societe>
  ): Promise<Societe> {
    return this.societeRepository.findById(id, filter);
  }

  @patch('/societes/{id}')
  @response(204, {
    description: 'Societe PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Societe, {partial: true}),
        },
      },
    })
    societe: Societe,
  ): Promise<void> {
    await this.societeRepository.updateById(id, societe);
  }

  @put('/societes/{id}')
  @response(204, {
    description: 'Societe PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() societe: Societe,
  ): Promise<void> {
    await this.societeRepository.replaceById(id, societe);
  }

  @del('/societes/{id}')
  @response(204, {
    description: 'Societe DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.societeRepository.deleteById(id);
  }
}
