
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


import { NgForm } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-sign-up',

  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  user!: User;
  emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(private userService: UserService, private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      UserName: '',
      Password: '',
      Email: '',
      FirstName: '',
      LastName: ''
    }
  }

  OnSubmit(form: NgForm) {
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        this.resetForm();
        this.toastr.success('User registration successful');
       }
      ,
     (err )=>{
      this.toastr.error('oops ! something went wrong');
      for (let x in err.error.errors) {
        this.toastr.error(err.error.errors[x]);
      }
    }
    );
  }

}