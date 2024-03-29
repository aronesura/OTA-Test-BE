import { Router } from 'express';

export interface RouteInterface {
  path: string;
  router: Router;
}

export interface RouteConstructorInterface {
  path: string;
}
