const ROT = window.ROT;

export default class Monster {
  constructor(x, y, stage, game) {
    this.x = x;
    this.y = y;
    this.hp = Math.round(ROT.RNG.getNormal(stage * 10, 5));
    this.xp = Math.round(ROT.RNG.getNormal(stage * 10, 5));
    this.avatar = ['M', 'rgb(185, 3, 3)', '#97998d'];
    this.game = game;
  }

  draw() {
    this.game.display.draw(this.x, this.y, ...this.avatar);
  }

  fightPlayer() {
    let dmg = Math.round(ROT.RNG.getNormal(this.game.state.stage + 10, 3));

    this.game.player.stats.health -= dmg;
    console.log(this.game.player.stats.health);
    if(this.game.player.stats.hp <= 0) {
      this.game.player.stats.hp = 'DEAD';
    }
    this.game.updatePlayer(this.game.player);

  }
}
