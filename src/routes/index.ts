import { Application } from 'express';
import { RouteInterface } from '../interfaces/route.interface';
import NoteRoute from './note.route';

class Routes {
  private app;
  private routers: RouteInterface[];
  constructor(app: Application) {
    this.app = app;
    this.routers = [];
    this.initRouters();
    this.combineRouters();
  }

  private initRouters() {
    this.routers.push(new NoteRoute({ path: 'notes' }));
  }

  public combineRouters(): void {
    this.routers.forEach((router) => this.app.use(`/api/${router.path}`, router.router));
  }
}

export default Routes;
