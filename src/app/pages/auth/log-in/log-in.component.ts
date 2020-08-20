import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  hero = { name: '', password: '' };
  heroForm: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.hero.name, [
        Validators.required,
        Validators.minLength(4),
      ]),

      password: new FormControl(this.hero.password, [
        Validators.required,
        Validators.minLength(4),
      ])
    });
  }

  clickButton() {
    console.log('name >> ' + this.heroForm.value.name);
    console.log('password >> ' + this.heroForm.value.password);

    setTimeout(() => {
      this.router.navigate(['/mail']);
    }, 4000);
  }

  get name() {
    return this.heroForm.get('name');
  }

  get password() {
    return this.heroForm.get('password');
  }

}
