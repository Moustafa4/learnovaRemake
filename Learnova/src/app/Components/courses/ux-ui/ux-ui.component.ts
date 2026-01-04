import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Courses } from '../courses';
import { CartService } from '../../../../services/cartser/cart.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-ux-ui',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ux-ui.component.html',
  styleUrl: './ux-ui.component.css',
})
export class UxUiComponent {
  ux_uiCourses = Courses.filter((course) => course.typ.startsWith('ux_ui'));
  // coding.component.ts
  constructor(private cartService: CartService) {}
  // cart ser

  @Input() courses: Course[] = [];

  addToCart(Course: Course) {
    this.cartService.addToCart(Course);
  }
}
