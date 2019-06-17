import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  @Input() brand: string = 'fvToad';
  @Input() link: any = ['/']
  constructor() { }

  ngOnInit() {
  }

}
