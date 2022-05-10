import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
driverform!:FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.driverform=this.formbuilder.group({
      drivername:['',Validators.required],
      mobile:['',Validators.required],
      licencenumber:['',Validators.required],
      licenceenddate:['',Validators.required],
      city:['',Validators.required],
      state:['',Validators.required],

    })
  }

}
