import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss'],
})
export class GenericErrorComponent implements OnInit {
  public title: string = '';
  public text: string = '';
  showNavigation: boolean = true;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);

  ngOnInit() {
    this.route.data.subscribe((data) => {
      this.title = data['title'];
      this.text = data['text'];
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
