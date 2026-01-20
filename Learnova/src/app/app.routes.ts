import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { InstructorsComponent } from './Components/instructors/instructors.component';
import { ArLanguageComponent } from './Components/ar-language/ar-language.component';
import { CartComponent } from './Components/cart/cart.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { InstDAshBoardComponent } from './Components/inst-dash-board/inst-dash-board.component';
import { ContactComponent } from './Components/contact/contact.component';
import { MainPaymentComponent } from './Components/main-payment/main-payment.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CoursePaymentComponent } from './Components/course-payment/course-payment.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { StudentDashboardComponent } from './Components/student-dashboard/student-dashboard.component';
import { CoursesDetails } from './Components/courses-details/courses-details';
import { authGGuard } from './Gaurds/auth-g-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'Details/:title', component: CoursesDetails },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'instructors', component: InstructorsComponent },
  {
    path: 'course-payment',
    component: CoursePaymentComponent,
    canActivate: [authGGuard],
  },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'cart', component: CartComponent},
  { path: 'ar', component: ArLanguageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'main-payment', component: MainPaymentComponent },
  {
    path: 'InstDAshBoard',
    component: InstDAshBoardComponent,
    canActivate: [authGGuard],
  },
  {
    path: 'StudentDashboard',
    component: StudentDashboardComponent,
    canActivate: [authGGuard],
  },
  { path: 'Privacy', component: PrivacyComponent },
  { path: '**', component: ErrorComponent },
];
