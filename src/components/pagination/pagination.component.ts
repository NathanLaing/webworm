import { Component, computed, input, output } from '@angular/core';
import { BookmarkComponent } from '../bookmark/bookmark.component';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [BookmarkComponent],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
    public items = input.required<any[]>();
    public page = input.required<number>();
    public pageSize = input.required<number>();

    public pageChanged = output<number>();
    public visibleItems = output<any[]>();

    public lastPage = computed(() => {
        return Math.ceil(this.items().length / this.pageSize());
    });

    public changePage(page: number) {
        this.pageChanged.emit(page);
        this.visibleItems.emit(
            this.items().slice(
                (page - 1) * this.pageSize(),
                page * this.pageSize(),
            ),
        );
    }
}
