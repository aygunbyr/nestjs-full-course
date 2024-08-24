import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import type { Role, User } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or users?role=value
  findAll(@Query('role') role?: Role): User[] {
    if (role) {
      return this.usersService.findAll(role);
    }
    return this.usersService.findAll();
  }

  @Get(':id') // GET /users/:id
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(Number(id));
  }

  @Post() // POST /users
  create(@Body() user: Omit<User, 'id'>) {
    return this.usersService.create(user);
  }

  @Patch(':id') // PATCH /users/:id
  update(
    @Param('id') id: string,
    @Body() userUpdate: Partial<Omit<User, 'id'>>,
  ) {
    return this.usersService.update(Number(id), userUpdate);
  }

  @Delete(':id') // DELETE /users/:id
  delete(@Param('id') id: string) {
    return this.usersService.delete(Number(id));
  }
}
