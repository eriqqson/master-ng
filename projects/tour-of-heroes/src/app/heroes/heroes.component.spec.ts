import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { defer } from 'rxjs';
import { Hero } from '../hero';

import { HeroesComponent } from './heroes.component';

let component: HeroesComponent;
let fixture: ComponentFixture<HeroesComponent>;
let expectedHero: Hero;

function asyncData<T>(data: T) {
  return defer(() => Promise.resolve(data));
}

describe('HeroesComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeroesComponent],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    
    // test doubles for testing purposes
    // mock a hero
    expectedHero = { id: 1, name: 'Wolverine' };

    let getHero = jasmine.createSpy('getHero').and.callFake(() => asyncData(Object.assign({}, expectedHero)));

    fixture.detectChanges();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display hero name in uppercase', () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).withContext('').toContain(`${expectedHero.name.toUpperCase()} Details`);
  });

});