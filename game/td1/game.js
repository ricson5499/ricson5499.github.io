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
        let type = "miniBoss";
        if (state.wave % 5 === 0) {
            type = 'bigBoss';
        } else if (state.wave % 10 === 0) {
            type = 'hellSmallBoss';
        }

        spawnEnemy(scene, type);
    });
}

/**
 * Fully stabilized Spawn logic
 */
function spawnEnemy(scene, type) {
    const startPoint = path.getStartPoint();
    
    // 建立 Container
    const enemyContainer = scene.add.container(startPoint.x, startPoint.y);
    
    // 1. 先設定屬性
    let baseHp = 50 + (state.wave * 20);
    let color = 0xffffff;
    let scale = 1;
    let reward = 10 + (state.wave * 1.5);

    switch (type) {
        case 'miniBoss':
            baseHp *= 5; color = 0xffaa00; scale = 1.5; reward = 50;
            break;
        case 'bigBoss':
            baseHp *= 10; color = 0xff0000; scale = 2.5; reward = 100;
            break;
        case 'hellSmallBoss':
            baseHp *= 50; color = 0x03fcba; scale = 0.5; reward = 500;
            break;
    }    

    enemyContainer.hp = baseHp;
    enemyContainer.reward = reward;
    enemyContainer.sceneRef = scene;

    // 2. 建立視覺 (圓形)
    const visual = scene.add.circle(0, 0, 15 * scale, color);
    enemyContainer.add(visual);

    // 3. 加入物理系統 (關鍵：先加入 Group，再設定 Body)
    enemies.add(enemyContainer); 
    scene.physics.add.existing(enemyContainer);
    
    // 設定碰撞範圍 (對齊中心)
    if (enemyContainer.body) {
        enemyContainer.body.setCircle(15 * scale, -15 * scale, -15 * scale);
    }

    // 4. 移動動畫
    scene.tweens.add({
        targets: enemyContainer,
        val: 1, // 虛擬屬性從 0 到 1
        duration: Math.max(2000, 10000 - (state.wave * 200)),
        onUpdate: (tween) => {
            const pos = path.getPoint(tween.progress);
            enemyContainer.setPosition(pos.x, pos.y);
        },
        onComplete: () => {
            if (enemyContainer.active) {
                enemyContainer.destroy();
                // 可以在這裡扣玩家血量
                state.enemiesLeft--;
                checkWaveEnd(scene);
            }
        }
    });
}

function handleBulletHit(enemy, bullet) {
    if (!enemy.active) return;
    bullet.destroy();
    enemy.hp -= bullet.damage || 20;
    if (enemy.hp <= 0) {
        state.gold += enemy.reward;
        state.score += enemy.reward;
        const scene = enemy.sceneRef;
        enemy.destroy();
        state.enemiesLeft--;
        checkWaveEnd(scene);
        updateUI();
    }
}

// --- Turret & Evolution Logic ---

function placeTurret(scene, x, y, type = 'basic') {
    const cost = (type === 'basic') ? 50 : 0; // 進化塔在選擇後是免費放置的
    if (state.gold < cost && type === 'basic') return;

    const turret = scene.add.container(x, y);
    let stats = { range: 200, fireRate: 1000, color: 0x00ff00, damage: 20 };

    if (type === 'machineGun') stats = { range: 400, fireRate: 120, color: 0x5555ff, damage: 10 };
    if (type === 'bow') stats = { range: 250, fireRate: 500, color: 0xffff00, damage: 45 };
    if (type === 'crossbow') stats = { range: 150, fireRate: 1200, color: 0xff00ff, damage: 160 };

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
    // 畫出一條明顯的灰線作為路徑參考
    const graphics = scene.add.graphics();
    graphics.lineStyle(4, 0x333333, 1);
    
    path = new Phaser.Curves.Path(0, 300);
    path.lineTo(800, 300);
    
    path.draw(graphics);
}

function updateUI() {
    ui.text.setText(`Wave: ${state.wave} | Gold: ${state.gold} | Score: ${state.score}`);
}

function checkWaveEnd(scene) {
    if (state.enemiesLeft <= 0 && state.isWaveActive) {
        state.isWaveActive = false;
        state.wave++;
        updateUI();
        scene.time.delayedCall(3000, () => startNextWave(scene));
    }
}

function getEnemyInRange(turret, range) {
    return enemies.getChildren().find(e => Phaser.Math.Distance.Between(turret.x, turret.y, e.x, e.y) < range);
}

function fireBullet(scene, turret, enemy) {
    const bullet = bullets.create(turret.x, turret.y, 'bullet');
    bullet.damage = turret.getData('damage');
    scene.physics.moveToObject(bullet, enemy, 400);
}