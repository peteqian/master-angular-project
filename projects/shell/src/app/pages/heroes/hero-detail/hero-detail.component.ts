import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '@shared/models/hero/hero';

@Component({
  selector: 'hero-detail',
  template: `
    <ng-container *ngIf="hero">
      <h1>Hero Details Component</h1>
      <div>Hero Id: {{ hero.id }}</div>
      <div>
        <label for="hero-name">Hero name: </label>
        <input id="hero-name" [(ngModel)]="hero.name" placeholder="Hero name" />
      </div>
      <button type="button" (click)="save()">Save Hero</button>
    </ng-container>
  `,
  styles: [
    `
      label {
        color: #435960;
        font-weight: bold;
      }
      input {
        font-size: 1em;
        padding: 0.5rem;
      }
      button {
        margin-top: 20px;
        margin-right: 0.5rem;
        background-color: #eee;
        padding: 1rem;
        border-radius: 4px;
        font-size: 1rem;
      }
      button:hover {
        background-color: #cfd8dc;
      }
      button:disabled {
        background-color: #eee;
        color: #ccc;
        cursor: auto;
      }
    `,
  ],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  @Output() newHeroDetails = new EventEmitter<Hero>();

  save() {
    if (this.hero) {
      this.newHeroDetails.emit(this.hero);
    }
  }
}
