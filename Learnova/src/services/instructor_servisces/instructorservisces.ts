import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Iinstructor } from '../../app/Components/instructors/iinstructor';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Instructorservisces {
  inst_data =
    'https://raw.githubusercontent.com/Moustafa4/learnovaRemake/main/Learnova/public/data/instuctor_Data/instructor.json';

  constructor(private _HttpClient: HttpClient) {}

  instuctor_data() {
    return this._HttpClient
      .get<{ instructor: Iinstructor[] }>(this.inst_data)
      .pipe(map((res) => res.instructor ?? ([] as Iinstructor[])));
  }
}
