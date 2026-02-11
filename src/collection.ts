export class Collection<T> {
  private items: T[] = [];

  constructor(initialItems: T[] = []) {
    this.items = [...initialItems];
  }
  // 1. Получить все элементы коллекции
  getAll(): T[] {
    return [...this.items]; 
  }
  // 2. Получить элемент по индексу
  getByIndex(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) {
      return undefined;
    }
    return this.items[index];
  }
  // 3. Очистить коллекцию
  clear(): void {
    this.items = [];
  }
  // 4. Удалить элемент по индексу
  removeByIndex(index: number): boolean {
    if (index < 0 || index >= this.items.length) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }
  // 5. Заменить элемент по индексу
  replaceAtIndex(index: number, newItem: T): boolean {
    if (index < 0 || index >= this.items.length) {
      return false;
    }
    this.items[index] = newItem;
    return true;
  }
  get size(): number {
    return this.items.length;
  }
  add(item: T): void {
    this.items.push(item);
  }
  addAll(...items: T[]): void {
    this.items.push(...items);
  }
  toString(): string {
    return `Collection(${this.items.length} элементов)`;
  }
}