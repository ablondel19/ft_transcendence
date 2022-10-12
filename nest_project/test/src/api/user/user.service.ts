import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { encodePassword } from '../bcrypt/bcrypt';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  public getUserById(id: number): Promise<User> {
    return this.repository.findOne(id);
  }

  public getUserByLogin(name: string): Promise <User> {
    return this.repository.findOne(name);
  }

  public createUser(body: CreateUserDto): Promise<User> {
    const user: User = new User();
    const hash_pwd = encodePassword(body.password);
    user.name = body.name;
    user.email = body.email;
    user.password = hash_pwd;
    user.numberOfVictories = 0;
    user.numberOfDefeats = 0;
    user.VictoriesInARow = 0;
    user.matchHistory = 
    //TEST--
    [{
        "opponent": "OpponentX",
        "level": "map1",
        "personnalScore" : 10,
        "opponentScore" : 0
      },
      {
        "opponent": "OpponentY",
        "level": "map2",
        "personnalScore" : 8,
        "opponentScore" : 10
      }
    ];
    // Search for canvas usage
    // leaderboard always visible
    // login system with valdation decorators for login and password 
    ////////////////////////////////////////// Export function for validation errors
    //validate(user).then(errors => {
    //  // ...
    //}); // it will return errors for email, title and text properties
    return this.repository.save(user);
  }

  public deleteUserById(id: number) {
    return this.repository.delete(id);
  }

  public getAll() {
    return this.repository.find();
  }

  public deleteAll() {
    return this.repository.clear();
  }
}
