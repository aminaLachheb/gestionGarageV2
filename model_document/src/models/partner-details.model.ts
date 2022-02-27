import {Entity, model, property} from '@loopback/repository';
import {Addresse} from './address.model';

@model()
export class PartnerDetails extends Entity {
  @property({
    type: 'string',
  })
  partnerIdentifier: string;

  @property({
    type: 'string',
  })
  partnerName: string;

  @property({
    type: 'string',
    id: true,
    generated: false,
  })
  rib: string;

  @property({
    type: 'string',
  })
  formeJuridique: string;

  @property({
    type: 'string',
  })
  rc: string;

  @property({
    type: 'string',
  })
  codeTVA: string;

  @property({
    type: 'object',
  })
  address: Addresse;

  @property({
    type: 'string',
  })
  site: string;


  @property({
    type: 'string',
  })
  tel: string;

  @property({
    type: 'string',
  })
  fax: string;

  @property({
    type: 'string',
  })
  partnerReference: string;

  constructor(data?: Partial<PartnerDetails>) {
    super(data);
  }
}

export interface PartnerDetailsRelations {
  // describe navigational properties here
}

export type PartnerDetailsWithRelations = PartnerDetails & PartnerDetailsRelations;
