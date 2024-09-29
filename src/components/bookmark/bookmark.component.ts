import { Component, inject, input, OnInit } from '@angular/core';
import { BookKeeperService } from '../../services/book-keeper/book-keeper.service';
import { Bookmark } from '../../models/bookmark.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { provideUrlValidator } from '../../validators/url.validator';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css',
})
export class BookmarkComponent implements OnInit {
  private bookKeeper = inject(BookKeeperService);

  public bookmark = input.required<Bookmark>();

  public form = new FormGroup({
    url: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, provideUrlValidator()],
    }),
  });

  public editing = false;

  ngOnInit() {
    this.form = new FormGroup({
      url: new FormControl<string>(this.bookmark().url, {
        nonNullable: true,
        validators: [Validators.required, provideUrlValidator()],
      }),
    });
  }

  public editBookmark() {
    this.editing = true;
  }

  public onSubmit() {
    this.editing = false;
    this.bookKeeper.update({
      id: this.bookmark().id,
      url: this.form.controls.url.value,
    });
  }

  public isFormValid() {
    return !(this.form.invalid && (this.form.dirty || !this.form.untouched));
  }

  public removeBookmark(id: string) {
    this.bookKeeper.remove(id);
  }
}
