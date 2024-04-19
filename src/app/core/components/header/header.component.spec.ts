import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [HeaderComponent],
			imports: [],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to jobs', () => {
		const navigateSpy = spyOn(component, 'navigateTo');
		component.navigateTo('/job-ads');
		expect(navigateSpy).toHaveBeenCalledWith('/job-ads');
	});

	it('should navigate to invoices', () => {
		const navigateSpy = spyOn(component, 'navigateTo');
		component.navigateTo('/invoices');
		expect(navigateSpy).toHaveBeenCalledWith('/invoices');
	});
});
