import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  signal,
  viewChild,
} from '@angular/core';
import { GiftListComponent } from '../../components/gift-list/gift-list.component';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  template: `
    <!-- <section class="py-5">
      <gift-list [gifs]="gifService.trendingGifs()" />
    </section> -->

    <div
      class="h-screen overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 p-5"
      (scroll)="onScroll($event)"
      #groupDiv
    >
      @for (group of gifService.trendingGifGroup() ; track $index) {
      <div class="grid gap-4">
        @for (gif of group ; track gif.id) {
        <img
          class="h-full w-full rounded-lg object-cover"
          [src]="gif.url"
          [alt]="gif.title"
        />
        }
      </div>
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent {
  gifService = inject(GifService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clienteight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;
    // console.log({ scrollTop, clienteight, scrollHeight });

    const isAtBotton = scrollTop + clienteight + 300 >= scrollHeight;
    if (isAtBotton) {
      this.gifService.loadTrendigGifs();
      // console.log('Cargamos más gifs');
    }
  }
}
