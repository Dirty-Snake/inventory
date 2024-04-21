import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindOptionsSelect, Repository } from 'typeorm';
import e from 'express';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, email, password } = createUserDto;
    const user = new User();
    const hashPassword = await this.hashPassword(password);
    user.password = hashPassword;
    user.username = username;
    user.email = email;
    return await this.userRepository.save(user);
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async comparePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string, password?: boolean): Promise<User> {
    const select: FindOptionsSelect<User> = {};
    if (password) {
      select.username = true;
      select.email = true;
      select.password = true;
    }
    return await this.userRepository.findOne({
      select: select,
      where: {
        id: id,
      },
    });
  }

  async findUser(username: string) {
    return await this.userRepository.findOne({
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
      where: {
        username: username,
      },
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
