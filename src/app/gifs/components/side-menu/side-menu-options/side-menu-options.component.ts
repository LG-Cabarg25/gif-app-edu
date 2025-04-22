import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifService } from 'src/app/gifs/services/gifs.service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <div id="nav" class="w-full px-6">
      @for (item of menuOptions ; track item.route ) {
      <a
        [routerLink]="item.route"
        [routerLinkActive]="['bg-blue-800']"
        class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150"
      >
        <div>
          <i class="{{ item.icon }}"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-bold leading-5 text-white">{{
            item.label
          }}</span>
          <span class="text-sm text-white/50 hidden md:block">{{
            item.subLabel
          }}</span>
        </div>
      </a>
      }
      <!-- Inyecccion de servicio de historial -->
      @for (key of gifService.searchHistoryKeys(); track key) {
      <a
        [routerLink]="['/dashboard/history', key]"
        [routerLinkActive]="['bg-blue-800']"
        class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150"
      >
        <div>
          <i class="fa-solid fa-clock-rotate-left"></i>
        </div>
        <div class="flex flex-col">
          <span class="text-lg font-bold leading-5 text-white">{{ key }}</span>
        </div>
      </a>
      }
    </div>
  `,
})
export class GifsSideMenuOptionsComponent {
  gifService = inject(GifService);
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Buscador',
      subLabel: 'Buscar Gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    },
  ];
}
