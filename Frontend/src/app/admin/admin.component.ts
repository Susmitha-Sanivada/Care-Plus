import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export class AdminComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}
  onClickEmployees() {
    this.router.navigate(['employees'], { relativeTo: this.route });
  }
  onClickCreate() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }
  onClickDetails() {
    this.router.navigate(['details'], { relativeTo: this.route });
  }
  onClickStatistics() {
    this.router.navigate(['statistics'], { relativeTo: this.route });
  }
  onClickProfile() {
    this.router.navigate(['home']);
  }
}
