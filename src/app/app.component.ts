import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RegistrationComponent } from './pages/registration/registration.component';
import { LogInComponent } from './pages/log-in/log-in.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RegistrationComponent, LogInComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'RedSeam';
}
