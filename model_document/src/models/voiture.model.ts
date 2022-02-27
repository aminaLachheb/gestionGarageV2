import {Entity, model, property} from '@loopback/repository';

@model()
export class Voiture extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  model?: string;

  @property({
    type: 'string',
    required: true,
  })
  marque: string;

  @property({
    type: 'number',
    required: true,
  })
  annee: number;

  @property({
    type: 'number',
    required: true,
  })
  prix: number;

  @property({
    type: 'string',
    required: true,
  })
  status: string;

  @property({
    type: 'string',
    required: true,
  })
  lien: string;

  @property({
    type: 'string',
    required: true,
  })
  employe: string;

  @property({
    type: 'number',
  })
  prixVente: number;


  constructor(data?: Partial<Voiture>) {
    super(data);
  }
}

export interface VoitureRelations {
  // describe navigational properties here
}

export type VoitureWithRelations = Voiture & VoitureRelations;
