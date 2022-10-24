import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindCondition, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { encodePassword } from '../bcrypt/bcrypt';
import { userInfo } from 'os';
import { UserModule } from './user.module';
import { SerializedUser } from './user.types'; 
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUserById(id: number) {
    return this.repository.findOne(id);
  }

  public getUserByLogin(name: string): Promise <User> {
    return this.repository.findOne(name);
  }

  public createUser(body: CreateUserDto) {
    const user: User = new User();
    const hash_pwd = encodePassword(body.password);
    user.name = body.name;
    user.email = body.email;
    user.password = hash_pwd;
    user.numberOfVictories = 0;
    user.numberOfDefeats = 0;
    user.VictoriesInARow = 0;
    user.matchHistory = [];
    return this.repository.save(user);
  }

  public deleteUserById(id: number) {
    return this.repository.delete(id);
  }

  public getAll() {
    return this.repository.createQueryBuilder("user")
    .select(['user.name', 'user.email'])
    .orderBy('user.name', 'ASC')
    .getMany();
  }

  public deleteAll() {
    return this.repository.clear();
  }
}
