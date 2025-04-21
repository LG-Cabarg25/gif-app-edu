import { Component, input } from '@angular/core';

@Component({
  selector: 'gift-list-item',
  imports: [],
  template: `
    <div>
      <img class="h-auto max-w-full rounded-lg" [src]="imageUrl()" alt="" />
    </div>
  `,
})
export class GiftListItemComponent {
  imageUrl = input.required<string>();
}
