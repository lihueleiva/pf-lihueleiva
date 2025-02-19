import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students.component';
import { StudentDetailComponent } from './pages/student-detail/student-detail.component';

const routes: Routes = [
  {
    path: '', // Ruta base: /dashboard/students
    component: StudentsComponent,
  },
  {
    path: ':id', // Ruta hija: /dashboard/students/ID
    component: StudentDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Usa forChild para rutas hijas
  exports: [RouterModule],
})
export class StudentsRoutingModule {}