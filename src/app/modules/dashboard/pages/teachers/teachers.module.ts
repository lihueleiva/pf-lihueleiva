// src/app/modules/dashboard/pages/teachers/teachers.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';
import { SharedModule } from '../../../../shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TeacherFormDialogComponent } from './components/teachers-form-dialog/teachers-form-dialog.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { MatProgressBar } from '@angular/material/progress-bar';
import { TeachersRoutingModule } from './teachers-routing.module';
import { StoreModule } from '@ngrx/store';
import { teachersReducer } from './store/teachers.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TeachersEffects } from './store/teachers.effects';
import { TeacherService } from '../../../../core/services/teachers.service';

@NgModule({
  declarations: [TeachersComponent, TeacherFormDialogComponent, TeachersTableComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatProgressBar,
    TeachersRoutingModule,
    StoreModule.forFeature('teachers', teachersReducer),
    EffectsModule.forFeature([TeachersEffects]),
  ],
  providers: [TeacherService]
})
export class TeachersModule {}