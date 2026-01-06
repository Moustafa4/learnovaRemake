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

  // وظيفة لجلب المدرسين من localStorage
  // getInstructorsFromLocalStorage() {
  //   for (let i = 0; i < localStorage.length; i++) {
  //     const key = localStorage.key(i);
  //     if (key && key.startsWith('user_')) {
  //       const userData = JSON.parse(localStorage.getItem(key)!);
  //       // التحقق إذا كان المستخدم هو مدرس
  //       if (userData.role === 'teacher') {
  //         this.experts.push({
  //           name: `${userData.firstName} ${userData.lastName}`,
  //           role: userData.specialization || 'Teacher', // استخدام التخصص إذا كان متاحًا
  //           image: userData.profilePicture || 'default-image-path.jpg', // إذا لم يتم رفع صورة، استخدم صورة افتراضية
  //         });
  //       }
  //     }
  //   }
  // }
}
