import { Component } from '@angular/core';
import { InstructorsComponent } from '../instructors/instructors.component';

@Component({
    selector: 'app-error',
    imports: [InstructorsComponent],
    templateUrl: './error.component.html',
    styleUrl: './error.component.css'
})
export class ErrorComponent {

}
