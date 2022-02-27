import {Entity, model, property} from '@loopback/repository';
import {Addresse} from './address.model';

@model()
export class Societe extends Entity {

  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nomSociete: string;

  @property({
    type: 'string',
    required: true,
  })
  rib: string;

  @property({
    type: 'string',
    required: true,
  })
  formeJuridique: string;

  @property({
    type: 'string',
    required: true,
  })
  respCivile: string;

  @property({
    type: 'string',
    required: true,
  })
  codeTVA: string;

  @property({
    type: 'object',
    required: true,
  })
  address: Addresse;

  @property({
    type: 'string',
    required: true,
  })
  site: string;

  @property({
    type: 'string',
    required: true,
  })
  tel: string;

  @property({
    type: 'string',
    required: true,
  })
  fax: string;


  constructor(data?: Partial<Societe>) {
    super(data);
  }
}

export interface SocieteRelations {
  // describe navigational properties here
}

export type SocieteWithRelations = Societe & SocieteRelations;
