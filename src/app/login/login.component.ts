import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule],
  standalone:true
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log(this.authService);
    console.log(this.router)
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/lobby']);
    } else {
      alert('Invalid credentials');
    }
  }
}
