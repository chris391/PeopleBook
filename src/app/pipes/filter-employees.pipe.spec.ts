/**
 * Created by marcosuarez on 5/4/17.
 */
import {TestBed, async, inject, tick, fakeAsync} from '@angular/core/testing';
import {FilterEmployeesPipe} from "./filter-employees.pipe";




describe('Filters test', () => {
  beforeEach(() => {
    this.employees = [
      {name: 'Abba', userID: 'P0'},
      {name: 'Baba', userID: 'P1'},
      {name: 'Caba', userID: 'P2'},
      {name: 'Caba', userID: 'P3'},
    ];
    TestBed.configureTestingModule({
      declarations: [
        FilterEmployeesPipe
      ]
    })
  });

  describe("FilterEmployees", () => {
    let filter = new FilterEmployeesPipe();

    it('No search string returns array', () => {
      let results = filter.transform(this.employees, '');
      expect(results.length).toBe(4);
      expect(results[0].userID).toBe('P0');
    });

    it('Search string return desired result length', () => {
      let result = filter.transform(this.employees, 'Caba');
      // expect(result.push('Caba')).toBe('Caba');
      expect(result.length).toBe(2);
      expect(result[1].userID).toBe('P3')
    });

  })
})


