/**
 * Tower Defence - Systematized Version
 * Principle: Template-based, maintainable generation
 */

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: { default: 'arcade' },
    scene: { preload: preload, create: create, update: update }
};

const game = new Phaser.Game(config);

// --- Global Game State ---
let state = {
    wave: 1,
    gold: 150,
    score: 0,
    enemiesLeft: 0,
    isWaveActive: false,
    evolutionReady: false
};

let ui = {};
let path, enemies, turrets, bullets;

function preload() {
    this.load.image('bullet', 'https://labs.phaser.io/assets/sprites/bullets/bullet1.png');
}

function create() {
    // 1. Setup Path & Groups
    setupMap(this);
    enemies = this.physics.add.group();
    turrets = this.add.group();
    bullets = this.physics.add.group();

    // 2. Setup UI
    ui.text = this.add.text(10, 10, '', { fontSize: '18px', fill: '#fff' });
    updateUI();

    // 3. Inputs
    this.input.on('pointerdown', (pointer) => {
        if (state.evolutionReady) return; // Prevent building during menu
        placeTurret(this, pointer.x, pointer.y);
    });

    // 4. Collision
    this.physics.add.overlap(enemies, bullets, handleBulletHit, null, this);

    // Start first wave
    startNextWave(this);
}

function update(time, delta) {
    // Turret AI
    turrets.getChildren().forEach(turret => {
        const target = getEnemyInRange(turret, turret.getData('range'));
        if (target && time > turret.getData('nextFire')) {
            fireBullet(this, turret, target);
            turret.setData('nextFire', time + turret.getData('fireRate'));
        }
    });

    // Check Evolution Trigger
    if (state.gold >= 500 && !state.evolutionReady) {
        showEvolutionMenu(this);
    }
}

// --- Core Systems ---

function startNextWave(scene) {
    state.isWaveActive = true;
    let spawnCount = 5 + Math.floor(state.wave / 2);
    state.enemiesLeft = spawnCount + 1; // +1 for the boss

    // Spawn Minions
    for (let i = 0; i < spawnCount; i++) {
        scene.time.delayedCall(i * 1000, () => spawnEnemy(scene, 'minion'));
    }

    // Spawn Boss after minions
    scene.time.delayedCall(spawnCount * 1000 + 500, () => {
        const type = (state.wave % 10 === 0) ? 'bigBoss' : 'miniBoss';
        spawnEnemy(scene, type);
    });
}

function spawnEnemy(scene, type) {
    const startPoint = path.getStartPoint();
    // 建立一個空的 Container 作為敵人物件
    const enemyContainer = scene.add.container(startPoint.x, startPoint.y);
    scene.physics.add.existing(enemyContainer); // 賦予物理屬性
    
    let baseHp = 50 + (state.wave * 10);
    let color = 0xffffff;
    let scale = 1;
    let reward = 10;

    if (type === 'miniBoss') {
        baseHp *= 5; color = 0xffaa00; scale = 1.5; reward = 50;
    } else if (type === 'bigBoss') {
        baseHp *= 20; color = 0xff0000; scale = 2.5; reward = 200;
    }

    // 建立視覺圖形並放入 Container
    const visual = scene.add.circle(0, 0, 15 * scale, color);
    enemyContainer.add(visual); 
    
    // 設定碰撞體大小 (配合縮放)
    enemyContainer.body.setCircle(15 * scale, -15 * scale, -15 * scale);
    
    enemyContainer.hp = baseHp;
    enemyContainer.reward = reward;
    
    scene.tweens.add({
        targets: enemyContainer,
        duration: 12000 - Math.min(state.wave * 100, 5000),
        onUpdate: (tween) => {
            const pos = path.getPoint(tween.progress);
            enemyContainer.setPosition(pos.x, pos.y);
        },
        onComplete: () => {
            if (enemyContainer.active) enemyContainer.destroy();
        }
    });
    enemies.add(enemyContainer);
}

function handleBulletHit(enemy, bullet) {
    bullet.destroy();
    enemy.hp -= bullet.damage || 20;
    if (enemy.hp <= 0) {
        state.gold += enemy.reward;
        state.score += enemy.reward;
        enemy.destroy();
        state.enemiesLeft--;
        checkWaveEnd(this);
        updateUI();
    }
}

// --- Turret & Evolution Logic ---

function placeTurret(scene, x, y, type = 'basic') {
    const cost = (type === 'basic') ? 50 : 0; // 進化塔在選擇後是免費放置的
    if (state.gold < cost && type === 'basic') return;

    const turret = scene.add.container(x, y);
    let stats = { range: 200, fireRate: 1000, color: 0x00ff00, damage: 20 };

    if (type === 'machineGun') stats = { range: 400, fireRate: 150, color: 0x5555ff, damage: 10 };
    if (type === 'bow') stats = { range: 250, fireRate: 600, color: 0xffff00, damage: 45 };
    if (type === 'crossbow') stats = { range: 150, fireRate: 1500, color: 0xff00ff, damage: 150 };

    // 建立視覺矩形並放入 Container
    const rect = scene.add.rectangle(0, 0, 30, 30, stats.color);
    turret.add(rect); 
    
    turret.setData({ ...stats, nextFire: 0 });
    turrets.add(turret);

    if (type === 'basic') state.gold -= cost;
    updateUI();
}

function showEvolutionMenu(scene) {
    state.evolutionReady = true;
    scene.scene.pause(); // Simple pause logic

    const overlay = document.createElement('div');
    overlay.style = "position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); background:rgba(0,0,0,0.8); padding:20px; color:white; text-align:center; border:2px solid gold;";
    overlay.innerHTML = `
        <h3>神秘進化選擇！</h3>
        <p>花費 500 金幣升級一座全新的強力炮塔</p>
        <button onclick="evolve('machineGun')">機關槍 (快/遠)</button>
        <button onclick="evolve('bow')">弓箭 (強/中)</button>
        <button onclick="evolve('crossbow')">弩 (極強/近)</button>
    `;
    document.body.appendChild(overlay);

    window.evolve = (type) => {
        state.gold -= 500;
        state.evolutionReady = false;
        document.body.removeChild(overlay);
        scene.scene.resume();
        // Next click will place this special turret for free (as a reward)
        const listener = scene.input.once('pointerdown', (p) => {
            placeTurret(scene, p.x, p.y, type);
        });
    };
}

// --- Helpers ---

function setupMap(scene) {
    const g = scene.add.graphics().lineStyle(2, 0x444444);
    path = new Phaser.Curves.Path(0, 300).lineTo(800, 300); // Simple straight path
    path.draw(g);
}

function updateUI() {
    ui.text.setText(`Wave: ${state.wave} | Gold: ${state.gold} | Score: ${state.score}`);
}

function checkWaveEnd(scene) {
    if (state.enemiesLeft <= 0) {
        state.wave++;
        updateUI();
        scene.time.delayedCall(3000, () => startNextWave(scene));
    }
}

function getEnemyInRange(turret, range) {
    return enemies.getChildren().find(e => Phaser.Math.Distance.Between(turret.x, turret.y, e.x, e.y) < range);
}

function fireBullet(scene, turret, enemy) {
    const bullet = scene.physics.add.sprite(turret.x, turret.y, 'bullet');
    bullet.damage = turret.getData('damage');
    scene.physics.moveToObject(bullet, enemy, 400);
}