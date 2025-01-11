export interface MenuItem{

  label: string;
  icon?: string;
  link?: string;
  submenu?: SubMenuItem[];
}

interface SubMenuItem{
  label: string;
  icon?: string;
  link?: string;
}
