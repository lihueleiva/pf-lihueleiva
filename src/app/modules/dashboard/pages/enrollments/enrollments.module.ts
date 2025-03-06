import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentsRoutingModule } from './enrollments-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from '../../../../shared/shared.module';
import { EnrollmentsComponent } from './enrollments.component';
import { enrollmentFeature } from './store/enrollments.reducer';
import { EnrollmentEffects } from './store/enrollments.effects';

@NgModule({
  declarations: [EnrollmentsComponent],
  imports: [
    CommonModule,
    SharedModule,
    EnrollmentsRoutingModule,
    StoreModule.forFeature(enrollmentFeature),
    EffectsModule.forFeature([EnrollmentEffects]),
  ],
})
export class EnrollmentsModule {}
