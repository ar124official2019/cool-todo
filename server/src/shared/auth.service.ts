import { InjectModel } from '@nestjs/sequelize';
import { compare } from 'bcrypt';
import { User } from 'src/shared/user.model';

export class AuthService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async createUser(info: any) {
    const user = await this.userModel.findOne({
      where: { email: info.email },
    });

    if (user) throw { exists: true };
    return this.userModel.create(info);
  }

  async findByEmail(email: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    return user || null;
  }

  async validateUser(email: string, password: string) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) return null;

    return (await compare(password, user.get('password'))) ? user : null;
  }
}
