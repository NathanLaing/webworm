import { Component, computed, inject, input } from '@angular/core';
import { BookKeeperService } from '../../services/book-keeper/book-keeper.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideUrlValidator } from '../../validators/url.validator';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { Router } from '@angular/router';
import { BookmarkComponent } from '../../components/bookmark/bookmark.component';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [ReactiveFormsModule, PaginationComponent, BookmarkComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent {
  private readonly bookKeeper = inject(BookKeeperService);
  private readonly router = inject(Router);

  public readonly page = input.required<number, string>({
    transform: (value) => {
      const float = Number(value);
      if (isNaN(float)) {
        return 1;
      }
      return Math.floor(float);
    },
  });

  public readonly PAGE_SIZE = 20 as const;

  public readonly bookmarks = this.bookKeeper.currentBookmarks();
  public readonly visibleBookmarks = computed(() => {
    return this.bookmarks().slice(
      (this.page() - 1) * this.PAGE_SIZE,
      this.page() * this.PAGE_SIZE,
    );
  });

  public readonly form = new FormGroup({
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, provideUrlValidator()],
    }),
  });

  public onSubmit() {
    if (this.form.valid) {
      const bookmark = this.bookKeeper.add({
        url: this.form.controls.url.value,
      });
      this.router.navigate(['bookmark', bookmark.id]);
    }
  }

  public pageChanged(value: number) {
    this.router.navigate(['overview', value]);
  }
}
