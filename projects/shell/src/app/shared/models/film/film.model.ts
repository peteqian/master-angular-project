export class Film {
  title: string;
  episode_id: number;
  director: string;
  producer: string;
  release_date: string;
  constructor(
    title: string,
    episode_id: number,
    director: string,
    producer: string,
    release_date: string
  ) {
    this.title = title;
    this.episode_id = episode_id;
    this.director = director;
    this.producer = producer;
    this.release_date = release_date;
  }
}
