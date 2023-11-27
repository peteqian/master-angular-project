import { Component, Input, OnInit } from '@angular/core';
import { Film } from '@shared/models';

@Component({
  selector: 'app-film-item',
  templateUrl: './film-item.component.html',
  styleUrls: ['./film-item.component.scss'],
})
export class FilmItemComponent implements OnInit {
  @Input() film: Film;
  @Input() index: number;

  ngOnInit(): void {}
}
