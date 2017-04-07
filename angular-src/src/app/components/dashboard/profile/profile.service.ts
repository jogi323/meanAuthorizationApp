import {Injectable}from "@angular/core";
import {Http,Response,Headers} from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable()
export class ProfileService{
    url:string;
    data:any={'success':'',error:''};
    authToken;
    user;
constructor(private _http:Http){
 
  
}
getService(){
    var  headers = new Headers;
    headers.append('Authorization',this.authToken)
     headers.append('Content-Type','application/json; charset=utf-8');
return this._http.get(this.url,{headers:headers}).map(res=>res);
}
postService(){
    var  headers = new Headers;
    headers.append('Authorization',this.authToken)
     headers.append('Content-Type','application/json; charset=utf-8');
return this._http.post(this.url,this.data,{headers:headers}).map(res=>res);
}
 loadToken(){
      var token=localStorage.getItem('id_token');
      this.authToken=token;
  }
}