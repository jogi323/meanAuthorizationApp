import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }
validateRegister(user){
  if(user.firstname==''|| user.lastname==''|| user.username==''|| user.email==''|| user.password==''|| user.mobile==undefined|| user.gender==''){
    return false;
  }else{
    return true;
  }
}
validateEmail(email){
   var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
}
