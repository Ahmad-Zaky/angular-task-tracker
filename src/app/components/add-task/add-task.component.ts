import { Component, OnInit, EventEmitter, Output} from '@angular/core';
import { Task } from "../../models/Task";
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui/ui.service';
import { TaskService } from '../../services/task/task.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})

export class AddTaskComponent implements OnInit {
  
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter;
  @Output() onUpdateTask: EventEmitter<Task> = new EventEmitter;
  
  data: Task = {
    id: 0,
    text: '',
    day: '',
    reminder: false
  };
  
  submitted: boolean = false;
  validated: boolean = false;
  taskForm: FormGroup;
  showAddTask: boolean;
  subscription: Subscription;

  constructor(private uiService: UiService, private taskService:TaskService) {
    this.subscription = this.uiService
      .onToggle()
      .subscribe(value => {
        this.showAddTask = value
        if (this.showAddTask) {
          this.resetForm()
        }
      });
  }

  ngOnInit(): void {
    this.taskForm = new FormGroup({
      id: new FormControl(this.data.id),
      text: new FormControl(this.data.text, Validators.required),
      day: new FormControl(this.data.day),
      reminder: new FormControl(this.data.reminder)
    })

    this.taskService
    .onUpdate()
    .subscribe(value => {
      if (this.taskService.isTask(value)) {
        this.taskForm.setValue(value);
      }
    });
  }
  
  get text() { return this.taskForm.get('text'); }
  get day() { return this.taskForm.get('day'); }
  get reminder() { return this.taskForm.get('reminder'); }
  
  onSubmit() {
    this.submitted = true;
    this.validated = false;

    if (! this.taskForm.valid) return;
    
    this.validated = true;
    
    const formData = this.taskForm.value
    const task = {
      id: formData.id,
      text: formData.text,
      day: formData.day,
      reminder: formData.reminder
    }

    task.id 
      ? this.onUpdateTask.emit(task)
      : this.onAddTask.emit(task)
    
    this.resetForm()
  }

  resetForm() {
    this.taskForm.reset({
      id: this.data.id,
      text: this.data.text,
      day: this.data.day,
      reminder: this.data.reminder,
    })
  }
}
