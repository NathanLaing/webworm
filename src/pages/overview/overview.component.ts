import { Component, inject, input, OnInit } from '@angular/core';
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
import { Bookmark } from '../../models/bookmark.model';

@Component({
    selector: 'app-overview',
    standalone: true,
    imports: [ReactiveFormsModule, PaginationComponent, BookmarkComponent],
    templateUrl: './overview.component.html',
    styleUrl: './overview.component.scss',
})
export class OverviewComponent implements OnInit {
    private bookKeeper = inject(BookKeeperService);
    private router = inject(Router);

    public page = input.required<number, string>({
        transform: (value) => Number.parseInt(value),
    });

    public PAGE_SIZE = 20 as const;

    public bookmarks = this.bookKeeper.currentBookmarks();
    public visibleBookmarks: Bookmark[] = [];

    ngOnInit() {
        this.visibleBookmarks = this.bookmarks().slice(
            (this.page() - 1) * this.PAGE_SIZE,
            this.page() * this.PAGE_SIZE,
        );
    }

    public form = new FormGroup({
        url: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, provideUrlValidator()],
            updateOn: 'blur',
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

    public visibleBookmarksChanged(bookmarks: Bookmark[]) {
        this.visibleBookmarks = bookmarks;
    }
}
