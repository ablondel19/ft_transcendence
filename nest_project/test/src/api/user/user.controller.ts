import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Delete, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { SerializedUser } from './user.types';

@Controller('user')
export class UserController {

  constructor(@Inject('USER_SERVICE') 
  private readonly service: UserService) {}
  

  @Get(':id')
  public getUser(@Param('id', ParseIntPipe) id: number) {
    return this.service.getUserById(id);
  }

  @Get(':name')
  public getUserByLogin(name: string): Promise <User|undefined> {
    console.log('hey');
    return this.service.getUserByLogin(name);
  }

  @Post()
  @UsePipes(new ValidationPipe()) 
  public createUser(@Body() body: CreateUserDto) {
    return this.service.createUser(body);
  }

  @Delete(':id')
  public deleteUser(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.service.deleteUserById(id);
  }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public getAll() {
    return this.service.getAll();
  }

  @Delete()
  public deleteAll() {
    return this.service.deleteAll();
  }
}
