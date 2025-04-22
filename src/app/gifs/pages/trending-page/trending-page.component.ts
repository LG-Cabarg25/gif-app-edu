import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [GiftListComponent],
  template: `
    <section class="py-5">
      <gift-list [gifs]="gifService.trendingGifs()" />
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {
  gifService = inject(GifService);
}
