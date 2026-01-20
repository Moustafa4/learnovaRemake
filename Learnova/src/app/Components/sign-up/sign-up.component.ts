import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [FormsModule, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
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
  // for errors
  emailMatchError: boolean = false;
  emailDomainError: boolean = false;
  passwordMatchError: boolean = false;
  storageError: boolean = false;
  fileSizeError: boolean = false;
  showSuccessMessage: boolean = false;
  private successTimeout: any;

  selectRole(role: string) {
    this.selectedRole = role;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Check size: 500KB limit (500 * 1024 bytes)
      const maxSizeInBytes = 500 * 1024;

      if (file.size > maxSizeInBytes) {
        this.fileSizeError = true;
        this.profilePicture = '';
        event.target.value = '';
        return;
      }
      this.fileSizeError = false;
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(signupForm: NgForm) {
    if (signupForm.form.controls) {
      Object.keys(signupForm.form.controls).forEach((key) => {
        signupForm.form.controls[key].markAsTouched();
      });
    }

    if (signupForm.invalid) {
      // Stop execution if form is invalid
      return;
    }
    // Reset all custom errors
    this.emailMatchError = false;
    this.emailDomainError = false;
    this.passwordMatchError = false;
    this.storageError = false;

    const emailPattern =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|hotmail\.com|outlook\.com)$/;

    if (this.email !== this.confirmEmail) {
      this.emailMatchError = true;
      return;
    }

    if (!emailPattern.test(this.email)) {
      this.emailDomainError = true;
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.passwordMatchError = true;
      return;
    }

    const emailExists = Object.keys(localStorage)
      .filter((key) => key.startsWith('user_'))
      .some((key) => {
        const user = JSON.parse(localStorage.getItem(key)!);
        return user.email === this.email;
      });
    if (emailExists) {
      alert('This Email Alredy Exists');
      return;
    }

    // 2. Prepare the data (Calculate ID and create Object)
    const existingUsersCount = Object.keys(localStorage).filter((key) =>
      key.startsWith('user_'),
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
      // Teacher specific logic kept exactly as you had it
      specialization:
        this.selectedRole === 'teacher' ? this.specialization : '',
      experience: this.selectedRole === 'teacher' ? this.experience : '',
      nationalId: this.selectedRole === 'teacher' ? this.nationalId : '',
      country: this.selectedRole === 'teacher' ? this.country : '',
      profilePicture: this.profilePicture,
      agreeToPolicy: this.agreeToPolicy,
    };

    //  catch the error if it fails
    try {
      localStorage.setItem(`user_${newId}`, JSON.stringify(userData));
      this.showSuccessMessage = true;

      this.successTimeout = setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);

      signupForm.reset();
      this.profilePicture = '';
      this.selectedRole = 'student';
    } catch (e: any) {
      // This runs if localStorage is full (QuotaExceededError)
      if (e.name === 'QuotaExceededError' || e.code === 22) {
        this.storageError = true;
      } else {
        console.error(e);
      }
    }
  }

  // Clean up timeout when component is destroyed
  ngOnDestroy() {
    if (this.successTimeout) {
      clearTimeout(this.successTimeout);
    }
  }
}
