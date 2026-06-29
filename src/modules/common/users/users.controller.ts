import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiParam } from '@nestjs/swagger';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:id')
  @ApiParam({ name: 'id', description: 'User identifier' })
  async findOne(@Param('id') id) {
    return await this.usersService.findById(parseInt(id));
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Post()
  async create(@Body() userData: any) {
    return await this.usersService.create(userData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.delete(+id);
  }
}