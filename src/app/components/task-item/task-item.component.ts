import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Task } from "../../models/Task";
import { faTimes, faEdit } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css']
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() onEditTask: EventEmitter<Task> = new EventEmitter;
  @Output() onDeleteTask: EventEmitter<Task> = new EventEmitter;
  @Output() onToggleTask: EventEmitter<Task> = new EventEmitter;
  
  faTimes = faTimes;
  faEdit = faEdit;

  constructor() { }

  ngOnInit(): void {
  }

  onEdit(task: Task) {
    this.onEditTask.emit(task)
  }

  onDelete(task: Task) {
    this.onDeleteTask.emit(task)
  }

  
  onToggle(task: Task) {
    this.onToggleTask.emit(task)
  }
}
