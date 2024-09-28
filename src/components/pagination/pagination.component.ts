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
    public totalItems = input.required<number>();
    public pageNumber = input.required<number>();
    public itemsPerPage = input.required<number>();

    public pageChanged = output<number>();
    public visibleItems = output<any[]>();

    public lastPage = computed(() => {
        return Math.ceil(this.totalItems() / this.itemsPerPage());
    });

    public changePage(page: number) {
        this.pageChanged.emit(page);
    }
}
