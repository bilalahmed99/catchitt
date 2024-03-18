import Dexie, { Table } from 'dexie';
export class MySubClassedDexie extends Dexie {
  profile!: Table<any>;

  constructor() {
    super('myDatabase');
    this.version(1).stores({
      profile: '_id' // Primary key and indexed props
    });
  }
}

export const db = new MySubClassedDexie();
