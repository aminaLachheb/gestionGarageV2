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
import {Voiture} from '../models';
import {VoitureRepository} from '../repositories';

export class VoiturController {
  constructor(
    @repository(VoitureRepository)
    public voitureRepository: VoitureRepository,
  ) { }

  @post('/voitures')
  @response(200, {
    description: 'Voiture model instance',
    content: {'application/json': {schema: getModelSchemaRef(Voiture)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voiture, {
            title: 'NewVoiture',
            exclude: ['id'],
          }),
        },
      },
    })
    voiture: Omit<Voiture, 'id'>,
  ): Promise<Voiture> {
    return this.voitureRepository.create(voiture);
  }

  @get('/voitures/count')
  @response(200, {
    description: 'Voiture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.count(where);
  }

  @get('/voitures')
  @response(200, {
    description: 'Array of Voiture model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Voiture, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Voiture) filter?: Filter<Voiture>,
  ): Promise<Voiture[]> {
    return this.voitureRepository.find(filter);
  }

  @patch('/voitures')
  @response(200, {
    description: 'Voiture PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voiture, {partial: true}),
        },
      },
    })
    voiture: Voiture,
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.updateAll(voiture, where);
  }

  @get('/voitures/dispo')
  @response(200, {
    description: 'voiture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countDispo(
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.count(where = {status: "disponible"});
  }

  @get('/voitures/nonDispo')
  @response(200, {
    description: 'voiture model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countnonDispo(
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.count(where = {status: "vendu"});
  }

  @get('/voitures/nonDispo/{employe}')
  @response(200, {
    description: 'voiture_ model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countVoitureNonDispo(
    @param.path.string('employe') employe: string,
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.count(where = {status: "vendu", employe: employe});
  }

  @get('/voitures/dispo/{employe}')
  @response(200, {
    description: 'voiture_ model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async countVoitureDispo(
    @param.path.string('employe') employe: string,
    @param.where(Voiture) where?: Where<Voiture>,
  ): Promise<Count> {
    return this.voitureRepository.count(where = {status: "disponible", employe: employe});
  }


  @get('/voitures/{id}')
  @response(200, {
    description: 'Voiture model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Voiture, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Voiture, {exclude: 'where'}) filter?: FilterExcludingWhere<Voiture>
  ): Promise<Voiture> {
    return this.voitureRepository.findById(id, filter);
  }

  @patch('/voitures/{id}')
  @response(204, {
    description: 'Voiture PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Voiture, {partial: true}),
        },
      },
    })
    voiture: Voiture,
  ): Promise<void> {
    await this.voitureRepository.updateById(id, voiture);
  }

  @put('/voitures/{id}')
  @response(204, {
    description: 'Voiture PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() voiture: Voiture,
  ): Promise<void> {
    await this.voitureRepository.replaceById(id, voiture);
  }

  @del('/voitures/{id}')
  @response(204, {
    description: 'Voiture DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.voitureRepository.deleteById(id);
  }
}
