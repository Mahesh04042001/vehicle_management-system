import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-insurance',
  templateUrl: './add-insurance.component.html',
  styleUrls: ['./add-insurance.component.css']
})
export class AddInsuranceComponent implements OnInit {

  insuranceform!:FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.insuranceform=this.formbuilder.group({
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      company:['',Validators.required],
      startdate:['',Validators.required],
      enddate:['',Validators.required],
      cost:['',Validators.required],
    })
  }

}
