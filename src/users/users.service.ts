import { HttpStatus } from "../common/enums/errorCode.enum";
import { BadRequest, DBError } from "../common/errors/general.error";
import { MessageService } from "../services/messageService";
import { UserDto } from "./users.dto";
import { UsersEntity } from "./users.entity";
import { UsersRepository } from "./users.repository";

export class UsersService {
  usersRepository: UsersRepository;
  smsService: MessageService;
  constructor() {
    this.usersRepository = new UsersRepository();
    this.smsService = new MessageService();
  }

  // // Update User by Id
  // public async updateUser(userDto: UserDto): Promise<UserDto> {
  //   try {
  //     const userEntity: UsersEntity = userDto.toEntity();

  //     await this.usersRepository.updateUser(userEntity, userEntity.id);

  //     return userDto.fromEntity();
  //   } catch (error) {
  //     throw new DBError(error);
  //   }
  // }

  public async sendSms(ids: string[]): Promise<void> {
    try {
      const users = [] as UsersEntity[];

      for (const id of ids) {
        users.push(await this.usersRepository.getUser(id));
      }

      for (const user of users) {
        await this.smsService.send(
          user.phone,
          `היי ${user.firstName} טרם שילמת לגמ״ח השבועי ״נחלת דוד״  לינק לתשלום https://meshulam.co.il/quick_payment?b=adbcef2e7646816880169e728d7214d3`
        );
      }
    } catch (error) {
      throw new DBError(error);
    }
  }

  public async createUser(userDto: UserDto): Promise<UserDto> {
    try {
      const userEntity: UsersEntity = userDto.toEntity();

      const result = await this.usersRepository.createUser(userEntity);

      return { ...result } as UserDto;
    } catch (error) {
      // handle tuya error
      if (error.status == HttpStatus.BAD_REQUEST) {
        throw new BadRequest(error.message);
      } else {
        throw new DBError(error);
      }
    }
  }

  public async getUsers(): Promise<UserDto[]> {
    try {
      const users: UsersEntity[] = await this.usersRepository.getUsers();
      return users as UserDto[];
    } catch (err) {
      throw new DBError(err);
    }
  }
}
