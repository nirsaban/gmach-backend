import { BaseRepository } from "../common/base/repository.base";
import { DBError } from "../common/errors/general.error";
import { UsersEntity } from "./users.entity";

export class UsersRepository extends BaseRepository<UsersEntity> {
  constructor() {
    super("users");
  }

  public async getUser(id: string): Promise<UsersEntity> {
    try {
      const userRef = this.db.doc(id);

      const user: UsersEntity = (await userRef.get()).data();

      return user;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async createUser(entity: UsersEntity): Promise<UsersEntity> {
    try {
      const result = this.db.doc(entity.id).set({ ...entity });
      return entity;
    } catch (error) {
      throw new DBError(error.message);
    }
  }

  public async getUsers(): Promise<UsersEntity[]> {
    try {
      const usersRef = await this.db.get();

      const usersList: UsersEntity[] = [];

      usersRef.docs.forEach(async (event) => {
        usersList.push(event.data() as UsersEntity);
      });

      return usersList;
    } catch (error) {
      throw new DBError(error.message);
    }
  }
}
