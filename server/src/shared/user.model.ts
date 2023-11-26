import { compare, hash } from 'bcrypt';
import { signFunc } from 'config/jsonwebtoken';
import { BeforeSave, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  fullName: string;

  @Column
  email: string;

  @Column
  password: string;

  @BeforeSave
  static async beforeSaveHook(user: User) {
    if (
      (user.isNewRecord || user.changed('password')) &&
      !!user.get('password')
    ) {
      const hashedPassword = await hash(user.getDataValue('password'), 10);
      user.setDataValue('password', hashedPassword);
    }
  }

  static associate(models: any) {
    console.log(models);
  }

  static async login({ email, password }) {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) throw 0;
    const result = await compare(password, user.get('password'));
    if (!result) throw 0;

    const info = user.get();
    delete info.password;

    const token = await signFunc(info);
    return { info, token };
  }

  async generateToken() {
    const info = this.get();
    delete info.password;
    const token = await signFunc(this);
    return { info, token };
  }
}
