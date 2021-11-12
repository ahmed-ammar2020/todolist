import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  editForm = new FormGroup({
    editedTask: new FormControl(this.taskContent, [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  constructor(@Inject(MAT_DIALOG_DATA) public taskContent: string) {}

  ngOnInit(): void {}
}
