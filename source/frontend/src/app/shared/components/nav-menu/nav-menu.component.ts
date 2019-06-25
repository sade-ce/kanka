import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { Menu } from '@app/core/models/core';
import { MatAccordion } from '@angular/material';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent  implements OnInit {

  @Input() items: Menu;

  // {static: false} durmu yeni eklendi angular 8 ile
 // tslint:disable-next-line:max-line-length
 /*  The { static: true } option was introduced to support creating embedded views on the fly.
 When you are creating a view dynamically and want to acces the TemplateRef,
 you won't be able to do so in ngAfterViewInit as it will cause a ExpressionHasChangedAfterChecked error.
  Setting the static flag to true will create your view in ngOnInit.  */
  @ViewChild(MatAccordion, {static: true}) accordion: MatAccordion;

  constructor() {}

  ngOnInit() {}
}
