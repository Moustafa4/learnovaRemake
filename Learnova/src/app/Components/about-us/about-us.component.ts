import { Component } from '@angular/core';
import { InstructorsComponent } from '../instructors/instructors.component';
import { Header2Component } from "../header2/header2.component";
import { FooterComponent } from "../footer/footer.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-about-us',
    imports: [InstructorsComponent,  RouterLink, RouterOutlet],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css'
})
export class AboutUsComponent {

}

