import { Component, inject, Input } from '@angular/core';
import { CartService } from '../../../../services/cartser/cart.service';
import { CoursesService } from '../../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../icourses';
import { toSignal } from '@angular/core/rxjs-interop';
// import { Course } from '../course.model';

@Component({
  selector: 'app-ux-ui',
  imports: [],
  templateUrl: './ux-ui.component.html',
  styleUrl: './ux-ui.component.css',
})
export class UxUiComponent {
  private courses_services = inject(CoursesService);

  private $Uiux = this.courses_services.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[])),
    map((courses) =>
      courses.filter((courses) => courses.typ?.toLocaleLowerCase() === 'ux_ui')
    )
  );
 _uiux= toSignal(this.$Uiux,{initialValue:[]as ICourses[]})
  // addToCart(Course: Course) {
  //   this.cartService.addToCart(Course);
  // }
}
