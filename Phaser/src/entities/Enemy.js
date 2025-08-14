export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.speed = 100
  }

  update(player) {
    this.scene.physics.moveToObject(this, player, this.speed)
  }
}
