import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmItemComponent } from './film-item.component';
import { Component } from '@angular/core';
import { Film } from '@shared/models';

@Component({
  template: ` <app-film-item [film]="film" [index]="index"></app-film-item> `,
})
class TestHostComponent {
  film: Film;
  index: number;
}

describe('FilmItemComponent', () => {
  let testHost: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilmItemComponent, TestHostComponent],
    });

    fixture = TestBed.createComponent(TestHostComponent);
    testHost = fixture.componentInstance;
  });

  it('GIVEN - default set up - WHEN - instantiating - THEN - it should be created', () => {
    // ARRANGE
    // ACT
    // ASSERT
    expect(testHost).toBeTruthy();
  });

  it('GIVEN - host-app has an item - WHEN - rendering FilmItemComponent - THEN -  it should display film details', () => {
    // ARRANGE
    const film: Film = {
      title: 'Inception',
      episode_id: 1,
      director: 'Christopher Nolan',
    } as Film;
    const index = 1;

    testHost.film = film;
    testHost.index = index;

    // ACT
    fixture.detectChanges();
    const episodeId = fixture.nativeElement.querySelector(
      '[data-test="film.episode_id"]'
    );

    // ASSERT
    expect(episodeId.innerText).toBe(`Episode: ${film.episode_id}`);
  });
});
