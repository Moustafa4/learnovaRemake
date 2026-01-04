import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Courses } from '../courses';
import { CartService } from '../../../../services/cartser/cart.service';
// import { Course } from '../course.model';

@Component({
    selector: 'app-ux-ui',
    imports: [CommonModule],
    templateUrl: './ux-ui.component.html',
    styleUrl: './ux-ui.component.css'
})
export class UxUiComponent {



  // addToCart(Course: Course) {
  //   this.cartService.addToCart(Course);
  // }
}
