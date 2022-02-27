import { addresse } from "./address";

export class societe {
    id: string;
    nomSociete: string;
    rib: string;
    formeJuridique: string;
    respCivile:string;
    codeTVA:string;
    address: addresse = new addresse();
    site:string;
    tel:string;
    fax: string;
    constructor(){};
}
