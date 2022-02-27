import {Entity, model, property} from '@loopback/repository';

@model()
export class NgUser extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: false,
    required: true,
  })
  uuid: string;

  @property({
    type: 'string',
  })
  email: string;

  @property({
    type: 'string',
  })
  firstName: string;

  @property({
    type: 'string',
  })
  lastName: string;

  @property({
    type: 'string',
  })
  phoneNumber: string;

  @property({
    type: 'string',
  })
  completeName: string;


  constructor(data?: Partial<NgUser>) {
    super(data);
  }
}

export interface NgUserRelations {
  // describe navigational properties here
}

export type NgUserWithRelations = NgUser & NgUserRelations;
