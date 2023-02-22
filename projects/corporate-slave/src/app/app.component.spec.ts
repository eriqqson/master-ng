import { Component, DebugElement, Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

@Component({ selector: 'app-navbar', template: '' })
class NavbarStubComponent { }

@Component({ selector: 'router-outlet', template: '' })
class RouterOutletStubComponent { }

@Component({ selector: 'app-dashboard', template: '' })
class DashboardStubComponent { }

@Component({ selector: 'app-footer', template: '' })
class FooterStubComponent { }

@Directive({ selector: '[routerLink]' })
export class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

let component: AppComponent;
let fixture: ComponentFixture<AppComponent>;
let routerLinks: RouterLinkDirectiveStub[];
let linkDes: DebugElement[];

describe('AppComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed
      .configureTestingModule({
        declarations: [
          AppComponent,
          NavbarStubComponent,
          DashboardStubComponent,
          FooterStubComponent
        ],
        imports: [AppModule]
      })

      // Get rid of app's Router configuration otherwise many failures. Doing so removes Router declarations; add the Router stubs.
      .overrideModule(AppModule, {
        remove: { imports: [AppRoutingModule] },
        add: { declarations: [RouterLinkDirectiveStub, RouterOutletStubComponent] }
      })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
      });
  }));

  beforeEach(() => {
    fixture.detectChanges();  // trigger initial data binding

    // find DebugElements with an attached RouterLinkStubDirective
    linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));

    // get attached link directive instances using each DebugElement's injector
    routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub));
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'corporate-slave'`, () => {
    expect(component.title).toEqual('corporate-slave');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('.content span')?.textContent).toContain('corporate-slave app is running!');
  // });

  it('can instantiate the component', () => {
    expect(component).not.toBeNull();
  });
});