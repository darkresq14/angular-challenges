import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { CardComponent } from '../../ui/card/card.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `<app-card
    [list]="students() ?? []"
    (add)="addStudentItem()"
    class="bg-light-green">
    <img id="imgSlot" src="assets/img/student.webp" width="200px" />
    <ng-template #rowRef let-student>
      <app-list-item (delete)="deleteStudentItem(student.id)">{{
        student.firstname
      }}</app-list-item>
    </ng-template>
  </app-card>`,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  students = toSignal(this.store.students$);

  constructor(
    private http: FakeHttpService,
    private store: StudentStore,
  ) {}

  addStudentItem() {
    this.store.addOne(randStudent());
  }

  deleteStudentItem(id: number) {
    this.store.deleteOne(id);
  }

  ngOnInit(): void {
    this.http.fetchStudents$.subscribe((s) => this.store.addAll(s));
  }
}
