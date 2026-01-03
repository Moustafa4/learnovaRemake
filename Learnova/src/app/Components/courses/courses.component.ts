import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CourseService } from '../course-serv/course.service';
import { Course } from '../courses/course.model'; // تأكد من المسار الصحيح
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  randomCourses: Course[] = []; // مصفوفة لتخزين الكورسات العشوائية
  cartService: any;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getAllCourses();
  }

  getAllCourses(): void {
    const allCourses = this.courseService.getCourses(); // تأكد من وجود هذه الدالة في Service
    this.randomCourses = this.shuffleArray(allCourses); // خلط المصفوفة
  }

  // دالة لخلط المصفوفة
  shuffleArray(array: Course[]): Course[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  @Input() courses: Course[] = [];

  addToCart(Course: Course) {
    this.cartService.addToCart(Course);
  }
}
