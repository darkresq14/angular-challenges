import { Injectable } from '@angular/core';
import { City } from '../model/city.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CityStore {
  private cities = new BehaviorSubject<City[]>([]);
  cities$ = this.cities.asObservable();

  addAll(cities: City[]) {
    this.cities.next(cities);
  }

  addOne(city: City) {
    this.cities.next([...this.cities.value, city]);
  }

  deleteOne(id: number) {
    this.cities.next(this.cities.value.filter((c) => c.id !== id));
  }
}