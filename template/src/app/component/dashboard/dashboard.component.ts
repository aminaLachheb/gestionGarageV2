import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { LanguageService } from 'src/app/core/services/language.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { DocumentService } from 'src/app/services/document.service';
import { transaction } from 'src/app/models/transaction';
import { activite } from 'src/app/models/activite';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  signed:string="Factures signées";
  unsigned:string="Factures non signées";

  viewNumber: any[] = [650, 200];
  viewPie: any[] = [350, 200];
  view:any[]=[700, 500];
  
  totalDoc =[];
  percentDoc =[];
  percentProjDoc=[];
  listeProj=[];
  projets=[];
  selectProj: string = "all";
  transactions:transaction[]=[];
  activites:activite[]=[];

  legendTitle: string = 'Products';
  legendTitleMultiBar: string = 'Etat';
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Factures';
  xAxisLabel: string = 'Projets';
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;

  rotateXAxisTicks: boolean = false;

  animations: boolean = true; // animations on load

  showGridLines: boolean = true; // grid lines

  showDataLabel: boolean = true; // numbers on bars

  schemeType: string = 'ordinal'; // 'ordinal' or 'linear'

  barPadding: number = 200;
  tooltipDisabled: boolean = false;

  gradient: boolean = false;
  isDoughnut: boolean = true;
  showLabels: boolean = true;
  showLegend: boolean = true;
  legendPosition: string = 'below'; // ['right', 'below']
  legendTitleMultiPie: string = 'Pourcentages';

  colorScheme = {
    domain: [ '#7aa3e5', '#a8385d', '#aae3f5', '#5AA454', '#E44D25', '#CFC0BB']
  };
  cardColor: string = '#deaff0';  
  
  constructor(private documentService: DocumentService,
    public translate: TranslateService,
    public languageService: LanguageService,
    private cookieService: CookieService,
    private dashboardService: DashboardService) {    
  // Object.assign(this, { productSales, productSalesMulti });  
   Object.assign(this.totalDoc, this.projets, this.percentProjDoc);     
   this.documentService.countDocuments().subscribe(
    res =>{
     //console.log(res.count);
     this.totalDoc.push({
         name:"Total factures",
         value:res.count
       });
    }
  );
  this.documentService.countSigne().subscribe(
    res =>{
     //console.log(res.count);
     this.totalDoc.push({
         name: this.signed,
         value:res.count
       });
      this.percentDoc.push({
         name:"% "+ this.signed,
         value: res.count/this.totalDoc[0].value
      });
    }
  );
  this.documentService.countNonSigne().subscribe(
    res =>{
     //console.log(res.count);
     this.totalDoc.push({
         name:this.unsigned,
         value:res.count
       });
      
       this.percentDoc.push({
        name:"% "+this.unsigned,
        value: res.count/this.totalDoc[0].value
     });
   
     //console.log(this.totalDoc);
     this.percentProjDoc = this.percentDoc;
     this.percentProjDoc = [...this.percentProjDoc];
     this.totalDoc = [...this.totalDoc];
    }
  );
  }


  ngOnInit(): void {
    this.documentService.getDocuments().subscribe(
      res =>{
        for(let i=0; i<res.length; i++){
          this.listeProj.push(res[i].module)
      }
       this.listeProj.filter((elem, i, arr) => {
        if (arr.indexOf(elem) === i) {
              this.documentService.countProjetNonSigne(elem).subscribe(
                response=>{
              this.documentService.countProjetSigne(elem).subscribe(
                res=>{                  
                this.projets.push({
                    name: elem,
                    series: [{
                      name:this.signed,
                      value: res.count
                     },
                     {
                      name:this.unsigned,
                      value: response.count
                     } ]
                });
                this.projets = [...this.projets];
              });
            });
        }
      })
      //console.log(this.projets);
      }    
    );   
    this.dashboardService.getTransactions().subscribe(res=>{
      this.transactions = res;
    })
      this.dashboardService.getActivites().subscribe(res=>{
          this.activites = res;          
      })
    
  }

  everyProj(value: string){
    this.percentProjDoc = [];
    if(this.selectProj === "all"){
      this.percentProjDoc = this.percentDoc;
    }else{
      this.documentService.countProjetNonSigne(value).subscribe(
        resultat =>{
      this.documentService.countProjetSigne(value).subscribe(
        res =>{
          this.percentProjDoc.push({
             name:"% "+ this.signed,
             value: res.count/(resultat.count+res.count)
          },{
            name:"% "+this.unsigned,
            value: resultat.count/(resultat.count+res.count)
          });
         console.log(this.percentProjDoc);
         this.percentProjDoc = [...this.percentProjDoc];
        });
        });
      
    }
  }

  
  onSelect1(event) {
    event.percent = event.value/this.totalDoc[0].value;
    console.log(event);
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  onSelect2(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
