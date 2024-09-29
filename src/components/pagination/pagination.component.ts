import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { BookmarkComponent } from '../bookmark/bookmark.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [BookmarkComponent],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  public readonly totalItems = input.required<number>();
  public readonly pageNumber = input.required<number>();
  public readonly itemsPerPage = input.required<number>();

  public readonly pageChanged = output<number>();

  public readonly lastPage = computed(() => {
    return Math.ceil(this.totalItems() / this.itemsPerPage());
  });

  public readonly pageLinks = computed(() => {
    const nextPage = this.pageNumber() + 1;
    const prevPage = this.pageNumber() - 1;

    const notOnFirstPage = this.pageNumber() > 1;
    const notOnLastPage = this.pageNumber() < this.lastPage();

    if (notOnFirstPage && notOnLastPage) {
      return [prevPage, this.pageNumber(), nextPage];
    }

    if (notOnFirstPage) {
      return [prevPage, this.pageNumber()];
    }
    if (notOnLastPage) {
      return [this.pageNumber(), nextPage];
    }

    return [this.pageNumber()];
  });

  public changePage(page: number) {
    this.pageChanged.emit(page);
  }
}
