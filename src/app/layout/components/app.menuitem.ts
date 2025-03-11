import { Component, Input, OnInit, ElementRef, Renderer2, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { MegaMenuModule } from 'primeng/megamenu';
import { MegaMenuItem } from 'primeng/api'
import { NgIcon, provideIcons } from '@ng-icons/core';
import { NavigationService } from '../services/navigation.service';
import { NavigationInterface } from '../../interfaces/NavigationInterface';

@Component({
  selector: 'app-menuitem',
  standalone: true,
  imports: [CommonModule, RouterModule, RippleModule, NgIcon, TooltipModule,MegaMenuModule],
  viewProviders: [provideIcons({  })],
  animations: [
    trigger('children', [
      state('collapsed', style({
        height: '0'
      })),
      state('expanded', style({
        height: '*'
      })),
      transition('collapsed <=> expanded', [
        animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')
      ])
    ])
  ],
  template: `
    <li class="menu-item mb-3">
      <a 
        class="flex justify-between items-center py-2 text-neutral-400 hover:text-primary rounded-md cursor-pointer text-sm font-medium"
        [ngClass]="{
            'active': active, 
            'text-primary': active && !item.items,
            'px-4': navService.toggleSidebar(),
            'py-3' : !navService.toggleSidebar(),
            'px-2.5': !navService.toggleSidebar()
          }"
        (click)="onItemClick($event)"
        pRipple
        [pTooltip]="!navService.toggleSidebar() ? item.label : ''"
        tooltipPosition="right">
        <div class="flex items-center">
          <i *ngIf="item.icon" class="mr-3 text-xl"> <ng-icon name="{{item.icon}}" /> </i>
          <span *ngIf="navService.toggleSidebar()">{{ item.label }}</span>
        </div>
        <i *ngIf="item.items && navService.toggleSidebar()" class="pi" [ngClass]="{'pi-chevron-down': !active, 'pi-chevron-up': active}"> </i>
      </a>
      <ul 
        *ngIf="item.items && navService.toggleSidebar()" 
        class="submenu pl-8 overflow-hidden transition-all duration-300" [@children]="active ? 'expanded' : 'collapsed'">
        @for (child of item.items; track child.label) {
          <li class="menu-item mb-1">
            <a class="flex justify-between items-center py-1 text-neutral-400 hover:text-primary rounded-md cursor-pointer text-xs font-medium"
              [ngClass]="{
                'active': active, 
                'text-primary': active && !item.items,
                'px-4': navService.toggleSidebar(),
                'px-2.5': !navService.toggleSidebar()
              }"
              (click)="navigateTo(child.routerLink, $event)"
            >
            <div class="flex items-center">
              <i *ngIf="child.icon" class="mr-3 text-xl"> <ng-icon name="{{child.icon}}" /> </i>
              <span *ngIf="navService.toggleSidebar()">{{ child.label }}</span>
            </div>
            </a>
          </li>
        }
      </ul>
    </li>
    `,
})
export class AppMenuItem implements OnInit {

  navService = inject(NavigationService);
  @Input() item!: NavigationInterface;
  active: boolean = false;
  expanded:boolean = true;
  showMegaMenu = false;
  megaMenuItems: MegaMenuItem[] = [];

  constructor(
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.item.items) {
        const activeRoute = this.item.items.find((item: any) => 
        this.router.isActive(item.routerLink[0], true)
      );
      if (activeRoute) {
        this.active = true;
      }
    }
  }

  onItemClick(event: Event) {
    if(this.navService.toggleSidebar()){
      event.preventDefault();
      this.item.items ? this.active = !this.active : this.navigateTo(this.item.routerLink, event)
    }else{
      this.navService.toggleSidebar.update(value => !value);
    }
  }

  navigateTo(route:any, event: Event) {
    event.preventDefault(); 
    this.router.navigate(route);
  }

}