import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public showDropdown: boolean = false;

  public navItems: {
    label: string;
    path: string;
    routerLinkActiveOptions?: boolean;
  }[] = [
    {
      label: 'Home',
      path: '/home',
      routerLinkActiveOptions: true,
    },
    {
      label: 'Films',
      path: '/films',
    },
    {
      label: 'Heroes',
      path: '/heroes',
    },
    {
      label: 'Reactive',
      path: '/reactive-forms',
    },
    {
      label: 'Template',
      path: '/template-forms',
    },
    {
      label: 'Shopping',
      path: '/shopping-list',
    },
    {
      label: 'Recipes',
      path: '/recipes',
    },
    {
      label: 'MicroFE1',
      path: '/mfe1',
    },
  ];

  openDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}
