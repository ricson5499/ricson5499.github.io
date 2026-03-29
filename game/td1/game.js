/**
 * Tower Defence Game Template
 * Principle: Maintainable & Class-based structure
 */

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let path;
let enemies;
let turrets;
let bullets;
let gold = 100;
let goldText;

function preload() {
    // Using placeholder graphics for demonstration
    this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullets/bullet1.png');
}

function create() {
    // 1. Create the path for enemies
    const graphics = this.add.graphics();
    graphics.lineStyle(2, 0xffff00, 1);
    
    path = new Phaser.Curves.Path(0, 300);
    path.lineTo(200, 300);
    path.lineTo(200, 100);
    path.lineTo(600, 100);
    path.lineTo(600, 500);
    path.lineTo(800, 500);

    path.draw(graphics);

    // 2. Groups
    enemies = this.physics.add.group();
    turrets = this.add.group();
    bullets = this.physics.add.group();

    // 3. UI
    goldText = this.add.text(10, 10, 'Gold: ' + gold, { fontSize: '24px', fill: '#fff' });

    // 4. Click to place turret (Template-based approach)
    this.input.on('pointerdown', (pointer) => {
        placeTurret(this, pointer.x, pointer.y);
    });

    // 5. Spawn enemies periodically
    this.time.addEvent({
        delay: 2000,
        callback: () => spawnEnemy(this),
        loop: true
    });

    // 6. Overlap detection
    this.physics.add.overlap(enemies, bullets, (enemy, bullet) => {
        bullet.destroy();
        enemy.hp -= 20;
        if (enemy.hp <= 0) {
            enemy.destroy();
            gold += 10;
            goldText.setText('Gold: ' + gold);
        }
    });
}

function update(time, delta) {
    // Turret AI: Rotate and Shoot
    turrets.getChildren().forEach(turret => {
        const target = getEnemyInRange(turret, 200);
        if (target && time > turret.nextFire) {
            fireBullet(this, turret, target);
            turret.nextFire = time + 1000; // Fire rate: 1s
        }
    });
}

// --- Helper Functions ---

/**
 * Revised Spawn Enemy Logic
 * Uses Physics Sprite with Path Follower integration
 */
function spawnEnemy(scene) {
    // 1. Create a basic physics sprite at the start of the path
    const startPoint = path.getStartPoint();
    const enemy = scene.physics.add.sprite(startPoint.x, startPoint.y, null);
    
    // 2. Draw a placeholder circle graphic and add it to the enemy
    const graphics = scene.add.circle(0, 0, 15, 0xff0000);
    enemy.setCircle(15); // Now it works because 'enemy' is a Physics Sprite
    
    // 3. Initialize properties
    enemy.hp = 50;
    
    // 4. Manual path following using a generic 'path' data object
    // Alternatively, use a tween for cleaner movement logic
    scene.tweens.add({
        targets: enemy,
        z: 1, // Dummy property to animate
        duration: 10000,
        onUpdate: (tween) => {
            const position = path.getPoint(tween.progress);
            enemy.setPosition(position.x, position.y);
        },
        onComplete: () => {
            if (enemy.active) enemy.destroy();
        }
    });

    enemies.add(enemy);
}

function placeTurret(scene, x, y) {
    if (gold >= 50) {
        const turret = scene.add.container(x, y);
        const base = scene.add.rectangle(0, 0, 40, 40, 0x00ff00);
        turret.add(base);
        turret.nextFire = 0;
        turrets.add(turret);
        
        gold -= 50;
        goldText.setText('Gold: ' + gold);
    }
}

function getEnemyInRange(turret, range) {
    const enemyList = enemies.getChildren();
    for (let i = 0; i < enemyList.length; i++) {
        const distance = Phaser.Math.Distance.Between(turret.x, turret.y, enemyList[i].x, enemyList[i].y);
        if (distance < range) return enemyList[i];
    }
    return null;
}

function fireBullet(scene, turret, enemy) {
    const bullet = scene.physics.add.sprite(turret.x, turret.y, 'bullet');
    bullets.add(bullet);
    scene.physics.moveToObject(bullet, enemy, 300);
}