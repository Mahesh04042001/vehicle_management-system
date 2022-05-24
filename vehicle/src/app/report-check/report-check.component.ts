import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { SharedserviceService } from '../service/sharedservice.service';

@Component({
  selector: 'app-report-check',
  templateUrl: './report-check.component.html',
  styleUrls: ['./report-check.component.css'],
  providers:[SharedserviceService]
})
export class ReportCheckComponent implements OnInit {

  reportForm !:FormGroup;
  alluser!:any;
  store:any=[];
  showAdd!:boolean;
  showUpdate!:boolean;
  storeDrobdownObj:any=[];
  storeFieldObj:any;
  storeResObj:any;
  entryCheck:any=0;
  storeMaintainData:any;
  storeVehicleData:any;
  createObj:any;
  Vehiclecheck:any=0;
  arr:any=[];
  storeAllFuelId:any;
  storeAllFuelData:any;
  storeConfirmFueldata:any;
  storeAllMaintanenceId:any;
  storeAllMaintanenceData:any;
  storeConfirmMaintanenceData:any;
  storeAllInsuranceId:any;
  storeAllInsuranceData:any;
  storeConfirmInsuranceData:any;
  displayObject:any;
  storeTableData:any=[];
  constructor(private formbuilder:FormBuilder,private api:ApiService,private share:SharedserviceService) { }

  ngOnInit(): void {
    this.reportForm=this.formbuilder.group({
      vinNumber:['',Validators.required]
  })
  this.setValueInDropdown();
  }
 
  displayTable(val:any){
    this.storeTableData=[];
    console.log("Hi"+val);
    console.log(val.target.value);
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      console.log(res);
      this.storeFieldObj=res;
      this.api.getFuleData().subscribe(res=>{
        this.storeAllFuelId=res;
        this.storeAllFuelId=this.storeAllFuelId.rows;
        console.log(this.storeAllFuelId);
        console.log("fuel datas");
        for (const iterator of this.storeAllFuelId) {
          this.api.getAllFuelData(iterator.id).subscribe(res=>{
            this.storeAllFuelData=res;
            console.log(this.storeAllFuelData);
            if(this.storeAllFuelData.unique==val.target.value)
            {
              this.storeConfirmFueldata=this.storeAllFuelData;
              console.log(this.storeConfirmFueldata);
              console.log(this.storeFieldObj);
              this.api.getMaintanenceData().subscribe(res=>{
                this.storeAllMaintanenceId=res;
                this.storeAllMaintanenceId=this.storeAllMaintanenceId.rows;
                for (const iterator of this.storeAllMaintanenceId) {
                  this.api.getAllMaintanenceData(iterator.id).subscribe(res=>{
                    this.storeAllMaintanenceData=res;
                    if(this.storeAllMaintanenceData.unique==val.target.value){
                      this.storeConfirmMaintanenceData=this.storeAllMaintanenceData;
                      console.log(this.storeConfirmMaintanenceData);
                      this.api.getInsuranceData().subscribe(res=>{
                        this.storeAllInsuranceId=res;
                        this.storeAllInsuranceId=this.storeAllInsuranceId.rows;
                        for (const iterator of this.storeAllInsuranceId) {
                          console.log('ho');
                          this.api.getAllInsuranceData(iterator.id).subscribe(res=>{
                            this.storeAllInsuranceData=res;
                            if(this.storeAllInsuranceData.unique==val.target.value){
                              this.storeConfirmInsuranceData=this.storeAllInsuranceData;
                              this.displayObject={
                                drivername:this.storeFieldObj.drivername,
                                vehiclenumber:this.storeFieldObj.vehiclenumber,
                                vehicletype:this.storeFieldObj.vehicletype,
                                vehiclecolor:this.storeFieldObj.color,
                                registrationdate:this.storeFieldObj.registerdate,
                                chasisno:this.storeFieldObj.chasisno,
                                vehiclecost:this.storeFieldObj.cost,
                                quantity:this.storeConfirmFueldata.quantity,
                                fillingdate:this.storeConfirmFueldata.fillingdate,
                                fuelcost:this.storeConfirmFueldata.cost,
                                maintanencedate:this.storeConfirmMaintanenceData.date,
                                maintanencecost:this.storeConfirmMaintanenceData.cost,
                                insurancecompany:this.storeConfirmInsuranceData.company,
                                startdate:this.storeConfirmInsuranceData.startdate,
                                enddate:this.storeConfirmInsuranceData.enddate,
                                insurancecost:this.storeConfirmInsuranceData.cost
                              }
                              console.log("hel");
                              console.log(this.displayObject);
                              this.storeTableData.push(this.displayObject);
                            }
                          },rej=>{
                            console.log(rej);
                          })
                          
                        }
                      },rej=>{
                        console.log(rej);
                      })
                    }
                  },rej=>{
                    console.log(rej);
                  })
                  
                }
              },rej=>{
                console.log(rej);
              })
            }
          },rej=>{
            console.log(rej);
          })
        }
      },rej=>{
        console.log(rej);
      })
    },rej=>{
      console.log(rej);
    })
  }

  setValueInDropdown(){
    this.api.getVehicleData().subscribe(res=>{
      this.alluser=res;
      this.alluser=this.alluser.rows;
      for (const key in this.alluser) {
        if (Object.prototype.hasOwnProperty.call(this.alluser, key)) {
          const element = this.alluser[key];
          this.api.getAllVehicleData(element.id).subscribe(res=>{
            console.log(res);
            this.storeDrobdownObj.push(res);
            },rej=>{
              console.log("error"+rej);
          })
        }
      }
    },rej=>{
      alert("opps! Somthing went wrong"+rej);
    })
  }

  
}
