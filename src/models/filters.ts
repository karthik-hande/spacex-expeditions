export interface IFilterOption {
    name: string;
    value: number;
    selected: boolean;
    type: string;
  }
  
  export interface IActiveFilter {
    year: null|number;
    launchStatus: null|boolean;
    landingStatus: null|boolean;
  }
  