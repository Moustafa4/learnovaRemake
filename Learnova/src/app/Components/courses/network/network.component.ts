
import { Component, Input } from '@angular/core';
import { Courses } from '../courses';
import { CartService } from '../../../../services/cartser/cart.service';

@Component({
    selector: 'app-network',
    imports: [],
    templateUrl: './network.component.html',
    styleUrl: './network.component.css'
})
export class NetworkComponent {
  networkCourses = Courses.filter((course) => course.typ.startsWith('network'));
  constructor(private cartService: CartService) {}
  // cart ser


}
