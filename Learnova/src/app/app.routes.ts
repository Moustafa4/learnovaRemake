import { Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ErrorComponent } from './Components/error/error.component';
import { CoursesComponent } from './Components/courses/courses.component';
import { InstructorsComponent } from './Components/instructors/instructors.component';
import { LoginComponent } from './Components/login/login.component';
import { NotificationsComponent } from './Components/notifications/notifications.component';
import { ArLanguageComponent } from './Components/ar-language/ar-language.component';
import { CartComponent } from './Components/cart/cart.component';
import { CodingComponent } from './Components/courses/coding/coding.component';
import { UxUiComponent } from './Components/courses/ux-ui/ux-ui.component';
import { NetworkComponent } from './Components/courses/network/network.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { InstDAshBoardComponent } from './Components/inst-dash-board/inst-dash-board.component';
import { ContactComponent } from './Components/contact/contact.component';
import { MainPaymentComponent } from './Components/main-payment/main-payment.component';
import { SignUpComponent } from './Components/sign-up/sign-up.component';
import { SignInComponent } from './Components/sign-in/sign-in.component';
import { CoursePaymentComponent } from './Components/course-payment/course-payment.component';
import { PrivacyComponent } from './Components/privacy/privacy.component';
import { StudentDashboardComponent } from './Components/student-dashboard/student-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'Coding', pathMatch: 'full' }, // Redirect to Coding by default under 'home'
      { path: 'Coding', component: CodingComponent },
      { path: 'UxUi', component: UxUiComponent },
      { path: 'Network', component: NetworkComponent },
    ],
  },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'Coding', component: CodingComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'Network', component: NetworkComponent },
  { path: 'UxUi', component: UxUiComponent },
  { path: 'instructors', component: InstructorsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'course-payment', component: CoursePaymentComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'cart', component: CartComponent },
  { path: 'ar', component: ArLanguageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'main-payment', component: MainPaymentComponent },
  { path: 'InstDAshBoard', component: InstDAshBoardComponent },
  {path:'StudentDashboard',component:StudentDashboardComponent},
  { path: 'Privacy', component: PrivacyComponent },
  { path: '**', component: ErrorComponent },
];

