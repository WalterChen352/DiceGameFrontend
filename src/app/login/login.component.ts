import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormsModule } from '@angular/forms';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router, private socket :SocketService ) {}

  login(): void {
    console.log(this.authService);
    console.log(this.router)
    this.socket.sendMessage('logging in')
    if (this.authService.login(this.username, this.password)) {
      this.router.navigate(['/lobby']);
    } else {
      alert('Invalid credentials');
    }
  }
}
