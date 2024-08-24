import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export type Role = 'INTERN' | 'ENGINEER' | 'ADMIN';

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Leanne Graham',
      email: 'Sincere@april.biz',
      role: 'INTERN',
    },
    {
      id: 2,
      name: 'Ervin Howell',
      email: 'Shanna@melissa.tv',
      role: 'INTERN',
    },
    {
      id: 3,
      name: 'Clementine Bauch',
      email: 'Nathan@yasenia.net',
      role: 'ENGINEER',
    },
    {
      id: 4,
      name: 'Patricia Lebsack',
      email: 'Julianne.OConner@kory.org',
      role: 'ENGINEER',
    },
    {
      id: 5,
      name: 'Chelsey Dietrich',
      email: 'Lucio_Hettinger@annie.ca',
      role: 'ADMIN',
    },
  ];

  findAll(role?: Role) {
    if (role) {
      const usersByRole = this.users.filter((user) => user.role === role);
      if (usersByRole.length === 0)
        throw new NotFoundException('No Users Found');
      return usersByRole;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException('User Not Found');
    return user;
  }

  create(user: CreateUserDto) {
    // Sort does not return a copy instead it modifies original array
    // Because of that we did array destructuring
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser: User = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  // Partial makes all properties optional
  // Update is PATCH method and all properties are optional
  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
