import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ShortifyService} from "./shortify.service";
import {Shortify} from "./Shortify";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  href: string | undefined = undefined
  form: FormGroup = new FormGroup({
    url: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      this.mustBeUrl()
    ])
  })

  constructor(private service: ShortifyService) {
  }

  mustBeUrl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const isAValidUrl = this.isAValidUrl(control.value)
      return isAValidUrl ? null : {url: {value: control.value}};
    };
  }

  isAValidUrl(url : string): boolean {
    try {
      new URL(url);
      return true;
    } catch(e) {
      return false;
    }
  }

  ngOnInit(): void {
  }

  submit(){
    console.log(this.form.value)
    const shortify: Shortify = { ...this.form.value }

    this.service
      .create(shortify)
      .subscribe(shortify => {
        console.log(shortify)
        this.href = environment.redirectUrl + shortify.id
        this.form.reset()
      })
  }
}
