import { Injectable } from '@angular/core';
import { Task } from '../../models/Task';
import { Observable, BehaviorSubject} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  }) 
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private subjectBehavior = new BehaviorSubject<any>({});

  private apiUrl = "http://localhost:5000/tasks";
  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    // Hash using Observable with mock js file
    // const tasks = of(Tasks);
    // return tasks;

    return this.http.get<Task[]>(this.apiUrl)
  } 

  deleteTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.delete<Task>(url);
  } 

  updateTask(task: Task): Observable<Task> {
    const url = `${this.apiUrl}/${task.id}`;
    return this.http.put<Task>(url, task, httpOptions);
  }

  addTask(task: Task) : Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task, httpOptions);
  }

  setUpdatedTask(task: Task) {
    this.subjectBehavior.next(task)
  }

  onUpdate(): Observable<any> {
    return this.subjectBehavior.asObservable();
  }

  isTask(task: Task) {
    return 'text' in task && 'day' in task && 'reminder' in task;
  }

  emptyTask() {
    return {
      id: 0,
      text: '',
      day: '',
      reminder: false,
    };
  }
}
