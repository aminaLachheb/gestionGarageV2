import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { InvoiceTief } from '../models';
import { InvoiceTiefRepository } from '../repositories';
export declare class InvoiceTiefController {
    invoiceTiefRepository: InvoiceTiefRepository;
    constructor(invoiceTiefRepository: InvoiceTiefRepository);
    create(invoiceTief: Omit<InvoiceTief, 'documentIdentifier'>): Promise<InvoiceTief>;
    count(where?: Where<InvoiceTief>): Promise<Count>;
    find(filter?: Filter<InvoiceTief>): Promise<InvoiceTief[]>;
    updateAll(invoiceTief: InvoiceTief, where?: Where<InvoiceTief>): Promise<Count>;
    findById(id: string, filter?: FilterExcludingWhere<InvoiceTief>): Promise<InvoiceTief>;
    updateById(id: string, invoiceTief: InvoiceTief): Promise<void>;
    replaceById(id: string, invoiceTief: InvoiceTief): Promise<void>;
    deleteById(id: string): Promise<void>;
}
