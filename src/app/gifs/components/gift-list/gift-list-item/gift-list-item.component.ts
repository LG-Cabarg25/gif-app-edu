import { Component, input } from '@angular/core';

@Component({
  selector: 'gift-list-item',
  imports: [],
  template: `
    <div>
      <img
        class="h-full w.full max-w-full rounded-lg object-cover"
        [src]="imageUrl()"
        alt=""
      />
    </div>
  `,
})
export class GiftListItemComponent {
  imageUrl = input.required<string>();
}
