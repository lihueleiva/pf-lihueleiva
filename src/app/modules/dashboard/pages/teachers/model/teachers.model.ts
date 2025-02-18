export class Teacher {
  id: string;
  name: string;

  constructor(data: Partial<Teacher> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
  }
}