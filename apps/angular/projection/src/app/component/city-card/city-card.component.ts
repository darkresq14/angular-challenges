import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CityStore } from '../../data-access/city.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `<app-card
    [list]="cities() ?? []"
    (add)="addCityItem()"
    class="bg-light-blue">
    <img id="imgSlot" src="assets/img/city.png" width="200px" />
    <ng-template #rowRef let-city>
      <app-list-item (delete)="deleteCityItem(city.id)">{{
        city.name
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 0, 250, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  cities = toSignal(this.store.cities$);

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));
  }

  addCityItem() {
    this.store.addOne(randomCity());
  }

  deleteCityItem(id: number) {
    this.store.deleteOne(id);
  }
}
