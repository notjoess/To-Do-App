import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Task } from "./task.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find({ order: { id: "ASC" } });
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(task: Partial<Task>): Promise<Task> {
    const t = this.tasksRepository.create(task as Task);
    return this.tasksRepository.save(t);
  }

  async update(id: number, task: Partial<Task>) {
    await this.tasksRepository.update(id, task);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.tasksRepository.delete(id);
  }
}
