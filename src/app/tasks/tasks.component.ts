import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../dialogs/edit/edit.component';
import { DeleteComponent } from '../dialogs/delete/delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  @Input() tasks: string[] = [];
  checkedValues: boolean[] = [];
  uniqueIds: string[] = [];
  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (localStorage.getItem('tasks')) {
      let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      this.tasks.push(...storedTasks);
    }

    if (localStorage.getItem('checkedValues')) {
      this.checkedValues.push(
        ...JSON.parse(localStorage.getItem('checkedValues') || '[]')
      );

      this.checkedValues = this.checkedValues.map((item) => {
        if (!item) {
          return false;
        } else {
          return true;
        }
      });

      localStorage.setItem('checkedValues', JSON.stringify(this.checkedValues));
    }
  }

  checkTask({ checked }: any, index: number) {
    this.checkedValues[index] = checked;
    this.checkedValues = this.checkedValues.map((item) => {
      if (!item) {
        return false;
      } else {
        return true;
      }
    });

    localStorage.setItem('checkedValues', JSON.stringify(this.checkedValues));
  }

  openEditDialog(index: number) {
    const dialogRef = this.dialog.open(EditComponent, {
      data: this.tasks[index],
    });
    const beforeEditedTask = this.tasks[index];
    const beforeEditedTaskChecked = this.checkedValues[index];

    dialogRef.afterClosed().subscribe((editedTask: string) => {
      if (editedTask) {
        this.tasks[index] = editedTask;
        localStorage.setItem('tasks', JSON.stringify(this.tasks));

        // undo editing
        if (beforeEditedTask === editedTask) return;
        const snackBarRef = this.snackBar.open(
          'Task Edited successfully!!',
          'Undo',
          { duration: 4000 }
        );
        snackBarRef.onAction().subscribe(() => {
          this.tasks.splice(index, 1, beforeEditedTask);
          this.checkedValues.splice(index, 1, beforeEditedTaskChecked);
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
        });
      }
    });
  }

  openDeleteDialog(index: number) {
    const dialogRef = this.dialog.open(DeleteComponent);
    const deletedTask = this.tasks[index];
    const deletedTaskChecked = this.checkedValues[index];

    dialogRef.afterClosed().subscribe((isDelete) => {
      if (isDelete) {
        this.tasks.splice(index, 1);
        this.checkedValues.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
        localStorage.setItem(
          'checkedValues',
          JSON.stringify(this.checkedValues)
        );

        // undo deleting
        const snackBarRef = this.snackBar.open('Task Deleted', 'Undo', {
          duration: 4000,
        });
        snackBarRef.onAction().subscribe(() => {
          this.tasks.splice(index, 0, deletedTask);
          this.checkedValues.splice(index, 0, deletedTaskChecked);
          localStorage.setItem('tasks', JSON.stringify(this.tasks));
          localStorage.setItem(
            'checkedValues',
            JSON.stringify(this.checkedValues)
          );
        });
      }
    });
  }
}
