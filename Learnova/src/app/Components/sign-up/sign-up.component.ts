import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
    selector: 'app-sign-up',
    imports: [FormsModule, CommonModule],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  selectedRole: string = 'student';
  firstName: string = '';
  lastName: string = '';
  phone: any;
  email: string = '';
  password: string = '';
  specialization: string = '';
  experience: number = 0;
  nationalId: string = '';
  country: string = '';
  confirmEmail: string = '';
  confirmPassword: string = '';
  agreeToPolicy: boolean = false;
  profilePicture: string = '';

  selectRole(role: string) {
    this.selectedRole = role;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(signupForm: NgForm) {
    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/;

    if (this.email !== this.confirmEmail) {
      alert('Email and Confirm Email do not match!');
      return;
    }

    if (!emailPattern.test(this.email)) {
      alert(
        'Email must be from gmail.com, yahoo.com, hotmail.com, or outlook.com'
      );
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Password and Confirm Password do not match!');
      return;
    }

    const existingUsersCount = Object.keys(localStorage).filter((key) =>
      key.startsWith('user_')
    ).length;

    const newId = existingUsersCount + 1;

    const userData = {
      id: newId,
      role: this.selectedRole,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      email: this.email,
      password: this.password,
      specialization:
        this.selectedRole === 'teacher' ? this.specialization : '',
      experience: this.selectedRole === 'teacher' ? this.experience : '',
      nationalId: this.selectedRole === 'teacher' ? this.nationalId : '',
      country: this.selectedRole === 'teacher' ? this.country : '',
      profilePicture: this.profilePicture,
      agreeToPolicy: this.agreeToPolicy,
    };

    localStorage.setItem(`user_${newId}`, JSON.stringify(userData));

    alert(`Registration successful! Your data has been saved.`);
    signupForm.reset();
  }

 
}
