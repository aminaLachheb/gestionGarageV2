import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Voiture } from '../models';
import { VoitureRepository } from '../repositories';
export declare class VoiturController {
    voitureRepository: VoitureRepository;
    constructor(voitureRepository: VoitureRepository);
    create(voiture: Omit<Voiture, 'id'>): Promise<Voiture>;
    count(where?: Where<Voiture>): Promise<Count>;
    find(filter?: Filter<Voiture>): Promise<Voiture[]>;
    updateAll(voiture: Voiture, where?: Where<Voiture>): Promise<Count>;
    countDispo(where?: Where<Voiture>): Promise<Count>;
    countnonDispo(where?: Where<Voiture>): Promise<Count>;
    countVoitureNonDispo(employe: string, where?: Where<Voiture>): Promise<Count>;
    countVoitureDispo(employe: string, where?: Where<Voiture>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<Voiture>): Promise<Voiture>;
    updateById(id: string, voiture: Voiture): Promise<void>;
    replaceById(id: string, voiture: Voiture): Promise<void>;
    deleteById(id: string): Promise<void>;
}
