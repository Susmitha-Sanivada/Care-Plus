import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onClick() {
    this.router.navigate(['login'], { relativeTo: this.route });
  }
}
