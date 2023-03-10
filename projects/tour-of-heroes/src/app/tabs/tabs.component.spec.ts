import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TabsComponent } from './tabs.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatTabGroupHarness } from '@angular/material/tabs/testing';
import { Component } from '@angular/core';

@Component({ selector: 'app-stepper', template: '' })
class StepperStubComponent { }

@Component({ selector: 'app-table', template: '' })
class TableStubComponent { }

describe('TabsComponent', () => {
  let component: TabsComponent;
  let fixture: ComponentFixture<TabsComponent>;
  let loader: HarnessLoader;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TabsComponent, StepperStubComponent, TableStubComponent],
      imports: [NoopAnimationsModule, MatTabsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load harness for tab-group', async () => {
    const tabGroups = await loader.getAllHarnesses(MatTabGroupHarness);
    console.log(tabGroups);
    expect(tabGroups.length).toBe(1);
  });

  it('should load harness for tab-group with selected tab label', async () => {
    const tabGroups = await loader.getAllHarnesses(
      MatTabGroupHarness.with({
        selectedTabLabel: 'First'
      })
    );
    expect(tabGroups.length).toBe(1);
  });

  it('should be able to get tabs of tab-group', async () => {
    const tabGroup = await loader.getHarness(MatTabGroupHarness);
    const tabs = await tabGroup.getTabs();
    expect(tabs.length).toBe(2);
  });

  it('should be able to select tab from tab-group', async () => {
    const tabGroup = await loader.getHarness(MatTabGroupHarness);
    expect(await (await tabGroup.getSelectedTab()).getLabel()).toBe('First');
    await tabGroup.selectTab({ label: 'Second' });
    expect(await (await tabGroup.getSelectedTab()).getLabel()).toBe('Second');
  });
});
