import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,
  patch, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import fs from 'fs';
import {Addresse, Document, Invoice, PartnerDetails, Societe} from '../models';
import {DocumentRepository, InvoiceRepository, SocieteRepository} from '../repositories';
const pdf2base64 = require('pdf-to-base64');
const pdf = require('pdf-creator-node');
const {ToWords} = require('to-words');
const axios = require('axios');
export class InvoiceController {

  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
    @repository(DocumentRepository)
    public documentRepository: DocumentRepository,
    @repository(SocieteRepository)
    public societeRepository: SocieteRepository
  ) { }

  @post('/invoices')
  @response(200, {
    description: 'Invoice model instance',
    content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoice',
            exclude: ['id'],
          }),
        },
      },
    })
    invoice: Omit<Invoice, 'id'>,
  ): Promise<any> {
    const toWords = new ToWords({
      localeCode: 'fr-FR',
      converterOptions: {
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
      }
    });
    var total: number = 0;
    for (let item of invoice.items) {
      item.montantHT = item.quantity * item.PU;
      total += item.montantHT
    }
    var societes: Societe[] = await this.societeRepository.find();
    invoice.supplierDetails = new PartnerDetails();
    invoice.supplierDetails.partnerName = societes[0].nomSociete;
    invoice.supplierDetails.rib = societes[0].rib;
    invoice.supplierDetails.formeJuridique = societes[0].formeJuridique;
    invoice.supplierDetails.rc = societes[0].respCivile;
    invoice.supplierDetails.codeTVA = societes[0].codeTVA;

    invoice.supplierDetails.address = new Addresse();
    invoice.supplierDetails.address = societes[0].address;
    invoice.supplierDetails.site = societes[0].site;
    invoice.supplierDetails.fax = societes[0].fax;
    invoice.supplierDetails.tel = societes[0].tel;

    invoice.stampTax = 0.600;
    invoice.invoiceTotalWithoutTax = parseFloat(total.toFixed(3));
    invoice.totalTva = parseFloat(((invoice.invoiceTotalWithoutTax * invoice.tvaRate) / 100).toFixed(3));
    invoice.invoiceTotalWithTax = parseFloat((invoice.invoiceTotalWithoutTax + invoice.totalTva + invoice.stampTax).toFixed(3));
    invoice.invoiceTotalinLetters = toWords.convert(invoice.invoiceTotalWithTax);

    var identifiant: string = (await this.invoiceRepository.create(invoice)).id as string;
    var body = (await this.invoiceRepository.findById(identifiant));
    var html = fs.readFileSync('src/template.html', 'utf8');
    var options = {
      format: "A3",
      orientation: "portrait",
      type: "pdf",
      displayHeaderFooter: false,
    };
    var output = {
      html: html,
      data: {
        invoices: await body,
      },
      path: "public/storage/" + (await body).documentIdentifier + ".pdf",
    };
    var document: Document = new Document();
    pdf.create(output, options)
      .then((res: any) => {
        console.log(res);
      })
      .catch((error: any) => {
        console.error(error)
      });
    document.id = (await this.documentRepository.count()).count + 1;
    document.size = fs.statSync('public/storage/' + body.documentIdentifier + '.pdf').size / 1024;
    document.name = body.documentIdentifier;
    document.etat = "non signe";
    document.extension = "pdf";
    document.invoiceId = identifiant;
    document.module = body.clientDetails.partnerName;


    //console.log(document);

    return this.documentRepository.create(document);

    //DocumentController.prototype.createNew(identifiant?.toString());
  }

  @get('/invoices/count')
  @response(200, {
    description: 'Invoice model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Invoice) where?: Where<Invoice>,
  ): Promise<Count> {

    return this.invoiceRepository.count(where);
  }

  @get('/invoices')
  @response(200, {
    description: 'Array of Invoice model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Invoice, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Invoice) filter?: Filter<Invoice>,
  ): Promise<Invoice[]> {
    return this.invoiceRepository.find(filter);
  }

  @patch('/invoices')
  @response(200, {
    description: 'Invoice PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Invoice,
    @param.where(Invoice) where?: Where<Invoice>,
  ): Promise<Count> {
    return this.invoiceRepository.updateAll(invoice, where);
  }

  @get('/invoices/{id}')
  @response(200, {
    description: 'Invoice model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Invoice, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Invoice, {exclude: 'where'}) filter?: FilterExcludingWhere<Invoice>
  ): Promise<Invoice> {
    return this.invoiceRepository.findById(id, filter);
  }

  @patch('/invoices/{id}')
  @response(204, {
    description: 'Invoice PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {partial: true}),
        },
      },
    })
    invoice: Invoice,
  ): Promise<void> {
    await this.invoiceRepository.updateById(id, invoice);
  }

  @put('/invoices/{id}')
  @response(204, {
    description: 'Invoice PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() invoice: Invoice,
  ): Promise<void> {
    await this.invoiceRepository.replaceById(id, invoice);
  }

  @del('/invoices/{id}')
  @response(204, {
    description: 'Invoice DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.invoiceRepository.deleteById(id);
  }

}
