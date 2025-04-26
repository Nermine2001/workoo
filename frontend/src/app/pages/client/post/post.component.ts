import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServiceService } from '../../../core/services/service.service';
import { UserService } from '../../../core/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  postForm : FormGroup;
  image : any;
  idUser : any;

  constructor(private fb: FormBuilder, private _service: ServiceService, private _user: UserService, private router: Router){
    let controls = {
      name: new FormControl('', [ Validators.required ]),
      category: new FormControl('', [ Validators.required ]),
      location: new FormControl('', [ Validators.required ]),
      salary: new FormControl('', [ Validators.required ]),
      description: new FormControl('', [ Validators.required ]),
    }

    this.postForm = this.fb.group(controls);
  }

  selectImage(event: any){
    this.image = event.target.files[0];
  }

  create(){
    let formData = new FormData();
    formData.append('name', this.postForm.value.name);
    formData.append('category', this.postForm.value.category);
    formData.append('location', this.postForm.value.location);
    formData.append('salary', this.postForm.value.salary);
    formData.append('description', this.postForm.value.description);
    formData.append('image', this.image);
    formData.append('idUser', this._user.getUserIdFromToken());

    this._service.createService(formData).subscribe(res => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Service created successfully',
        showConfirmButton: false,
        timer: 1500
      });
      this.router.navigate(['/client/my-services']);
    });
  }

}
