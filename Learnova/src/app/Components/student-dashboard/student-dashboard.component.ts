import { Component } from '@angular/core';

@Component({
    selector: 'app-student-dashboard',
    imports: [],
    templateUrl: './student-dashboard.component.html',
    styleUrl: './student-dashboard.component.css'
})
export class StudentDashboardComponent {
  updateProgress(course: string) {
    alert(`Progress for ${course} updated!`);
  }

  studentName: string = '';
  studentPicture: string = '';
  ngOnInit(): void {
    // استرجاع بيانات الطالب من currentUser
    const userData = this.getInstructorData();
    if (userData) {
      this.studentName = `${userData.firstName} ${userData.lastName}`;
      this.studentPicture = userData.profilePicture;
    }
  }

  // دالة لاسترجاع بيانات الطالب من currentUser
  getInstructorData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'student' ? user : null;
  }
}
