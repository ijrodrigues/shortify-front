import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ShortifySearchService} from "./shortify.search.service";

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.css']
})
export class RedirectComponent implements OnInit {

  constructor(private route: ActivatedRoute, private service: ShortifySearchService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.service
        .findById(params.get('id'))
        .subscribe(shortifyUrl => {
          window.location.href = shortifyUrl.url
        })
    });
  }
}
