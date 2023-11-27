import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public title: string = '';

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.title = data['title'];
    });
  }
}
