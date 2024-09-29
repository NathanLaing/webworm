import { Component, computed, inject, input } from '@angular/core';
import { BookKeeperService } from '../../services/book-keeper/book-keeper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css',
})
export class ResultsComponent {
  private readonly bookKeeper = inject(BookKeeperService);
  private readonly router = inject(Router);

  public readonly id = input.required<string>();

  public readonly bookmark = computed(() => {
    return this.bookKeeper.getFromStorage(this.id());
  });

  public overviewClicked() {
    this.router.navigate(['overview']);
  }
}
