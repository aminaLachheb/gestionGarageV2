import { ngDocument } from "./ngDocument";
import { signer } from "./signer";
import { user } from "./User";

export class transaction {
      uuid: string;
      puuid: string;
      creationDate: string;
      status: string;
      digestAlgo: string;
      signingTime: string;
      creator: user;
      nextSigner: string;
      parallelSignatures: boolean;
      byApi: boolean;
      lockDate: string;
      lockingSigner: string;
      signers: signer[];
      observers: user[];
      pdfs: ngDocument[];
    constructor(){};
}
