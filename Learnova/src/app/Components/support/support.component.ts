import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import * as bootstrap from 'bootstrap';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule,NgClass,FormsModule],
  templateUrl: './support.component.html',
  styleUrl: './support.component.css'
})
export class SupportComponent {

     //function the popover
     //  popoverTriggerList: Element[] = Array.from(document.querySelectorAll('[data-bs-toggle="popover"]'));
     popoverList: bootstrap.Popover[] =  Array.from(document.querySelectorAll('[data-bs-toggle="popover"]')).map((popoverTriggerEl: Element) => {
      return new bootstrap.Popover(popoverTriggerEl);
     });



     isPopupVisible = false;
     formData = {
      name: '',
      email: '',
      massege:'',
     };

     openPopup() {
      this.isPopupVisible = true;
     }

     closePopup() {
      this.isPopupVisible = false;
     }
      datasupport=[{}];

     onSubmit() {
      console.log('Form Submitted', this.formData);
      // Handle form submission logic here
      this.closePopup();

      //local storage
        // Handle form submission logic here
        this.closePopup();
        this.datasupport.push(this.formData);

        localStorage.setItem('usersupportinfo',JSON.stringify(this.datasupport));
     }



     //get from  local storage[support masseges]

     //get data
     getdata(){


       console.log(localStorage.getItem('usersupportinfo'));
       console.log(this.datasupport)


     }



}
