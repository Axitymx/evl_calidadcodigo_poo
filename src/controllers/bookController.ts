import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService: BookService;
  constructor() {
    this.bookService = new BookService();
  }
  getAll = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };
  create = async (req: Request, res: Response) => {
    try {
      const { id, name, year } = req.body;
      const newBook = new Book(id, name, year);
      console.log(newBook);
      const bookSaved = await this.bookService.save(newBook);
      res.status(201).json(bookSaved);
    } catch (error) {
      console.log(":X", error);
      res.status(500).json({ error: "Error fetching books" });
    }
  };
}
