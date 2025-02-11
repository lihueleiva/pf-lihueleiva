import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Teacher } from '../../model/teachers.model';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.scss'],
  standalone: false
})
export class TeachersTableComponent {
  @Input() dataSource: Teacher[] = [];
  @Output() edit = new EventEmitter<Teacher>();
  @Output() delete = new EventEmitter<string>();

  displayedColumns: string[] = ['name', 'actions'];  

  onEdit(teacher: Teacher): void {
    this.edit.emit(teacher);
  }

  onDelete(id: string): void {
    this.delete.emit(id);
  }
}
