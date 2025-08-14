export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.speed = 200
    this.cursors = scene.input.keyboard.createCursorKeys()
  }

  update() {
    const { left, right, up, down } = this.cursors
    this.setVelocity(0)

    if (left.isDown) this.setVelocityX(-this.speed)
    else if (right.isDown) this.setVelocityX(this.speed)

    if (up.isDown) this.setVelocityY(-this.speed)
    else if (down.isDown) this.setVelocityY(this.speed)
  }
}
