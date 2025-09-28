import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { ReactiveFormsModule, FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration', // Component selector for usage in templates
  imports: [HeaderComponent, ReactiveFormsModule, RouterModule], // Import reusable components and modules
  templateUrl: './registration.component.html', // HTML template
  styleUrl: './registration.component.css' // CSS styles (note: should be styleUrls: [] if multiple)
})
export class RegistrationComponent {

  // Holds error messages returned from backend
  validations: any | undefined = undefined

  // Default avatar preview image
  avatarPreview: string | ArrayBuffer = '/images/avatar.png';

  // Toggles to show/hide password fields
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Registration form group
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize form controls
    this.registrationForm = this.fb.group({
      username: '',               // Username input
      email: '',                  // Email input
      password: '',               // Password input
      password_confirmation: '',  // Confirm password input
      image: null,                // Image file input
    });
  }

  // Handle file selection (avatar upload)
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Add the file to the form (key should match backend field name)
      this.registrationForm.patchValue({ avatar: file });
      this.registrationForm.get('avatar')?.updateValueAndValidity();

      // Create a preview URL for the selected image
      this.avatarPreview = URL.createObjectURL(file);
    }
  }

  // Reset avatar to default
  removeAvatar(): void {
    this.registrationForm.patchValue({ avatar: null });
    this.avatarPreview = "/images/avatar.png";
  }

  // Submit the form data to the API
  onSubmit() {
    this.authService.register(this.registrationForm.value).subscribe({
      next: (response) => {
        if (response) {
          // Save token
          this.authService.saveToken(response.token);

          // Navigate to home after saving token
          this.router.navigate(['/']);

          // Reset form and avatar
          this.registrationForm.reset();
          this.removeAvatar();
        }
      },
      error: (err) => {
        console.error('Registration failed', err);
        this.validations = err.error;
      }
    });
  }

  // Toggle password field visibility
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // Toggle confirm password field visibility
  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }
}
