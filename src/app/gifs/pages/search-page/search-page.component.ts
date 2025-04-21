import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [],
  template: `
    <p>search-page works!</p>
    ,
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {}
