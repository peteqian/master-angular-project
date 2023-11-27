import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Film } from '@shared/models/film/film.model';
import { Post } from '@shared/models/post/post';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FilmService {
  results: any;

  constructor(private http: HttpClient) {}

  getFilms() {
    return this.http.get<Post>('https://swapi.dev/api/films/');
  }

  convertResults(): Observable<Film[]> {
    return this.getFilms().pipe(
      map((data: Post) => {
        let films: Film[] = [];

        data.results.map((film: any) => {
          const newFilm = new Film(
            film.title,
            film.episode_id,
            film.director,
            film.producer,
            film.release_date
          );
          films.push(newFilm);
        });

        return films;
      })
    );
  }
}
