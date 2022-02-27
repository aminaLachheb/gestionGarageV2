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
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Activite} from '../models';
import {ActiviteRepository} from '../repositories';

export class ActiviteController {
  constructor(
    @repository(ActiviteRepository)
    public activiteRepository: ActiviteRepository,
  ) { }

  @post('/activites')
  @response(200, {
    description: 'Activite model instance',
    content: {'application/json': {schema: getModelSchemaRef(Activite)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activite, {
            title: 'NewActivite',
            exclude: ['id'],
          }),
        },
      },
    })
    activite: Omit<Activite, 'id'>,
  ): Promise<Activite> {
    return this.activiteRepository.create(activite);
  }

  @get('/activites/count')
  @response(200, {
    description: 'Activite model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Activite) where?: Where<Activite>,
  ): Promise<Count> {
    return this.activiteRepository.count(where);
  }

  @get('/activites')
  @response(200, {
    description: 'Array of Activite model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Activite, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Activite) filter?: Filter<Activite>,
  ): Promise<Activite[]> {
    return this.activiteRepository.find({order: ['date DESC'], limit: 5});
  }

  @patch('/activites')
  @response(200, {
    description: 'Activite PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activite, {partial: true}),
        },
      },
    })
    activite: Activite,
    @param.where(Activite) where?: Where<Activite>,
  ): Promise<Count> {
    return this.activiteRepository.updateAll(activite, where);
  }

  @get('/activites/{id}')
  @response(200, {
    description: 'Activite model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Activite, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Activite, {exclude: 'where'}) filter?: FilterExcludingWhere<Activite>
  ): Promise<Activite> {
    return this.activiteRepository.findById(id, filter);
  }

  @patch('/activites/{id}')
  @response(204, {
    description: 'Activite PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Activite, {partial: true}),
        },
      },
    })
    activite: Activite,
  ): Promise<void> {
    await this.activiteRepository.updateById(id, activite);
  }

  @put('/activites/{id}')
  @response(204, {
    description: 'Activite PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() activite: Activite,
  ): Promise<void> {
    await this.activiteRepository.replaceById(id, activite);
  }

  @del('/activites/{id}')
  @response(204, {
    description: 'Activite DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.activiteRepository.deleteById(id);
  }
}
