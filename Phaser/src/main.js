import Phaser from 'phaser';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: {
    preload,
    create,
    update
  }
};


let base;
let enemies;
let lastSpawn = 0;
let spawnInterval = 2000; // 怪物生成間隔（毫秒）

function preload() {}

function create() {
  // 玩家基地
  base = this.add.text(400, 300, '🏰', { fontSize: '48px' }).setOrigin(0.5);

  // 怪物群組
  enemies = this.physics.add.group();

  // 點擊消滅怪物
  this.input.on('pointerdown', (pointer) => {
    enemies.children.each((enemy) => {
      if (Phaser.Math.Distance.Between(pointer.x, pointer.y, enemy.x, enemy.y) < 40) {
        enemy.destroy();
      }
    });
  });
}

function update(time, delta) {
  // 每隔一段時間生成怪物
  if (time > lastSpawn + spawnInterval) {
    spawnEnemy(this);
    lastSpawn = time;
    // 怪物越來越多
    spawnInterval = Math.max(500, spawnInterval - 50);
  }

  // 怪物往基地移動
  enemies.children.each((enemy) => {
    this.physics.moveToObject(enemy, base, 50);
    if (Phaser.Math.Distance.Between(enemy.x, enemy.y, base.x, base.y) < 30) {
      enemy.destroy();
    }
  });
}

function spawnEnemy(scene) {
  const side = Phaser.Math.Between(0, 3);
  let x, y;

  if (side === 0) { x = 0; y = Phaser.Math.Between(0, 600); }
  if (side === 1) { x = 800; y = Phaser.Math.Between(0, 600); }
  if (side === 2) { x = Phaser.Math.Between(0, 800); y = 0; }
  if (side === 3) { x = Phaser.Math.Between(0, 800); y = 600; }

  const enemy = scene.add.text(x, y, '👾', { fontSize: '32px' });
  scene.physics.add.existing(enemy);
  enemies.add(enemy);
}

new Phaser.Game(config);
