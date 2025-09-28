import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

/**
 * LogInComponent manages the login form UI and interaction with AuthService.
 */
@Component({
  selector: 'app-log-in',
  // Import header component and reactive forms for template use
  imports: [HeaderComponent, ReactiveFormsModule, RouterModule],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {

  /**
   * Holds error messages returned from backend after login attempts.
   * Used in the template to show validation messages.
   */
  validations: any | undefined = undefined;

  /** Controls the visibility of the password input field (show/hide). */
  showPassword: boolean = false;

  /** Reactive form group to hold login form controls (email & password). */
  loginForm: FormGroup;

  /**
   * Constructor injects FormBuilder to build form and AuthService for API calls.
   */
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    // Initialize the form group with email and password controls
    this.loginForm = this.fb.group({
      email: '',                  // Email input control
      password: '',               // Password input control
    });
  }

  /**
   * Called when the login form is submitted.
   * Sends the form data to the AuthService login endpoint.
   */
  onSubmit() {
    // console.log("Form value:", this.loginForm.value);
    // Pass the form's current values to the login API
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {

        // Reset form fields after successful login
        this.loginForm.reset();

        // Save token returned from API (if present) to localStorage
        if (response?.token) {
          this.authService.saveToken(response.token);
        }
        
        // Clear any previous validation errors after successful login
        this.validations = undefined;
        this.router.navigate(['/']);
        // Optionally navigate somewhere (e.g., dashboard)
        // this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        // Log error to console for debugging
        console.error('Login failed', err);

        // Store validation errors to show them in the template
        this.validations = err.error;
      }
    });
  }

  /**
   * Toggles password input visibility between text and password field.
   * Bound to the show/hide button in the template.
   */
  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
