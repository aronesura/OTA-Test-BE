import { Router } from 'express';
import { RouteConstructorInterface } from '../interfaces/route.interface';
import NoteController from '../controllers/note.controller';

class NoteRoute {
  public path: string;
  public router = Router();
  private noteController;

  constructor({ path }: RouteConstructorInterface) {
    this.noteController = new NoteController();
    this.path = path;
    this.initRoutes();
  }

  private initRoutes(): void {
    this.router.post('/', this.noteController.create);
    this.router.get('/', this.noteController.findAll);
    this.router.get('/:id', this.noteController.findOneById);
    this.router.put('/:id', this.noteController.updateOne);
    this.router.delete('/:id', this.noteController.deleteOneById);
  }
}

export default NoteRoute;
