import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo } from './todo.model';
import { AuthGuard } from '@nestjs/passport';
import { AppResponse } from 'config/app';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() body: Todo, @Req() req) {
    return AppResponse.create(
      await this.todoService.create(body, req?.user?.get('id')),
    );
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(@Param('id') id, @Req() req, @Body() body: Todo) {
    return AppResponse.create(
      await this.todoService.update(id, req?.user?.get('id'), body),
    );
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('id') id, @Req() req) {
    return AppResponse.create(
      await this.todoService.delete(id, req?.user?.get('id')),
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getOne(@Param('id') id, @Req() req) {
    return AppResponse.create(
      await this.todoService.getOne(id, req?.user?.get('id')),
    );
  }

  @Get('')
  @UseGuards(AuthGuard('jwt'))
  async get(
    @Param('id') id,
    @Query() page: number,
    @Query() limit: number,
    @Req() req,
  ) {
    page = Number(req.query.page || 0);
    if (isNaN(page) || page < 1) page = 1;
    limit = Number(req.query.limit || 0);
    if (isNaN(limit) || limit < 1) limit = 10;
    const result = await this.todoService.get(
      req?.user?.get('id'),
      page,
      limit,
    );

    return AppResponse.create(result);
  }
}
