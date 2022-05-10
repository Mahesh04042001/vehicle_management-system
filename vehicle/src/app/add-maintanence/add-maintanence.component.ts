import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-add-maintanence',
  templateUrl: './add-maintanence.component.html',
  styleUrls: ['./add-maintanence.component.css']
})
export class AddMaintanenceComponent implements OnInit {
  maintanenceform!:FormGroup;
  constructor(private formbuilder:FormBuilder) { }

  ngOnInit(): void {
    this.maintanenceform=this.formbuilder.group({
      vehiclenumber:['',Validators.required],
      vehicletype:['',Validators.required],
      date:['',Validators.required],
      cost:['',Validators.required],
    })
  }
}
