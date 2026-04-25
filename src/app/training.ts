interface IUser {
  id: number;
  name: string;
  email: string;
  age: number;
  avatarUrl?: string;
}
interface IAdmin extends IUser {
  role: 'admin';
  permissions: string[];
  lastLoginAt?: Date;
}

type Status = 'loading' | 'success' | 'error';
type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

let status: Status = 'loading';
let textFormat: TextFormat = 'uppercase';
const users: IUser[] = [
  {
    id: 1,
    name: 'Иван',
    email: 'ivan@mail.ru',
    age: 25,
    avatarUrl: 'ivan.png',
  },
  {
    id: 2,
    name: 'Анна',
    email: 'anna@mail.ru',
    age: 17,
  },
  {
    id: 3,
    name: 'Пётр',
    email: 'petr@mail.ru',
    age: 30,
    avatarUrl: 'petr.png',
  },
];

export function sum(a: number, b: number): number {
  return a + b;
}

export function formatText(text: string, format: TextFormat): string {
  switch (format) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'capitalize':
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
    default:
      return text;
  }
}

export function filterUsersOlderThan18(users: IUser[]): IUser[] {
  return users.filter((user: IUser) => user.age >= 18);
}

export function removeChar(text: string, char: string): string {
  return text.replaceAll(char, '');
}