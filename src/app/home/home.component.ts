import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {ShortifyService} from "./shortify.service";
import {Shortify} from "./Shortify";
import {environment} from "../../environments/environment";
import {NotificationService} from "../commons/notification.service";

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
    ]),
    id: new FormControl('', [
      Validators.minLength(0),
      Validators.maxLength(40)
    ])
  })

  constructor(private service: ShortifyService, private notify: NotificationService) {
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
    const shortify: Shortify = { ...this.form.value }

    this.service
      .create(shortify)
      .subscribe(
        {
          next: () => {
            this.href = environment.redirectUrl + shortify.id
            this.form.reset()
          },
          error: (err) => {
            this.notify.showNotification(err)
          }
        }
      )
  }
}
