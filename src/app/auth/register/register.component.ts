import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public autService: AuthService) { }

  ngOnInit() {
  }

  onSubmit( data: any ) {
    this.autService.createUser( data.name, data.email, data.password);
  }


}
