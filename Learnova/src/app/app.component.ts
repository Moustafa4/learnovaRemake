import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { Header2Component } from './Components/header2/header2.component';
import { SupportComponent } from "./Components/support/support.component";

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,

        FooterComponent,
        RouterModule,
        Header2Component,
        SupportComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Learnova';
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
