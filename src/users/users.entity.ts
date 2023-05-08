import { BaseEntity } from "../common/abstract/entity.abstract";

export class UsersEntity extends BaseEntity {
  id: string;
  firstName: string;
  lastName: string;
  paid: boolean;
  phone: string;
}
