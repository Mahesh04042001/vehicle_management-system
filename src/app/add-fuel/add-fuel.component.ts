import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent implements OnInit {

  fuelform!:FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.fuelform=this.formbuilder.group({
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      quantity:['',Validators.required],
      fillingdate:['',Validators.required],
      cost:['',Validators.required]

    })
  }


}
