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
  constructor(private formbuilder:FormBuilder,private api:ApiService,public share:SharedserviceService) { }

  ngOnInit(): void {
    this.reportForm=this.formbuilder.group({
      vinNumber:['',Validators.required]
    })
    this.setValueInDropdown();
  }
 
  //display the integrated table form fuel,insurance,maintanence,vehicle database.
  
  displayTable(val:any){
    this.share.store=[];
    this.api.getAllVehicleData(val.target.value).subscribe(res=>{
      this.share.storeFieldObj=res;
      this.api.getFuleData().subscribe(res=>{
        this.storeAllFuelId=res;
        this.storeAllFuelId=this.storeAllFuelId.rows;
        for (const iterator of this.storeAllFuelId) {
          this.api.getAllFuelData(iterator.id).subscribe(res=>{
            this.storeAllFuelData=res;
            if(this.storeAllFuelData.unique==val.target.value)
            {
              this.storeConfirmFueldata=this.storeAllFuelData;
              this.api.getMaintanenceData().subscribe(res=>{
                this.storeAllMaintanenceId=res;
                this.storeAllMaintanenceId=this.storeAllMaintanenceId.rows;
                for (const iterator of this.storeAllMaintanenceId) {
                  this.api.getAllMaintanenceData(iterator.id).subscribe(res=>{
                    this.storeAllMaintanenceData=res;
                    if(this.storeAllMaintanenceData.unique==val.target.value){
                      this.storeConfirmMaintanenceData=this.storeAllMaintanenceData;
                      this.api.getInsuranceData().subscribe(res=>{
                        this.storeAllInsuranceId=res;
                        this.storeAllInsuranceId=this.storeAllInsuranceId.rows;
                        for (const iterator of this.storeAllInsuranceId) {
                          this.api.getAllInsuranceData(iterator.id).subscribe(res=>{
                            this.storeAllInsuranceData=res;
                            if(this.storeAllInsuranceData.unique==val.target.value){
                              this.storeConfirmInsuranceData=this.storeAllInsuranceData;
                              this.displayObject={
                                drivername:this.share.storeFieldObj.drivername,
                                vehiclenumber:this.share.storeFieldObj.vehiclenumber,
                                vehicletype:this.share.storeFieldObj.vehicletype,
                                vehiclecolor:this.share.storeFieldObj.color,
                                registrationdate:this.share.storeFieldObj.registerdate,
                                chasisno:this.share.storeFieldObj.chasisno,
                                vehiclecost:this.share.storeFieldObj.cost,
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
                              this.share.store.push(this.displayObject);
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

  //Display already existing vehicle number from vehicle database 

  setValueInDropdown(){
    this.api.getVehicleData().subscribe(res=>{
      this.share.allIdObj=res;
      this.share.allIdObj=this.share.allIdObj.rows;
      for (const key of this.share.allIdObj) {
        this.api.getAllVehicleData(key.id).subscribe(res=>{
          this.share.storeDrobdownObj.push(res);
        },rej=>{
          console.log("error"+rej);
        })
      }
    },rej=>{
      alert("opps! Somthing went wrong"+rej);
    })
  }
}
