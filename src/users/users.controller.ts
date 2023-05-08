import { NotFound } from "../common/errors/general.error";
import { UserFlow } from "../common/interfaces/userflow";
import { UserDto } from "./users.dto";
import { UsersEntity } from "./users.entity";
import { UsersService } from "./users.service";
import express, { Request, NextFunction } from "express";
export class UsersController {
  private usersService: UsersService;
  constructor() {
    this.usersService = new UsersService();
  }

  public async createUser(
    req: Request,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user: UserDto = new UserDto({ ...req.body });

      await user.validate(user);

      let userCreated: UserDto = await this.usersService.createUser(user);

      res.send(userCreated);
    } catch (error) {
      next(error);
    }
  }

  public async createUsers(
    req: Request,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users: UserDto[] = req.body.users.map(
        (user) => new UserDto({ ...user })
      );
      for (const user of users) {
        await user.validate(user);
      }

      const usersCreated = [] as UserDto[];
      for (const user of users) {
        const userCreated = await this.usersService.createUser(user);

        usersCreated.push(userCreated);
      }

      res.send(usersCreated);
    } catch (error) {
      next(error);
    }
  }

  public async sendSms(
    req: Request,
    res: express.Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const ids: string[] = req.body.phones.map((phone) => phone.id);

      await this.usersService.sendSms(ids);

      res.status(200).send();
    } catch (error) {
      next(error);
    }
  }
  public async getUsers(
    req: Request,
    res: express.Response,
    next: NextFunction
  ): Promise<any> {
    try {
      const users: UserDto[] = await this.usersService.getUsers();
      res.send(users);
    } catch (error) {
      next(error);
    }
  }
  // public async getUser(
  //   req: Request,
  //   res: express.Response,
  //   next: NextFunction
  // ): Promise<any> {
  //   try {
  //     const authUser: UserDto = req.user;
  //     const { id } = req.params;

  //     if (authUser.id === id) {
  //       return res.send(authUser);
  //     }
  //     throw new NotFound(
  //       "The user not found in our database please login again"
  //     );
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // public async updateUser(
  //   req: Request,
  //   res: express.Response,
  //   next: NextFunction
  // ): Promise<void> {
  //   try {
  //     const userUpdates: UserDto = new UserDto(req.body);

  //     userUpdates.id = req.user.id;

  //     await userUpdates.validateUpdate(userUpdates);

  //     const userUpdated: UserDto = await this.usersService.updateUser(
  //       userUpdates
  //     );

  //     const user = req.user;

  //     for (let field in userUpdates) {
  //       user[field] = userUpdates[field] || user[field];
  //     }

  //     res.send(user);
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}
