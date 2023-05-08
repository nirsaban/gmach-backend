import express, { NextFunction, Router, Request } from "express";
import { UsersController } from "./users.controller";
import { BaseAbstractRoute } from "../common/abstract/route.absrtact";

export class UsersRouter extends BaseAbstractRoute {
  public controller: UsersController;
  constructor() {
    super();
    this.controller = new UsersController();
  }

  public initRouter() {
    this.router.post(
      `/`,
      (req: Request, res: express.Response, next: NextFunction) => {
        this.controller.createUser(req, res, next);
      }
    );
    this.router.post(
      `/multiple`,
      (req: Request, res: express.Response, next: NextFunction) => {
        this.controller.createUsers(req, res, next);
      }
    );

    this.router.post(
      `/sendsms`,
      (req: Request, res: express.Response, next: NextFunction) => {
        this.controller.sendSms(req, res, next);
      }
    );
    this.router.get(
      `/`,
      (req: Request, res: express.Response, next: NextFunction) => {
        this.controller.getUsers(req, res, next);
      }
    );

    // this.router.get(
    //   `/:id`,
    //   (req: Request, res: express.Response, next: NextFunction) => {
    //     this.controller.getUser(req, res, next);
    //   }
    // );

    // this.router.put(
    //   ``,
    //   (req: Request, res: express.Response, next: NextFunction) => {
    //     this.controller.updateUser(req, res, next);
    //   }
    // );

    return this.router;
  }
}
