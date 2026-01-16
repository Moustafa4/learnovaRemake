
import { Component, effect, inject, Input } from '@angular/core';
import { CartService } from '../../../../services/cartser/cart.service';
import { CoursesService } from '../../../../services/courses_ser/courses.service';
import { map } from 'rxjs';
import { ICourses } from '../icourses';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-network',
  imports: [RouterModule],
  templateUrl: './network.component.html',
  styleUrl: './network.component.css',
})
export class NetworkComponent {
  private Courses_services = inject(CoursesService);

  private $network = this.Courses_services.Allcourses().pipe(
    map((courses) => courses ?? ([] as ICourses[])),
    map((courses) =>
      courses.filter(
        (courses) => courses.typ?.toLocaleLowerCase() === 'network'
      )
    )
  );

  _network = toSignal(this.$network, { initialValue: [] as ICourses[] });

  constructor() {
    effect(() => {
      console.log(this._network());
    });
  }
}
