import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header2',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './header2.component.html',
  styleUrl: './header2.component.css'
})
export class Header2Component {

}
