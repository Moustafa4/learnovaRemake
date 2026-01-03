import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { Expert, InstructorsComponent } from '../instructors/instructors.component';
import { InstructorsServiceService } from '../Instructors-serv/instructors-service.service';
import { Course } from '../courses/course.model';
import { Courses } from '../courses/courses';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterModule,RouterLinkActive,RouterOutlet,CommonModule, InstructorsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit  {
  responsiveCardCols: number = 5;
  groupedCourses: Course[][] = [];
  experts: Expert[] = [];

  constructor(private instructorsService: InstructorsServiceService) {}

  ngOnInit(): void {

    // if (window.innerWidth < 768) {
    //   this.responsiveCardCols = 2;
    // }
    // this.experts = this.instructorsService.getExperts();
    // this.groupedCourses = this.getCourseGroups(Courses, 5);
    this.updateResponsiveCols(window.innerWidth);
    this.experts = this.instructorsService.getExperts();
    this.groupedCourses = this.getCourseGroups(Courses, this.responsiveCardCols);

  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateResponsiveCols(event.target.innerWidth);
    // Update the groupedCourses based on the new responsiveCardCols
    this.groupedCourses = this.getCourseGroups(Courses, this.responsiveCardCols);
  }
  updateResponsiveCols(screenWidth: number): void {
    if (screenWidth < 768) {
      this.responsiveCardCols = 2; // Small screens
    } else if (screenWidth >= 768 && screenWidth < 992) {
      this.responsiveCardCols = 3; // Medium screens
    } else {
      this.responsiveCardCols = 5; // Large screens
    }
  }

  // Group experts based on the responsiveCardCols value
  getExpertGroups(array: Expert[], groupSize: number = this.responsiveCardCols): Expert[][] {
    const groups: Expert[][] = [];
    for (let i = 0; i < array.length; i += groupSize) {
      groups.push(array.slice(i, i + groupSize));
    }
    return groups;
  }

  // Group courses based on the responsiveCardCols value
  getCourseGroups(courses: Course[], groupSize: number = this.responsiveCardCols): Course[][] {
    const groups: Course[][] = [];
    for (let i = 0; i < courses.length; i += groupSize) {
      groups.push(courses.slice(i, i + groupSize));
    }
    return groups;
  }
  // getExpertGroups(array: Expert[], groupSize: number): Expert[][] {
  //   const groups: Expert[][] = [];
  //   for (let i = 0; i < array.length; i += groupSize) {
  //     groups.push(array.slice(i, i + groupSize));
  //   }
  //   return groups;
  // }

  // getCourseGroups(courses: Course[], groupSize: number): Course[][] {
  //   const groups = [];
  //   for (let i = 0; i < courses.length; i += groupSize) {
  //     groups.push(courses.slice(i, i + groupSize));
  //   }
  //   return groups;
  // }
}
