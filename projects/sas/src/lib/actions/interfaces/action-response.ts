export interface ActionResponse<T> {
  name: string;
  value: T;
  args?: any[];
}
