export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: string;
}
export interface BookDetail {
  title: string;
  covers?: number[];
  authors?: { key: string; name: string }[];
  description?: { value: string } | string;
}

export interface Author {
  name: string;
  bio?: { value: string } | string;
  key: string;
}