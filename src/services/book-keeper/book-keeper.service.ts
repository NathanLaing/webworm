import { Injectable, signal } from '@angular/core';
import { Bookmark } from '../../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class BookKeeperService {
  private readonly bookmarks = signal(this.getAllFromStorage());

  public currentBookmarks() {
    return this.bookmarks.asReadonly();
  }

  public add(value: Omit<Bookmark, 'id'>) {
    const id = Date.now().toString();
    const bookmark: Bookmark = {
      id,
      ...value,
    };

    localStorage.setItem(id, JSON.stringify(bookmark));

    this.bookmarks.update((current) => [bookmark, ...current]);

    return bookmark;
  }

  public update(bookmark: Bookmark) {
    localStorage.setItem(bookmark.id, JSON.stringify(bookmark));

    this.bookmarks.update((current) => [
      bookmark,
      ...current.filter((value) => value.id !== bookmark.id),
    ]);
  }

  public remove(id: string) {
    localStorage.removeItem(id);

    this.bookmarks.update((current) =>
      current.filter((bookmark) => bookmark.id !== id),
    );
  }

  public getFromStorage(id: string): Bookmark | null {
    const value = localStorage.getItem(id);

    if (value) {
      const parsed = JSON.parse(value);

      if (parsed.id !== undefined && parsed.url !== undefined) {
        return { id: parsed.id, url: parsed.url };
      }
    }

    return null;
  }

  public getAllFromStorage(): Bookmark[] {
    return Object.keys(localStorage)
      .map((key) => this.getFromStorage(key))
      .filter((bookmark) => {
        return bookmark !== null;
      });
  }
}
