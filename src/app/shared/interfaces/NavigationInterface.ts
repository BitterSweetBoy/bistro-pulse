export  interface NavigationInterface {
    label: string;
    icon?: string;
    routerLink?: string[];
    roles: string[];
    items?: NavigationInterface[];
}