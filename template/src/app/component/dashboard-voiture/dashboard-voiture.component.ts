import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { activite } from 'src/app/models/activite';
import { DashboardService } from 'src/app/services/dashboard.service';
import { VoitureService } from 'src/app/services/voiture.service';

@Component({
  selector: 'app-dashboard-voiture',
  templateUrl: './dashboard-voiture.component.html',
  styleUrls: ['./dashboard-voiture.component.scss']
})
export class DashboardVoitureComponent implements OnInit {
  disponible:string="Voiture(s) disponible(s)";
  nondisponible:string="Voiture(s) vendu(s)";
  viewNumber: any[] = [650, 200];
  viewPie: any[] = [350, 200];
  view:any[]=[700, 500];
  
  totalVoiture =[];
  percentVoiture =[];
  percentVoitureEmployee=[];
  listeEmploye=[];
  Voitures=[];
  employes=[];
  selectEmploye: string = "all";
  activites:activite[]=[];

  legendTitle: string = 'Voitures';
  legendTitleMultiBar: string = 'Status';
  legend: boolean = true;

  xAxis: boolean = true;
  yAxis: boolean = true;

  yAxisLabel: string = 'Voitures';
  xAxisLabel: string = 'Employées';
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
  
  constructor(private voitureService: VoitureService,
    private cookieService: CookieService,
    private dashboardService: DashboardService) { 
      Object.assign(this.totalVoiture, this.Voitures, this.percentVoitureEmployee);     
     
     this.voitureService.countNonDispo().subscribe(
       res =>{
        //console.log(res.count);
        this.totalVoiture.push({
            name: this.nondisponible,
            value:res.count
          });
         this.percentVoiture.push({
            name:"% "+ this.nondisponible,
            value: res.count/this.totalVoiture[0].value
         });
       }
     );
     this.voitureService.countDispo().subscribe(
       res =>{
        //console.log(res.count);
        this.totalVoiture.push({
            name:this.disponible,
            value:res.count
          });
         
          this.percentVoiture.push({
           name:"% "+this.disponible,
           value: res.count/this.totalVoiture[0].value
        });
      
        //console.log(this.totalDoc);
        this.percentVoitureEmployee = this.percentVoiture;
        this.percentVoitureEmployee = [...this.percentVoitureEmployee];
        this.totalVoiture = [...this.totalVoiture];
       }
     );
    //  this.voitureService.countVoiture().subscribe(
    //   res =>{
    //    //console.log(res.count);
    //    this.totalVoiture.push({
    //        name:"Total voitures",
    //        value:res.count
    //      });
    //   }
    // );
    }

    ngOnInit(): void {
      this.voitureService.getVoitures().subscribe(
        res =>{
          for(let i=0; i<res.length; i++){
            this.listeEmploye.push(res[i].employe)
        }
         this.listeEmploye.filter((elem, i, arr) => {
          if (arr.indexOf(elem) === i) {
                this.voitureService.countVoitureDispo(elem).subscribe(
                  response=>{
                    this.voitureService.countVoitureNonDispo(elem).subscribe(
                  res=>{                  
                  this.employes.push({
                      name: elem,
                      series: [{
                        name:this.nondisponible,
                        value: res.count
                       },
                       {
                        name:this.disponible,
                        value: response.count
                       } ]
                  });
                  this.employes = [...this.employes];
                });
              });
          }
        })
        });   
      this.dashboardService.getActivites().subscribe(res=>{
        this.activites = res;          
    })
  
    }

    everyEmploye(value: string){
      this.percentVoitureEmployee = [];
      if(this.selectEmploye === "all"){
        this.percentVoitureEmployee = this.percentVoiture;
      }else{
        this.voitureService.countVoitureDispo(value).subscribe(
          resultat =>{
        this.voitureService.countVoitureNonDispo(value).subscribe(
          res =>{
            this.percentVoitureEmployee.push({
               name:"% "+ this.nondisponible,
               value: res.count/(resultat.count+res.count)
            },{
              name:"% "+this.disponible,
              value: resultat.count/(resultat.count+res.count)
            });
           console.log(this.percentVoitureEmployee);
           this.percentVoitureEmployee = [...this.percentVoitureEmployee];
          });
          });
        
      }
    }
  
  onSelect1(event) {
    event.percent = event.value/this.totalVoiture[0].value;
    console.log(event);
  }
}
