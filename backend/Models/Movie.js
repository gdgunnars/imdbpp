export class Movie {
  constructor(
    id,
    title,
    genres,
    language,
    description,
    releaseDate,
    poster,
    backdrop,
    trailer,
    score
  ) {
    this.id = id;
    this.title = title;
    this.genres = genres;
    this.language = language;
    this.description = description;
    this.releaseDate = releaseDate;
    this.poster = poster;
    this.backdrop = backdrop;
    this.trailer = trailer;
    this.score = score;
  }
}
