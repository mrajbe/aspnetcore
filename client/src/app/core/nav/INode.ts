export interface INode {
  name: string;
  tag?: string;
  url?: string;
  method?: string;
  children?: INode[];
}

