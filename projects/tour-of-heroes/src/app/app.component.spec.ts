import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';

@Component({selector: 'app-heroes', template: ''})
class HeroesStubComponent { }

let fixture: ComponentFixture<AppComponent>;
let component: AppComponent;

describe('AppComponent', () => {
  // Asynchronous beforeEach(): Compiles the components
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HeroesStubComponent
      ],
    }).compileComponents(); // compile template and css
  }));

  // Synchronous beforeEach(): Performs the remaining setup
  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Tour of Heroes'`, () => {
    expect(component.title).toEqual('Tour of Heroes');
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Tour of Heroes');
  });
});
