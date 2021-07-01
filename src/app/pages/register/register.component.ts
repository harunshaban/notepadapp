import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  email = "";
  password = "";
  errorMessage = ""; // validation error handle
  error: { name: string, message: string } = { name: '', message: '' }; // for firebase error handle

  constructor(private authservice : AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  clearErrorMessage()
  {
    this.errorMessage = '';
    this.error = { name : '', message : '' };
  }

  register()
  {
    this.clearErrorMessage();
    if(this.validateForm(this.email, this.password)) 
    {
      try{
        this.authservice.registerWithEmail(this.email, this.password)
        this.router.navigate(['/mainpage']);
      }catch(_error){
        this.error = _error;
        this.router.navigate(['/register']);
      }
    }
  }

  validateForm(email: string, password: string)
  {
    if(email.length ===0)
    {
      this.errorMessage = "Please enter email";
      return false;
    }
    if(password.length ===0)
    {
      this.errorMessage = "Please enter password";
      return false;
    }
    if(password.length < 6)
    {
      this.errorMessage = "Password should be at least 6 char";
      return false;
    }

    this.errorMessage = '';
    return true;
  }

}
