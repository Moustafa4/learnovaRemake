import { RouterLink, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import * as bootstrap from 'bootstrap';




@Component({
    selector: 'app-course-payment',
    imports: [RouterLink, RouterOutlet, FormsModule, NgClass],
    templateUrl: './course-payment.component.html',
    styleUrl: './course-payment.component.css'
})
export class CoursePaymentComponent {
  // Selected courses by user and total cost (from courses component)
theCourses: string[] = [];
totalCost: number = 0;

// Display control for proceed button
isProceedVisible: boolean = true;
isNotProceedVisible: boolean = false;

onProceedClick() {
  this.isProceedVisible = false;
  this.isNotProceedVisible = true;
}

// Alert visibility after payment
inputValue: string = ''; // To clear input field after payment
showAlert: boolean = false;

pay() {
  // Logic to handle payment (replace with actual payment logic if needed)

  this.showAlert = true; // Show success alert
  this.clearInput(); // Clear input after payment
}

clearInput() {
  this.inputValue = ''; // Reset input field
}

// Confirmation toggle
isConfirmed: boolean = false;
confirmpay(){
  this.isConfirmed=!this.isConfirmed;
  setTimeout(() => {
    window.location.reload();
  }, 3000); // Delay in 1 second


}




}
