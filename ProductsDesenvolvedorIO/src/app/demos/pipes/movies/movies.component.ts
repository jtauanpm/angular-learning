import { Component } from '@angular/core';
import { Movie } from '../../../interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { FileSizePipe } from '../../../pipes/file-size.pipe';

@Component({
  selector: "app-movies",
  imports: [CommonModule, FileSizePipe],
  templateUrl: "./movies.component.html",
  styleUrl: "./movies.component.css",
})
export class MoviesComponent {
  movies!: Movie[];
  // mapped: Filme[];

  constructor() {}

  ngOnInit() {
    this.movies = [
      {
        name: "Um Sonho de Liberdade",
        releaseDate: new Date("12/07/1994"),
        value: 150.0,
        image: "sonhoLiberdade.jpg",
        size: "513326980",
      },
      {
        name: "O Poderoso Chefão",
        releaseDate: new Date("01/12/1972"),
        value: 200.0,
        image: "poderosoChefaoI.jpg",
        size: "1342177280",
      },
      {
        name: "Batman: O Cavaleiro das Trevas ",
        releaseDate: new Date("08/01/2008"),
        value: 70.0,
        image: "Batman2008.jpg",
        size: "719974720",
      },
      {
        name: "o poderoso chefão 2",
        releaseDate: new Date("01/12/1974"),
        value: 120.0,
        image: "poderosoChefaoII.jpg",
        size: "1254589899",
      },
      {
        name: "Pulp Fiction: Tempo de Violência ",
        releaseDate: new Date("01/08/1994"),
        value: 190.0,
        image: "PulpFiction.jpg",
        size: "773039680",
      },
    ];

    // this.mapped = this.filmes.map((filme) => {
    //   return {
    //     name: filme.name,
    //     releaseDate: filme.releaseDate,
    //     value: filme.value,
    //     size: filme.size,
    //     image: this.imageFormat.transform(filme.image, "default", true),
    //   };
    // });
  }
}
