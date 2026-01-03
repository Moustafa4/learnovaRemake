import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Courses } from '../courses';
import { CartService } from '../../../cartser/cart.service';
import { Course } from '../course.model';

@Component({
  selector: 'app-network',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css'
})
export class NetworkComponent {
  networkCourses = Courses.filter(course => course.typ.startsWith('network'));
  constructor(private cartService: CartService) {}
  // cart ser

  @Input() courses: Course[] = [];

  addToCart(Course: Course) {
    this.cartService.addToCart(Course);
  }
}
