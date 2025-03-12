export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
}

export interface BookDetail {
  title: string;
  by_statement?: string;
  description?: { value: string } | string;
  covers?: number[];
  publish_date?: string;
  authors?: { name: string }[];
}