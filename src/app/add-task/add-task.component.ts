import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
})
export class AddTaskComponent implements OnInit {
  tasks: string[] = [];
  taskForm = new FormGroup({
    taskContent: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor() {}

  ngOnInit(): void {}

  submitForm() {
    if (this.taskForm.invalid) return;
    this.tasks.push(this.taskForm.value.taskContent);
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    this.taskForm.reset();
  }
}
