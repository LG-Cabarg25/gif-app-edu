import { Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from './side-menu-header/side-menu-header.component';
import { GifsSideMenuOptionsComponent } from './side-menu-options/side-menu-options.component';

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, GifsSideMenuOptionsComponent],
  template: `
    <div
      id="menu"
      class="bg-gray-900 w-[220px] min-h-screen z-10 text-slate-300 fixed left-0 h-screen overflow-y-scroll"
    >
      <!--gifs-side-menu-header-->
      <gifs-side-menu-header />
      <!--gifs-side-menu-options-->
      <gifs-side-menu-options />
    </div>
  `,
})
export class SideMenuComponent {}
