import { Router } from "express";
import { BookController } from "../controllers/bookController";

const router = Router();
const bookController = new BookController();

router.get("/book", bookController.getAll);
router.post("/book", bookController.create);

export default router;
