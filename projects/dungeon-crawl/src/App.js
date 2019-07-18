import React, { Component } from 'react';

import Player from './components/Player';
import Monster from './components/Monster';
import Boss from './components/Boss';

import './App.sass';

const ROT = window.ROT;
class App extends Component {

  constructor() {
    super();

    this.display = new ROT.Display({width: 80, height: 30, fontSize: 18, bg: '#4f4e4e'});

    this.map = {};
    this.player = null;
    this.engine = null;

    this.monsters = {};
    this.health = {};
    this.stairs = {};
    this.weapon = {};

    this.state = {
      player: {
        health: 100,
        xp: 0,
        level: 1,
        weapon: {
          name: 'Knife',
          damage: 10
        }
      },
      stage: 1,
      message: 'Find the boss and kill him.'
    }
  }

  flashMessage(msg) {
    this.setState({message: msg});
    setTimeout(() => this.setState({message: 'Find the boss and kill him.'}), 5000);
  }

  handleKeydown(e) {
    this.player.move(e.key);
  }

  generateMap() {
    if(this.map) {
      this.map = {};
    }

    let digger = new ROT.Map.Rogue();
    let freeCells = [];

    let digCallback = (x, y, value) => {
      if(value) {return;}

      let key = x + "," + y;
      freeCells.push(key);
      this.map[key] = [' ', '', '#97998d'];
    }

    digger.create(digCallback.bind(this));

    this.generateHealth(freeCells);
    this.generateWeapon(freeCells);

    this.monsters = {};
    if(this.state.stage === 4) {
      this.generateBoss(freeCells);
    } else {
      this.generateMonsters(freeCells);
      this.generateStairs(freeCells);
    }

    //first put the map together
    // this.drawWholeMap();

    //then place the player on the map
    if(!this.player) {
      this.createPlayer(freeCells);
    } else {
      console.log('place player')
      this.placePlayer(this.player, freeCells);
    }
  }

  generateHealth(freeCells) {
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      let key = freeCells.splice(index, 1)[0];

      this.map[key] = ['*', '#073b14', '#97998d'];
    }
  }

  generateWeapon(freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    this.map[key] = ['W', '#001db6', '#97998d'];
  }

  generateMonsters(freeCells) {

    for(let i = 0; i < this.state.stage + 5; i++) {
      let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
      let key = freeCells.splice(index, 1)[0];

      let parts = key.split(',');

      let monster = new Monster(+parts[0], +parts[1], this.state.stage, this);

      this.monsters[key] = monster;
      this.map[key] = monster.avatar;
    }
  }

  generateBoss(freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    let parts = key.split(',');

    let boss = new Boss(+parts[0], +parts[1], this.state.stage, this);

    this.monsters[key] = boss;

    this.map[key] = boss.avatar;
  }

  generateStairs(freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    this.map[key] = ['S', '#4c276e', '#97998d'];
  }

  createPlayer(freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    let parts = key.split(",");
    let x = parseInt(parts[0], 10);
    let y = parseInt(parts[1], 10);

    this.player = new Player(x, y, this);
  }

  placePlayer(player, freeCells) {
    let index = Math.floor(ROT.RNG.getUniform() * freeCells.length);
    let key = freeCells.splice(index, 1)[0];
    let parts = key.split(',');

    this.player.x = parseInt(parts[0], 10);
    this.player.y = parseInt(parts[1], 10);

    this.player.draw();
  }

  drawWholeMap() {
    for(let key in this.map) {
      if(this.map.hasOwnProperty(key)) {
        let parts = key.split(",");
        let x = +parts[0];
        let y = +parts[1];
        let currentMap = this.map[key];
        this.display.draw(x, y, ...currentMap);
      }
    }
  }

  updatePlayer(player) {
    this.setState({
      player: {
        level: player.stats.level,
        weapon: player.stats.weapon,
        health: player.stats.health,
        xp: player.stats.xp
      }
    })
  }

  nextStage() {
    this.setState({stage: this.state.stage + 1});
    this.display.clear();
    this.generateMap();
  }

  restartGame() {
    this.player = null;

    this.setState({
      player: {
        health: 100,
        xp: 0,
        level: 1,
        weapon: {
          name: 'Knife',
          damage: 10
        }
      },
      stage: 1
    });

    this.display.clear();
    this.generateMap();
  }

  bossDefeated() {
    this.setState({message: 'You have defeated the boss!'});
    this.restartGame();
  }

  componentWillMount() {
    document.body.appendChild(this.display.getContainer());

    this.generateMap();

    let scheduler = new ROT.Scheduler.Simple();
    scheduler.add(this.player, true);
    this.engine = new ROT.Engine(scheduler);
    this.engine.start();
  }

  render() {
    return (
      <div className="game-info">
        <h1>DungeonCrawl</h1>

        <h3>{this.state.message}</h3>
        <ul>
          <li>Player Level: {this.state.player.level}</li>
          <li>Player Health: {this.state.player.health}</li>
          <li>Current Weapon: {this.state.player.weapon.name}</li>
          <li>Experience: {this.state.player.xp}</li>
          <li>Stage: {this.state.stage}</li>
        </ul>

      </div>
    );
  }
}

export default App;
