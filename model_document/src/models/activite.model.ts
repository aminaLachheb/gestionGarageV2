import {Entity, model, property} from '@loopback/repository';

@model()
export class Activite extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id: string;

  @property({
    type: 'date',
  })
  date?: string;

  @property({
    type: 'string',
  })
  nom?: string;

  @property({
    type: 'string',
  })
  docName?: string;

  @property({
    type: 'string',
  })
  action?: string;


  constructor(data?: Partial<Activite>) {
    super(data);
  }
}

export interface ActiviteRelations {
  // describe navigational properties here
}

export type ActiviteWithRelations = Activite & ActiviteRelations;
