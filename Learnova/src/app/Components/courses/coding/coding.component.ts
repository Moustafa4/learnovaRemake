import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cartser/cart.service';
import { Course } from '../course.model';
import { Courses } from '../courses';

@Component({
  selector: 'app-coding',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './coding.component.html',
  styleUrl: './coding.component.css',
})
export class CodingComponent {
  // coding.component.ts
  codingCourses = Courses.filter((Courses) => Courses.typ.startsWith('coding'));
  constructor(private cartService: CartService) {}
  // cart ser

  @Input() courses: Course[] = [];

  addToCart(Course: Course) {
    this.cartService.addToCart(Course);
  }
}
