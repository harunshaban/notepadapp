import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState: any = null;

  constructor( private afu: AngularFireAuth, private router: Router) 
  {
    this.afu.authState.subscribe((auth=>{
      this.authState = auth;
    }))
  }

  registerWithEmail(email: string, password: string)
  {
    this.afu.createUserWithEmailAndPassword(email, password).then((user)=>{
      this.authState = user
    }).catch(error=>{
      console.log(error)
      throw error
    })
  }
}
