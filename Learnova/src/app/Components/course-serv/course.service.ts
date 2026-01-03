import { Injectable } from '@angular/core';
import { Course } from '../courses/course.model';
import { Courses } from '../courses/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private courses: Course[] = Courses;

  getCourses(): Course[] {
    return this.shuffleArray([...this.courses]);
  }

  // دالة لخلط المصفوفة
  private shuffleArray(array: Course[]): Course[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
