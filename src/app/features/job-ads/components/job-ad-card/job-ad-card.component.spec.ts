import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { JobAdCardComponent } from './job-ad-card.component';

describe('JobAdCardComponent', () => {
	let component: JobAdCardComponent;
	let fixture: ComponentFixture<JobAdCardComponent>;
	let router: Router;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [JobAdCardComponent],
			imports: [
				MatCardModule,
				MatIconModule,
				MatButtonModule,
				MatChipsModule,
				RouterTestingModule.withRoutes([]),
			],
		}).compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(JobAdCardComponent);
		component = fixture.componentInstance;
		router = TestBed.inject(Router);
		component.job = {
			id: 1,
			title: 'Test Job',
			description: 'Test Job Description',
			skills: ['Skill1', 'Skill2'],
			status: 'draft',
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should emit deleteClick event with job id when delete button is clicked', () => {
		spyOn(component.deleteClick, 'emit');
		const deleteButton = fixture.debugElement.query(By.css('.delete-button')).nativeElement;
		deleteButton.click();
		expect(component.deleteClick.emit).toHaveBeenCalledWith(component.job.id);
	});

	it('should emit statusChange event with "published" status when publish icon is clicked', () => {
		spyOn(component.statusChange, 'emit');
		const publishIcon = fixture.debugElement.query(By.css('.publish-icon')).nativeElement;
		publishIcon.click();
		expect(component.statusChange.emit).toHaveBeenCalledWith('published');
	});

	it('should emit statusChange event with "archived" status when archive icon is clicked', () => {
		spyOn(component.statusChange, 'emit');
		const archiveIcon = fixture.debugElement.query(By.css('.archive-icon')).nativeElement;
		archiveIcon.click();
		expect(component.statusChange.emit).toHaveBeenCalledWith('archived');
	});
});
