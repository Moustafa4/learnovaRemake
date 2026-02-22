import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Instructorservisces } from '../../../services/instructor_servisces/instructorservisces';
import { map } from 'rxjs';
import { Iinstructor } from './iinstructor';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-instructors',
  imports: [FormsModule],
  templateUrl: './instructors.component.html',
  styleUrl: './instructors.component.css',
})
export class InstructorsComponent {
  private instructor_services = inject(Instructorservisces);

  private $instructor = this.instructor_services
    .instuctor_data()
    .pipe(map((inst) => inst ?? ([] as Iinstructor[])));
  
  _instructor = toSignal(this.$instructor, {
    initialValue: [] as Iinstructor[],
  });


}
