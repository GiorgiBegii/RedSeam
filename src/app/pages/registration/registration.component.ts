import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


function passwordMatchValidator(control: AbstractControl) {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password !== confirmPassword) {
    control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
  } else {
    control.get('confirmPassword')?.setErrors(null);
  }
  return null;
}

@Component({
  selector: 'app-registration',
  imports: [HeaderComponent, ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent {

  validations: any | undefined = undefined

  avatarPreview: string | ArrayBuffer = '/images/avatar.png';

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registrationForm = this.fb.group({
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      image: null,
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.registrationForm.patchValue({ avatar: file });
      this.registrationForm.get('avatar')?.updateValueAndValidity();
      this.avatarPreview = URL.createObjectURL(file);
    }
  }

  removeAvatar(): void {
    this.registrationForm.patchValue({ avatar: null });
    this.avatarPreview = "/images/avatar.png";
  }

  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        // maybe navigate to login page or show success message
        if(response){
          this.registrationForm.reset();
          this.removeAvatar()
          this.authService.saveToken(response.token)
        }
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.validations = err.error
      }
    });



  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
      this.showConfirmPassword = !this.showConfirmPassword;
  }
}
