import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable()
export class UserService {

  //api URL 
    readonly rootUrl = 'http://localhost:59318/api/';
    constructor(private http: HttpClient) { }
  
    registerUser(user: User) {
      
      var data = {
        UserName: user.Email,
        Password: user.Password,
        FullName: user.FirstName
      }
      var reqHeader = new HttpHeaders({'No-Auth':'True'});
      return this.http.post(this.rootUrl + 'Users', data);
    }
    
    userAuthentication(userName: string, password: string) {
      var data ={userName : userName, password : password };
      var result =  this.http.post(this.rootUrl + 'Users/Authenticate', data);
      return this.http.post(this.rootUrl + 'Users/Authenticate', data);
    }
  
    getUserClaims(){
      
      var token = localStorage.getItem("userToken");
      var reqHeader = new HttpHeaders(
         { 
          'Authorization': 'Bearer '+ token
         }
        );
     return  this.http.get(this.rootUrl+'Users/GetUser', { headers: reqHeader });
    }
    
}
