import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';

import { HeaderComponent } from './components';
import { reducer as appReducer, AppFacade, AppEffects } from './store';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature('app', appReducer),
    EffectsModule.forFeature([AppEffects]),
  ],
  providers: [AppFacade],
  exports: [HeaderComponent],
})
export class CoreModule {}
