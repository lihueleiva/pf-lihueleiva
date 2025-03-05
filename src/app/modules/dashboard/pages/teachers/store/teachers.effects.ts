import { loadTeachers } from './teachers.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TeachersActions from './teachers.actions';
import { TeacherService } from '../../../../../core/services/teachers.service';

@Injectable()
export class TeachersEffects {
  loadTeachers$;
  deleteTeacher$;

  constructor(
    private actions$: Actions,
    private teachersService: TeacherService
  ) {
    this.loadTeachers$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TeachersActions.loadTeachers),
        switchMap(() =>
          this.teachersService.getTeachers().pipe(
            map((teachers) => TeachersActions.loadTeachersSuccess({ teachers })),
            catchError((error) => of(TeachersActions.loadTeachersFailure({ error })))
          )
        )
      )
    );
  
    this.deleteTeacher$ = createEffect(() =>
      this.actions$.pipe(
        ofType(TeachersActions.deleteTeacher),
        switchMap(({ id }) =>
          this.teachersService.deleteTeacherById(id).pipe(
            map(() => TeachersActions.deleteTeacherSuccess({ id })),
            catchError((error) => of(TeachersActions.deleteTeacherFailure({ error })))
          )
        )
      )
    );
  }
}