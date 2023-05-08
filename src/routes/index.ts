import { BaseAbstractRoute } from "../common/abstract/route.absrtact";
import { UsersRouter } from "../users/users.router";
import { Router, NextFunction } from "express";
export class RouterApi extends BaseAbstractRoute {
  controller: any;

  constructor() {
    super();
  }

  public initRouter(): Router {
    this.init("users", new UsersRouter());

    //return response  404
    this.router.all("*", function (req, res) {
      return res.status(404).json({
        status: "error",
        message: "Not Found",
      });
    });

    return this.router;
  }
}
