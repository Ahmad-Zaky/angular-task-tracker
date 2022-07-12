import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../../models/Task';
import { UiService } from '../../services/ui/ui.service';
import { TaskService } from '../../services/task/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[]  = [];
  editedTask: Task;
  
  constructor(private taskService: TaskService, private uiService: UiService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  editTask(task: Task) {
    this.uiService.openAddTask();
    this.taskService.setUpdatedTask(task);
  }

  updateTask(task: Task) {
    this.tasks.map( (t, i) => {
      if (t.id === task.id) this.tasks[i] = task;
    });
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(task: Task) {
    this.taskService
    .onUpdate()
    .subscribe(value => {
      if (this.taskService.isTask(value)) {
        this.editedTask = value
      }
    });
    if (this.editedTask?.id === task.id)
      this.taskService.setUpdatedTask(this.taskService.emptyTask());
    
    this.taskService.deleteTask(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id !== task.id));
  }

  toggleTaskReminder(task: Task) {
    task.reminder = ! task.reminder; 
    this.taskService.updateTask(task).subscribe();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
