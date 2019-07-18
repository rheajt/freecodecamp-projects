const ROT = window.ROT;

export default class Player {

  constructor(x, y, game) {

    this.WEAPONS = [
      {name: 'Knife', damage: 10},
      {name: 'Dagger', damage: 20},
      {name: 'Sword', damage: 30},
      {name: 'Broadsword', damage: 50},
      {name: 'Master Sword', damage: 80}
    ];

    this.x = x;
    this.y = y;

    this.fov = new ROT.FOV.PreciseShadowcasting((x, y) => {
      var key = x+","+y;
      if (key in this.game.map) {
        return true;
      }
      return false;
    });

    this.game = game;

    this.playerSymbol = ['@', '#ff0', '#97998d'];

    this.stats = {
      health: 100,
      xp: 0,
      level: 1,
      weapon: this.WEAPONS[0]
    };

    this.draw();
  }

  draw() {
    this.game.display.draw(this.x, this.y, ...this.playerSymbol);
    this.fov.compute(this.x, this.y, 3, (x, y, r, visibility) => {
      let key = x + ',' + y;

      let ch;
      if(key in this.game.monsters) {
        ch = this.game.monsters[key].avatar;
      }

      if(key in this.game.map) {
        ch = [this.game.map[key][0] || ' ', this.game.map[key][1], '#97998d'];
      }

      let fovCh = r ? (ch || ['', '', '#4f4e4e']) : ['@', '#ff0', '#97998d'];
      this.game.display.draw(x, y, ...fovCh);
    });
  }

  act() {
    this.game.engine.lock();

    window.addEventListener('keydown', this)
  }

  getHealth(newKey) {
    this.stats.health += 20;
    this.game.map[newKey][0] = ' ';
    this.game.updatePlayer(this);
  }

  getWeapon(newKey) {
    this.stats.weapon = this.WEAPONS[this.game.state.stage];

    //flash message
    this.game.flashMessage('You got the ' + this.stats.weapon.name);
    this.game.map[newKey][0] = '';
    this.game.updatePlayer(this);
  }

  fightMonster(newKey) {
    let playerAtk = Math.round(ROT.RNG.getNormal(this.stats.weapon.damage, 2));

    this.game.monsters[newKey].hp -= playerAtk;
    console.log(this.game.monsters[newKey].hp);
    if(this.game.monsters[newKey].hp <= 0) {
      //MONSTER KILLED
      this.game.player.stats.xp += this.game.monsters[newKey].xp;

      //flash message
      this.game.flashMessage('You killed a monster.');

      //increase level
      this.levelUp(this.game.player.stats);
      this.game.updatePlayer(this.game.player);

      this.game.map[newKey][0] = ' ';

      //remove monster from the monster array
      delete this.game.monsters[newKey];
    } else {
      this.game.monsters[newKey].fightPlayer();
      this.die();
    }
  }

  fightBoss(newKey) {
    console.log('boss fight');
    let boss = this.game.monsters[newKey];
    let playerAtk = Math.round(ROT.RNG.getNormal(this.stats.weapon.damage, 2));

    boss.hp -= playerAtk;

    if( boss.hp <= 0) {
      //boss killed
      this.game.flashMessage('YOU HAVE KILLED THE BOSS');
      this.game.bossDefeated();
    } else {
      boss.fightPlayer();
      this.die();
    }
  }

  die() {
    if(this.game.state.player.health <= 0) {

      this.game.flashMessage('You have died');

      this.game.restartGame();
    }

  }

  levelUp(current) {
    if(current.xp / (current.level * 100) >= 1) {
      this.game.player.stats.level++;
      this.game.updatePlayer(this.game.player);
    }
  }

  nextStage() {
    this.game.nextStage();
  }

  handleEvent(e) {
    let keyMap = {
      37: 3,
      38: 0,
      39: 1,
      40: 2
    };

    let code = e.keyCode;

    if(!(code in keyMap)) {return;}

    let diff = ROT.DIRS[4][keyMap[code]];

    let newX = this.x + diff[0];
    let newY = this.y + diff[1];
    let newKey = newX + ',' + newY;

    if(!(newKey in this.game.map)) {return;}
    else if(this.game.map[newKey][0] === '*') {this.getHealth(newKey);}
    else if(this.game.map[newKey][0] === 'W') {this.getWeapon(newKey);}
    else if(this.game.map[newKey][0] === 'S') {this.nextStage();}
    else if(this.game.map[newKey][0] === 'M') {this.fightMonster(newKey);}
    else if(this.game.map[newKey][0] === 'B') {this.fightBoss(newKey);}

    if(this.game.map[newKey][0] !== 'M') {
      this.game.display.draw(this.x, this.y, ...this.game.map[this.x + ',' + this.y]);
      this.x = newX;
      this.y = newY;
      this.draw();
    }


    window.removeEventListener('keydown', this);
    this.game.engine.unlock();
  }
}
