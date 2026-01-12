
import { Component, HostListener } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';

@Component({
    selector: 'app-header2',
    imports: [RouterModule, RouterLinkActive],
    templateUrl: './header2.component.html',
    styleUrl: './header2.component.css'
})
export class Header2Component {
isScrolled=false;
@HostListener('window:scroll')
  onScroll(){
    this.isScrolled=window.scrollY>10;
}
}
