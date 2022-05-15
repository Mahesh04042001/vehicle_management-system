import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
 

  constructor(private http:HttpClient) { }

  //Add User Component api services-----------------------------------------------
  adduser(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postuser/',doc);
  }

  getuserdata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getuser/');
  }
  getalluserdata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getuser/${id}`);
  }
  
  deleteuser(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deleteuser/${id}/${id1}`);
  }
  updateuser(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updateuser/',doc);
  }
  //------------------------------------------------------------------------------

  //Add Driver Component Api Services--------------------------------------------

  adddriverdata(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postdriver/',doc);
  }

  getdriverdata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getdriver/');
  }
  getalldriverdata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getdriver/${id}`);
  }
  
  deletedriverdata(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deletedriver/${id}/${id1}`);
  }
  updatedriverdata(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updatedriver/',doc);
  }

  //------------------------------------------------------------------------------
 
  //Add Vehicle Component Api Services--------------------------------------------

  addvehicledata(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postvehicle/',doc);
  }

  getvehicledata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getvehicle/');
  }
  getallvehicledata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getvehicle/${id}`);
  }
  
  deletevehicledata(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deletevehicle/${id}/${id1}`);
  }
  updatevehicledata(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updatevehicle/',doc);
  }

  //------------------------------------------------------------------------------


  //Add Insurance Component Api Services--------------------------------------------

  addfueldata(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postfuel/',doc);
  }

  getfuledata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getfuel/');
  }
  getallfueldata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getfuel/${id}`);
  }
  
  deletefueldata(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deletefuel/${id}/${id1}`);
  }
  updatefueldata(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updatefuel/',doc);
  }

  //------------------------------------------------------------------------------


  //Add Insurance Component Api Services--------------------------------------------

  addinsurancedata(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postinsurance/',doc);
  }

  getinsurancedata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getinsurance/');
  }
  getallinsurancedata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getinsurance/${id}`);
  }
  
  deleteinsurancedata(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deleteinsurance/${id}/${id1}`);
  }
  updateinsurancedata(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updateinsurance/',doc);
  }

  //------------------------------------------------------------------------------


  //Add Maintanence Component Api Services--------------------------------------------

  addmaintanencedata(doc:any){
    console.log(doc);
    return this.http.post('http://localhost:8000/postmaintanence/',doc);
  }

  getmaintanencedata(): Observable<{}> {
    return this.http.get('http://localhost:8000/getmaintanence/');
  }
  getallmaintanencedata(id:any): Observable<{}> {
    return this.http.get(`http://localhost:8000/getmaintanence/${id}`);
  }
  
  deletemaintanencedata(id:any,id1:any){
    return this.http.delete(`http://localhost:8000/deletemaintanence/${id}/${id1}`);
  }
  updatemaintanencedata(doc:any){
    console.log(doc);
    return this.http.put('http://localhost:8000/updatemaintanence/',doc);
  }

  //------------------------------------------------------------------------------

}
