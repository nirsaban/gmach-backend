import { IsString, IsOptional, IsBoolean } from "class-validator";
import { UsersEntity } from "./users.entity";
import { BaseDto } from "../common/abstract/dto.abstract";
import { IsPhoneNumber } from "class-validator-multi-lang";

export class UserDto extends BaseDto<UserDto, UsersEntity> {
  public id: string;

  @IsOptional()
  @IsString()
  public firstName: string;

  @IsOptional()
  @IsString()
  public lastName: string;

  @IsOptional()
  @IsPhoneNumber("IL")
  public phone: string;

  @IsBoolean()
  paid: boolean = false;
  constructor(user: UserDto) {
    super();
    console.log(user);
    this.id = user.phone;
    this.phone = user.phone;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.paid = user.paid || false;
  }
}
