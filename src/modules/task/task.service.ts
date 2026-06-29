import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const newId = uuidv4();
    const newTaskData = { ...createTaskDto, ID: newId };
    const newTask = this.taskRepository.create(newTaskData);

    return await this.taskRepository.save(newTask);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne(id as any);
    if (!task) {
      throw new NotFoundException(`Задача с ID ${id} не найдена.`);
    }
    return task;
  }


  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task | null> {

    const result = await this.taskRepository.update(id, updateTaskDto);

    if (!result) {
      throw new NotFoundException(`Задача с ID ${id} не найдена.`);
    }

    return this.taskRepository.findOne({ where: { ID: id } });
  }

  async remove(id: string): Promise<void> {
    const affected = await this.taskRepository.delete(id);
    if (!affected) {
      throw new NotFoundException(`Задача с ID ${id} не найдена.`);
    }
  }
    
}
