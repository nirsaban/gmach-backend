import { createClient } from "redis";
const fs = require("fs");

export class FileSystem<T> {
  private filePath: string;
  constructor(name: string) {
    this.filePath = `./${name}.json`;
  }

  write(key, value): T {
    let data = {};
    data[key] = value;

    let users = {};
    if (fs.existsSync(this.filePath)) {
      let rawData = fs.readFileSync(this.filePath);
      users = JSON.parse(rawData);
    }

    users[key] = value;
    fs.writeFileSync(this.filePath, JSON.stringify(users));
    return value as T;
  }

  get(key): T {
    let users = {};
    if (fs.existsSync(this.filePath)) {
      let rawData = fs.readFileSync(this.filePath);
      users = JSON.parse(rawData);
      return users[key] as T;
    }
    return users[key] as T;
  }

  delete(key) {
    let users = {};
    if (fs.existsSync(this.filePath)) {
      let rawData = fs.readFileSync(this.filePath);
      users = JSON.parse(rawData);
      delete users[key];
      fs.writeFileSync(this.filePath, JSON.stringify(users));
    }
  }

  getAll(): T[] {
    let users = {};
    if (fs.existsSync(this.filePath)) {
      let rawData = fs.readFileSync(this.filePath);
      users = JSON.parse(rawData);
      return Object.values(users) as T[];
    }
    return Object.values(users) as T[];
  }
}
