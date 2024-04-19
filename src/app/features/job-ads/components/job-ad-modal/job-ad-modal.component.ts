import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable, map, of, take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { JobAdComponentStore, JobAdsViewModel } from '../../store';

export interface Skill {
  name: string;
}

@Component({
  selector: 'app-job-ad-modal',
  templateUrl: './job-ad-modal.component.html',
  styleUrls: ['./job-ad-modal.component.scss'],
  providers: [JobAdComponentStore],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobAdModalComponent implements OnInit {
  public jobAdForm!: FormGroup;
  public separatorKeysCodes: number[] = [ENTER, COMMA];
  public vm$ = this.store.vm$;

  constructor(
    private fb: FormBuilder,
    public store: JobAdComponentStore,
    private route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.initForm();

    this.route.params.pipe(take(1)).subscribe((params) => {
      this.store.init(params);
    });

    this.vm$.pipe(take(1)).subscribe((vm: JobAdsViewModel) => {
      if (vm.form) {
        this.jobAdForm.patchValue({
          title: vm.form.title,
          description: vm.form.description,
          skills: vm.form.skills,
        });
      } else {
        this.jobAdForm.reset();
      }
    });

    this.jobAdForm.valueChanges.subscribe(() => {
      this.store.updateForm(this.jobAdForm.value);
    });
  }

  public initForm() {
    this.jobAdForm = this.fb.group({
      title: [
        '',
        [Validators.required],
        [this.titleExistsValidator.bind(this)],
      ],
      description: ['', [Validators.required, Validators.minLength(10)]],
      skills: [
        [],
        [Validators.required],
        [this.atLeastOneSkillValidator.bind(this)],
      ],
    });
  }

  public addSkill(event: MatChipInputEvent): void {
    const input = event.input;
    const value = (event.value || '').trim();

    if (value) {
      const skills = this.jobAdForm.get('skills');
      skills?.setValue([...skills.value, value]);
    }

    if (input) {
      input.value = '';
    }
  }

  public removeSkill(index: number): void {
    const skills = this.jobAdForm.get('skills');
    if (skills && index >= 0) {
      const currentSkills = [...skills.value];
      currentSkills.splice(index, 1);
      skills.setValue(currentSkills);
      skills.updateValueAndValidity();
    }
  }

  public onSubmit() {
    if (this.jobAdForm.valid) {
      const jobAdData = this.jobAdForm.value;
      this.store.submitForm(jobAdData);
    }
  }

  public onCancel() {
    this.store.cancel();
  }

  private titleExistsValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const title = control.value;

    return this.store
      .checkNameExists(of(title))
      .pipe(map((exists) => (exists ? { titleExists: true } : null)));
  }

  private atLeastOneSkillValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    const skills = control.value as string[];
    return of(skills && skills.length > 0 ? null : { atLeastOneSkill: true });
  }
}
