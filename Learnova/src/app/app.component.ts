import {
  Component,
  effect,
  ElementRef,
  inject,
  ViewChild,
} from '@angular/core';
import {
  Router,
  RouterLink,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { Header2Component } from './Components/header2/header2.component';
import { SupportComponent } from './Components/support/support.component';
import { FormsModule } from '@angular/forms';
import { Header_userComponent } from './Components/header_user/header_user.component';
import { Authserv } from '../services/authserv';
interface CurrentUser {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  phone: string;
}
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    FooterComponent,
    RouterModule,
    Header2Component,
    SupportComponent,
    Header_userComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Learnova';
  private auth = inject(Authserv);
  userdata = this.auth.user;
  @ViewChild('navbarDropdown') navbarDropdown!: ElementRef;
  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.closeDropdown();
    });
  }

  closeDropdown() {
    if (this.navbarDropdown) {
      const dropdownMenu =
        this.navbarDropdown.nativeElement.querySelector('.dropdown-menu');
      if (dropdownMenu && dropdownMenu.classList.contains('show')) {
        dropdownMenu.classList.remove('show');
      }
    }
  }
}
