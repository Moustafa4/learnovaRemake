import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-inst-dash-board',
    imports: [],
    templateUrl: './inst-dash-board.component.html',
    styleUrls: ['./inst-dash-board.component.css']
})
export class InstDAshBoardComponent implements OnInit {
  instructorName: string = '';
  instructorPicture: string = '';

  toggleSidebar() {
    const wrapper = document.getElementById('wrapper');
    wrapper?.classList.toggle('toggled');
  }

  ngOnInit(): void {
    // استرجاع بيانات المدرس من currentUser
    const userData = this.getInstructorData();
    if (userData) {
      this.instructorName = `${userData.firstName} ${userData.lastName}`;
      this.instructorPicture = userData.profilePicture;
    }
  }

  // دالة لاسترجاع بيانات المدرس من currentUser
  getInstructorData() {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user && user.role === 'teacher' ? user : null;
  }
}
