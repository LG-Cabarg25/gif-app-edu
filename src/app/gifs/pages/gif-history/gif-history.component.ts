import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifService } from '../../services/gifs.service';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';

@Component({
  selector: 'app-gif-search',
  imports: [GiftListComponent],
  template: `
    <h3 class="text-2xl font-bold mt-4">Mostrando: {{ query() }}</h3>
    <hr />
    <section class="py-5">
      <gift-list [gifs]="gifsByKey()" />
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GifHistoryComponent {
  gifService = inject(GifService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => {
    return this.gifService.getHistoryGifs(this.query());
  });
}
