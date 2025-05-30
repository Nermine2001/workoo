import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any;
  userId: any;

  image: any;

  registerForm: FormGroup;

      constructor(private fb: FormBuilder, private _user: UserService){
        let controls = {
          firstname: new FormControl('', [ Validators.required ]),
          lastname: new FormControl('', [ Validators.required ]),
          email: new FormControl('', [ Validators.required, Validators.email ]),
          password: new FormControl('', []),
        }

        this.registerForm = this.fb.group(controls);
      }

      selectImage(event: any){
        this.image = event.target.files[0];
      }

      ngOnInit(): void {
        this.userId = this._user.getUserIdFromToken();

        this._user.getUserById(this.userId).subscribe(res => {
          this.user = res;
          this.registerForm.reset(res);
      });
      }

      save(){
        let formData = new FormData();
        formData.append('firstname', this.registerForm.value.firstname);
        formData.append('lastname', this.registerForm.value.lastname);
        formData.append('email', this.registerForm.value.email);
        if(this.registerForm.value.password){
            formData.append('password', this.registerForm.value.password);
        }
        if(this.image){
          formData.append('image', this.image);
        }

        this._user.editUser(this.userId, formData).subscribe(res => {
          window.location.reload();
          this.user = res;
          this.registerForm.reset(res);
        });
      }

}
