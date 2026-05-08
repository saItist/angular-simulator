import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IUser } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrl: './user-create.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class UserCreateComponent {

  @Output() createUser: EventEmitter<IUser> = new EventEmitter<IUser>();

  protected form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    username: new FormControl(''),
    email: new FormControl('', [Validators.email]),
    phone: new FormControl(''),
    website: new FormControl(''),
    city: new FormControl(''),
    street: new FormControl(''),
    companyName: new FormControl(''),
  });

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const values = this.form.value;

    const user: IUser = {
      id: Date.now(),
      name: values.name,
      username: values.username || '',
      email: values.email || '',
      phone: values.phone || '',
      website: values.website || '',
      address: {
        street: values.street || '',
        suite: '',
        city: values.city || '',
        zipcode: '',
        geo: { lat: '', lng: '' },
      },
      company: {
        name: values.companyName || '',
        catchPhrase: '',
        bs: '',
      },
    };

    this.createUser.emit(user);
    this.form.reset();
  }

}
