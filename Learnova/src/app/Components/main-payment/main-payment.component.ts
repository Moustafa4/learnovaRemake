import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-main-payment',
  standalone: true,
  imports: [NgClass,RouterLink,RouterOutlet,FormsModule,CommonModule],
  templateUrl: './main-payment.component.html',
  styleUrl: './main-payment.component.css'
})
export class MainPaymentComponent {

// Display control for proceed button
isProceedVisible: boolean = true;


onProceedClick() {
  this.isProceedVisible = false;
}


// Confirmation toggle
isConfirmed: boolean = false;

toggleConfirmation() {
  this.isConfirmed = !this.isConfirmed;


}


  // Initialize states for the plan cards
  status: boolean = false;
  statustwo: boolean = false;
  statusthree: boolean = false;

  // Default selected plan and cost
  thecost: number = 199.00;
  activePlan: string = 'yearly'; // Default active plan

  // Method to set the active plan
  setActivePlan(plan: string) {
    this.activePlan = plan;
    console.log(this.activePlan);
    if(this.activePlan=='yearly'){
      this.thecost = 199.00;

    }else if(this.activePlan=='monthly'){
      this.thecost=399.00;
    }else{
      this.thecost=266.00;


    }
  }

  // Display state for proceed button
  display: boolean = true;
  nondisplay: boolean = false;

  // Payment-related properties
  inputValue: string = ''; // Clear input
  showAlert: boolean = false;

  // Form data for handling user input
  formData = {
    name: '',
    email: '',
    message: '',
  };






  // Function to handle payment logic
  pay() {
    // Logic to handle payment (you can replace this with actual payment logic)

    // Show success alert
    this.showAlert = true;
    this.clearinput();
  }

  // Clear input field
  clearinput() {
    this.inputValue = ''; // Clear the input field
  }

  // Confirm transaction
  confirmed() {
    this.isConfirmed = true;
    setTimeout(() => {
      window.location.reload();
    }, 3000); // Delay in 1 second
  }



}
