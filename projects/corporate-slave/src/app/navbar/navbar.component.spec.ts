import { Component, DebugElement, Directive, HostListener, Input } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

// @Component({ selector: 'app-dashboard', template: '' })
// class DashboardStubComponent { }

@Directive({ selector: '[routerLink]' })
class RouterLinkDirectiveStub {
  @Input('routerLink') linkParams: any;
  navigatedTo: any = null;

  @HostListener('click')
  onClick() {
    this.navigatedTo = this.linkParams;
  }
}

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let routerLinks: RouterLinkDirectiveStub[];
  let linkDes: DebugElement[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        RouterLinkDirectiveStub,
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();  // trigger initial data binding

        // find DebugElements with an attached RouterLinkStubDirective
        linkDes = fixture.debugElement.queryAll(By.directive(RouterLinkDirectiveStub));
        
        // get attached link directive instances using each DebugElement's injector
        routerLinks = linkDes.map(de => de.injector.get(RouterLinkDirectiveStub))
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('can instantiate the component', () => {
    expect(component).not.toBeNull();
  });

  it('can get RouterLinks from template', () => {
    expect(routerLinks.length).withContext('should have 2 routerLinks').toBe(2);
    expect(routerLinks[0].linkParams).toBe('/dashboard');
  });

  // it('can click Heroes link in template', () => {
  //   const heroesLinkDe = linkDes[1];    // heroes link DebugElement
  //   const heroesLink = routerLinks[1];  // heroes link directive

  //   expect(heroesLink.navigatedTo).withContext('should not have navigated yet').toBeNull();

  //   heroesLinkDe.triggerEventHandler('click');
  //   fixture.detectChanges();

  //   expect(heroesLink.navigatedTo).toBe('/heroes');
  // });
});
