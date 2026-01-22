import { Component, inject } from '@angular/core';
import { CartService } from '../../../services/cartser/cart.service';

@Component({
  selector: 'app-student-dashboard',
  imports: [],
  templateUrl: './student-dashboard.component.html',
  styleUrl: './student-dashboard.component.css',
})
export class StudentDashboardComponent {
  updateProgress(course: string) {
    alert(`Progress for ${course} updated!`);
  }

  studentName: string = '';
  studentPicture: string = '';
  private prushedcourses = inject(CartService);
  myCourses = this.prushedcourses.myCourses;

  ngOnInit(): void {
    // استرجاع بيانات الطالب من currentUser
    const userData = this.getstudentData();
    if (userData) {
      this.studentName = `${userData.firstName} ${userData.lastName}`;
      this.studentPicture = userData.profilePicture;
    }
  }

  // فانكشن لاسترجاع بيانات الطالب من currentUser
  getstudentData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'student' ? user : null;
  }
}
