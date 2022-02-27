import {Entity, model, property} from '@loopback/repository';

@model()
export class Addresse extends Entity {

  @property({
    type: 'string',
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  street: string;

  @property({
    type: 'string',
  })
  cityName: string;

  @property({
    type: 'string',
  })
  cityCode: string;

  @property({
    type: 'string',
  })
  country: string;


  constructor(data?: Partial<Addresse>) {
    super(data);
  }
}

export interface AddresseRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Addresse & AddresseRelations;
