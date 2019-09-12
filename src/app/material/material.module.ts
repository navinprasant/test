import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';

const matComponents = [
  MatToolbarModule,
  MatSelectModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatGridListModule,
  MatDatepickerModule,
  MatIconModule,
  MatNativeDateModule,
  MatDialogModule
]

@NgModule({
  imports: [
    matComponents
  ],
  exports: [
    matComponents
  ]
})
export class MaterialModule { }
