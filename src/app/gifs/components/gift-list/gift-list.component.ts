import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { GiftListItemComponent } from './gift-list-item/gift-list-item.component';
import { Gif } from '../../interface/gif.interface';

@Component({
  selector: 'gift-list',
  imports: [GiftListItemComponent],
  template: `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      @for ( gif of gifs(); track gif) {
      <gift-list-item [imageUrl]="gif.url" />
      }
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GiftListComponent {
  gifs = input.required<Gif[]>();
}
