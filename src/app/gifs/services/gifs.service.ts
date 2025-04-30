import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import type { GiphyResponse } from '../interface/giphy.interfaces';
import { Gif } from '../interface/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import { map, tap } from 'rxjs';

const GIF_KEY = 'gifs';
const loadFromLocalStorage = () => {
  const gifsFromLocalStoraged = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStoraged);
  return gifs;
};
@Injectable({ providedIn: 'root' })
export class GifService {
  private http = inject(HttpClient);

  //[[gif,gif,gif], [gif,gif,gif], [gif,gif,gif]]
  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];
    for (let i = 0; i < this.trendingGifs().length; i += 3) {
      groups.push(this.trendingGifs().slice(i, i + 3));
    }
    console.log(groups);
    return groups; //[[g1,g2,g3], [g4,g5,g6], [g7,g8,g9]]
  });

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  private trendingPage = signal(0);

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendigGifs();
    console.log('Servicio creado');
  }
  loadTrendigGifs() {
    if (this.trendingGifsLoading()) return;
    this.trendingGifsLoading.set(true);
    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          offset: this.trendingPage() * 20,
        },
      })
      .subscribe((resp) => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((currentGifs) => [...currentGifs, ...gifs]);
        this.trendingPage.update((current) => current + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string) {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 20,
          q: query,
        },
      })
      .pipe(
        map(({ data }) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items)),

        //!TODO: Historial de busquedas
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

  saveGifToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem('gifs', historyString);
  });
}
