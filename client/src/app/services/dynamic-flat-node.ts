export class DynamicFlatNode {
    constructor(
      public  item: { value: string; href: string },
      public level = 1,
      public expandable = false,
      public isLoading = false,
    ) {}
  }