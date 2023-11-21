import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-teacher-card',
  template: `<app-card
    [list]="teachers() ?? []"
    (add)="addTeacherItem()"
    class="bg-light-red">
    <img id="imgSlot" src="assets/img/teacher.png" width="200px" />
    <ng-template #rowRef let-teacher>
      <app-list-item (delete)="deleteTeacherItem(teacher.id)">{{
        teacher.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers = toSignal(this.store.teachers$);

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  addTeacherItem() {
    this.store.addOne(randTeacher());
  }

  deleteTeacherItem(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));
  }
}
