import pool from "../database/database";
import { Book } from "../models/book";

export class BookService {
  async getAllBooks(): Promise<Book[]> {
    try {
      const result = await pool.query('SELECT * FROM public."Libro"');
      return result.rows.map(
        (row) => new Book(row.id, row.nombre, row.anioPublicacion)
      );
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async save(book: Book): Promise<Book> {
    const result = await pool.query(
      'INSERT INTO public."Libro" (id, nombre, aniopublicacion) VALUES ($1, $2, $3) RETURNING *',
      [book.id, book.name, book.year]
    );
    return new Book(
      result.rows[0].id,
      result.rows[0].nombre,
      result.rows[0].aniopublicacion
    );
  }
}
