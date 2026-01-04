
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InstructorsServiceService } from '../Instructors-serv/instructors-service.service';
import { OnInit } from '@angular/core';

@Component({
    selector: 'app-instructors',
    imports: [FormsModule],
    templateUrl: './instructors.component.html',
    styleUrl: './instructors.component.css'
})
export class InstructorsComponent implements OnInit {
  experts: Expert[] = [];
  constructor(private instructorsService: InstructorsServiceService) {}
  ngOnInit(): void {
    this.experts = this.instructorsService.getExperts();
  }

  // وظيفة لجلب المدرسين من localStorage
  getInstructorsFromLocalStorage() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('user_')) {
        const userData = JSON.parse(localStorage.getItem(key)!);
        // التحقق إذا كان المستخدم هو مدرس
        if (userData.role === 'teacher') {
          this.experts.push({
            name: `${userData.firstName} ${userData.lastName}`,
            role: userData.specialization || 'Teacher', // استخدام التخصص إذا كان متاحًا
            image: userData.profilePicture || 'default-image-path.jpg', // إذا لم يتم رفع صورة، استخدم صورة افتراضية
          });
        }
      }
    }
  }
}

export interface Expert {
  name: string;
  role: string;
  image: string;
}

export const experts: Expert[] = [
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
    name: 'Moustafa Makram',
    role: 'Graphic Designer Instractour',
    image: 'Images/Inst_img/Moustafa_M.jpeg',
  },
  {
    name: 'Mohammed Issa ',
    role: 'Coding Instractour',
    image: 'Images/Inst_img/Mohammed_Issa.jpeg',
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
    name: 'Moustafa Makram',
    role: 'Graphic Designer Instractour',
    image: 'Images/Inst_img/Moustafa_M.jpeg',
  },
];
