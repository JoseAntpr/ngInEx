import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// RouterModule
import { RouterModule } from '@angular/router';

// Forms
import { FormsModule } from '@angular/forms';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

// Firebase
import { AngularFireAuthModule } from 'angularfire2/auth';





@NgModule({
    declarations: [
        LoginComponent,
        RegisterComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        AngularFireAuthModule,
        RouterModule
    ]
})
export class AuthModule { }
