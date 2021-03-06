import { Component, ViewChild, ElementRef, VERSION, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { NavService } from './shared/navigation/nav.service';
import { NavItem } from './shared/navigation/nav-item';

@Component({
  selector: 'ak-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {

  @ViewChild('appDrawer', { static: false }) public appDrawer: ElementRef;
  version = VERSION;
  public navItems: NavItem[] = [
    {
      displayName: 'DashBoard',
      iconName: 'dashboard',
      route: 'dashboard',
    },
    {
      displayName: 'Home',
      iconName: 'home',
      route: 'home',
    },
    {
      displayName: 'Profile',
      iconName: 'person',
      route: 'details-user',
    },
    {
      displayName: 'Gestion',
      iconName: 'settings',
      route: 'gestion',
      children: [
        {
          displayName: 'Utilisateurs',
          iconName: 'group',
          route: 'gestion/utilisateur',
          children: [
            {
              displayName: 'Liste Utilisateurs',
              iconName: '',
              route: 'gestion/utilisateur/list-user'
            },
            {
              displayName: 'Ajouter Utilisateur',
              iconName: '',
              route: 'gestion/utilisateur/add-user'
            }
          ]
        },
        {
          displayName: 'Conférences',
          iconName: 'record_voice_over',
          route: 'gestion/conference',
          children: [
            {
              displayName: 'Liste Conférences',
              iconName: '',
              route: 'gestion/conference/list-conference'
            },
            {
              displayName: 'Ajouter Conférence',
              iconName: '',
              route: 'gestion/conference/add-conference'
            }
          ]
        }
      ]
    },
    {
      displayName: 'Top 10 conférences',
      iconName: 'stars',
      route: 'top10-conference',
    }
  ];

  constructor(private navService: NavService) {}

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}
