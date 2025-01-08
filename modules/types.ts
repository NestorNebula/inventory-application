interface Author {
  id: number;
  name: string;
}

interface Genre {
  id: number;
  genre: string;
  image?: string;
  book_id?: number;
}

interface Book {
  id: number;
  title: string;
  pages: number;
  plot?: string;
  author_id?: number;
  genre_id?: number;
}

export type { Author, Genre, Book };
