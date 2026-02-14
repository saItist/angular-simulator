export class Collection<T> {
  items: T[] = [];
  constructor(data: T[]) {
    this.items = data;
  }
  getAll(): T[] {
    return this.items;
  }
  get(index: number): T {
    return this.items[index];
  }
  clear(): void {
    this.items = [];
  }
  remove(index: number): void {
    this.items.splice(index, 1);
  }
  replace(index: number, value: T): void {
    this.items[index] = value;
  }
}