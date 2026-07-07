let destroyed = 0;
let combo = 0;
let stress = 100;

canvas.addEventListener("pointerdown", event => {
    const rect = canvas.getBoundingClientRect();
    explode(event.clientX - rect.left, event.clientY - rect.top);
});

function explode(x, y) {
    const radius = 180;
    let hit = 0;

    Composite.allBodies(engine.world).forEach(body => {
        if (body.label !== "office") return;
        const dx = body.position.x - x;
        const dy = body.position.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < radius) {
            const power = (radius - distance) / radius;
            Body.applyForce(body, body.position, {
                x: dx * power * 0.05,
                y: dy * power * 0.05 - 0.008
            });
            hit++;
        }
    });

    if (hit > 0) {
        destroyed += hit;
        combo++;
        stress = Math.max(0, stress - hit);
        showMessage();
        createExplosion(x, y);
    } else {
        combo = 0;
    }

    updateUI(destroyed, combo, stress);
}
