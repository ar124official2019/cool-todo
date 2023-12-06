import { hash } from 'bcrypt';
import { BeforeSave, Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column
  fullName: string;

  @Column
  email: string;

  @Column
  password: string;

  @Column
  profilePicture: string;

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
}
