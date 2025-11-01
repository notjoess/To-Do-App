import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  create(@Body() task: Partial<Task>) {
    return this.tasksService.create(task);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() task: Partial<Task>) {
    return this.tasksService.update(Number(id), task);
  }

  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.tasksService.delete(Number(id));
  }
}
