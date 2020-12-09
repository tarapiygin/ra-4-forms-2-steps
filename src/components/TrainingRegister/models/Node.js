import { nanoid } from 'nanoid'

export default class Node {
  constructor(date, distance) {
    this.id = nanoid();
    this.date = date;
    this.distance = Number.parseFloat(distance);
  }
}