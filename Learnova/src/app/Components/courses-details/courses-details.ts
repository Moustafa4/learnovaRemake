import {
  Component,
  effect,
  ElementRef,
  HostListener,
  inject,
  ViewChild,
} from '@angular/core';
import { CoursesService } from '../../../services/courses_ser/courses.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ICourses } from '../courses/icourses';
import { filter, map, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../../services/cartser/cart.service';

@Component({
  selector: 'app-courses-details',
  standalone: true,

  imports: [CommonModule],
  templateUrl: './courses-details.html',
  styleUrl: './courses-details.css',
})
export class CoursesDetails {
  private courses_servis = inject(CoursesService);
  private cart = inject(CartService);
  private route = inject(ActivatedRoute);
  courses = toSignal<ICourses | null>(
    this.route.paramMap.pipe(
      map((params) => params.get('title')),
      filter((title): title is string => title !== null),
      switchMap((title) => this.courses_servis.CoursesByTitle(title)),
      map((course) => course ?? null),
    ),
  );
  @ViewChild('Textcon') Textcon!: ElementRef<HTMLDivElement>;
  @ViewChild('atext') atext!: ElementRef<HTMLAnchorElement>;

  isExpanded = false;
  addtocart(course: ICourses) {
    this.cart.addToCart(course);
  }
  ngAfterViewInit() {
    this.applyResponsiveStyles(); // يتنفذ أول ما العناصر تبقى جاهزة في الـ DOM [web:22]
  }

  @HostListener('window:resize')
  onResize() {
    this.applyResponsiveStyles(); // كل ما العرض يتغير
  }

  toggleRead(event: Event) {
    event.preventDefault();
    this.isExpanded = !this.isExpanded;
    this.applyResponsiveStyles();
  }

  private applyResponsiveStyles() {
    const width = window.innerWidth;

    if (!this.Textcon?.nativeElement || !this.atext?.nativeElement) return;

    if (width <= 991) {
      this.atext.nativeElement.style.display = 'inline-block';
      if (this.isExpanded) {
        this.Textcon.nativeElement.style.overflow = 'visible';
        this.Textcon.nativeElement.style.height = 'fit-content';
      } else {
        this.Textcon.nativeElement.style.overflow = 'hidden';
        this.Textcon.nativeElement.style.height = '60px';
      }
    } else {
      this.atext.nativeElement.style.display = 'none';
      this.Textcon.nativeElement.style.overflow = 'visible';
      this.Textcon.nativeElement.style.height = 'fit-content';
    }
  }
}
