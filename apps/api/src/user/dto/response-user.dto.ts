import ResponseMessage from "@src/common/dto/response-message.dto";
import { User } from "../entities/user.entity";

export class ResponseUser extends ResponseMessage {
  id: string;
  nickname: string;
  email: string;

  private constructor(id: string, nickname: string, email: string, message?: string) {
    super(message ?? null);
    this.id = id;
    this.nickname = nickname;
    this.email = email;
  }

  static from(user: User, message?: string) {
    return new ResponseUser(user.id, user.nickname, user.email, message);
  }
}
