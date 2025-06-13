import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedCandidatesPage } from './saved-candidates.page';

const routes: Routes = [
  {
    path: '',
    component: SavedCandidatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedCandidatesPageRoutingModule {}
