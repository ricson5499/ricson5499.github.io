import Player from '../entities/Player.js'
import Enemy from '../entities/Enemy.js'

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    this.load.image('floor', 'assets/floor.png')
    this.load.image('player', 'assets/player.png')
    this.load.image('enemy', 'assets/enemy.png')
  }

  create() {
    this.add.tileSprite(400, 300, 800, 600, 'floor')
    this.player = new Player(this, 400, 300)
    this.enemy = new Enemy(this, 200, 200)

    this.cameras.main.startFollow(this.player)
  }

  update(time, delta) {
    this.player.update()
    this.enemy.update(this.player)
  }
}
