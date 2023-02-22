import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Hero } from '../hero';

import { HeroesComponent } from './heroes.component';

let component: HeroesComponent;
let fixture: ComponentFixture<HeroesComponent>;
let testHero: Hero;

describe('HeroesComponent', () => {
  beforeEach(waitForAsync(() => {
    // test doubles for test purposes
    testHero = {
      id: 1,
      name: 'Wolverine'
    };

    TestBed.configureTestingModule({
      declarations: [HeroesComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should have hero 'Wolverine'`, () => {
    // expect(component.hero.name).withContext('').toEqual();
  });

  it(`should render hero`, () => {
    const h2: HTMLElement = fixture.nativeElement.querySelector('h2');
    expect(h2.textContent).withContext('').toEqual(testHero.name);
  });

});