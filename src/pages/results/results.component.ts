import { Component, computed, inject, input } from '@angular/core';
import { BookKeeperService } from '../../services/book-keeper/book-keeper.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-results',
    standalone: true,
    imports: [],
    templateUrl: './results.component.html',
    styleUrl: './results.component.scss',
})
export class ResultsComponent {
    private bookKeeper = inject(BookKeeperService);
    private router = inject(Router);

    public id = input.required<string>();

    public bookmark = computed(() => {
        return this.bookKeeper.getFromStorage(this.id());
    });

    public overviewClicked() {
        this.router.navigate(['overview']);
    }
}
