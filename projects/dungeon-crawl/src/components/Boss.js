import Monster from './Monster';

export default class Boss extends Monster {
  constructor(...props) {
    super(...props);

    this.avatar = ['B', '#b63e11', '#97998d'];
  }
}
