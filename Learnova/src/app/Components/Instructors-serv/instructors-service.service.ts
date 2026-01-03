import { Injectable } from '@angular/core';
import { Expert } from '../instructors/instructors.component';

@Injectable({
  providedIn: 'root'
})
export class InstructorsServiceService {

  experts: Expert[] = [];

  constructor() {
    this.loadExperts();
  }

  private loadExperts() {
    this.experts = [
      {name: ' Mohamed El-Desoky',role: 'Coding Instractour',image: 'Images/Inst_img/d.jpeg',},
      {name: 'Osama Mohamed', role: 'Coding Instractour',image: 'Images/Inst_img/z.jpeg',},
      {name: 'Mohammed Issa ', role: 'Coding Instractour', image: 'Images/Inst_img/Mohammed_Issa.jpeg'},
      {name: 'Ahmed Nazmy', role: 'IT&Network Instractour',image: 'Images/Inst_img/Ahmed_N.jpeg'},
      { name: 'Mohamed El-Desoky', role: 'Coding Instructor', image: 'Images/Inst_img/d.jpeg' },
      { name: 'Osama Mohamed', role: 'Coding Instructor', image: 'Images/Inst_img/z.jpeg' },
      {
        name: ' Mohamed El-Desoky',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/d.jpeg',
      },
      {
        name: 'Osama Mohamed',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/z.jpeg',
      },
      {
        name: 'Mohammed Issa ',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/Mohammed_Issa.jpeg',
      },
      {
        name: 'Ahmed Nazmy',
        role: 'IT&Network Instractour',
        image: 'Images/Inst_img/Ahmed_N.jpeg',
      },
      {
        name: 'Moustafa Makram',
        role: 'Graphic Designer Instractour',
        image: 'Images/Inst_img/Moustafa_M.jpeg',
      },
      {
        name: ' Mohamed El-Desoky',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/d.jpeg',
      },
      {
        name: 'Osama Mohamed',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/z.jpeg',
      },
      {
        name: 'Mohammed Issa ',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/Mohammed_Issa.jpeg',
      },
      {
        name: 'Ahmed Nazmy',
        role: 'IT&Network Instractour',
        image: 'Images/Inst_img/Ahmed_N.jpeg',
      },
      {
        name: 'Moustafa Makram',
        role: 'Graphic Designer Instractour',
        image: 'Images/Inst_img/Moustafa_M.jpeg',
      },
      {
        name: ' Mohamed El-Desoky',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/d.jpeg',
      },
      {
        name: 'Osama Mohamed',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/z.jpeg',
      },
      {
        name: 'Mohammed Issa ',
        role: 'Coding Instractour',
        image: 'Images/Inst_img/Mohammed_Issa.jpeg',
      },
      {
        name: 'Ahmed Nazmy',
        role: 'IT&Network Instractour',
        image: 'Images/Inst_img/Ahmed_N.jpeg',
      },
      {
        name: 'Moustafa Makram',
        role: 'Graphic Designer Instractour',
        image: 'Images/Inst_img/Moustafa_M.jpeg',
      },

    ];
    this.loadInstructorsFromLocalStorage();
  }

  private loadInstructorsFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key)!);
        if (userData.role === 'teacher') {
          this.experts.push({
            name: `${userData.firstName} ${userData.lastName}`,
            role: userData.specialization || 'Teacher',
            image: userData.profilePicture || 'default-image-path.jpg',
          });
        }
      }
    }
  }

  getExperts() {
    return this.experts;
  }
}
