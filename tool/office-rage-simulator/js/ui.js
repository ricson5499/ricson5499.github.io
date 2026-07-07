function updateUI(destroyed, combo, stress) {
    document.getElementById("destroyed").innerText = destroyed;
    document.getElementById("combo").innerText = combo;
    document.getElementById("stress").innerText = stress;
}

function showMessage() {
    const el = document.getElementById("message");
    el.innerText = randomItem(rageMessages);
    el.style.opacity = 1;
    setTimeout(() => el.style.opacity = 0, 700);
}

function createShatter(x, y, color, text) {
    const overlay = document.createElement("canvas");
    overlay.width = WIDTH;
    overlay.height = HEIGHT;
    Object.assign(overlay.style, {
        position: "fixed", top: 0, left: 0,
        pointerEvents: "none", zIndex: 25
    });
    document.body.appendChild(overlay);
    const ctx = overlay.getContext("2d");

    const count = 8;
    const pieces = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.5;
        const speed = 4 + Math.random() * 5;
        return {
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2,
            rot: Math.random() * Math.PI * 2,
            rotV: (Math.random() - 0.5) * 0.3,
            size: 12 + Math.random() * 14,
            alpha: 1
        };
    });

    let frame;
    function draw() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
        let alive = false;
        pieces.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.4;
            p.rot += p.rotV;
            p.alpha -= 0.035;
            if (p.alpha <= 0) return;
            alive = true;
            ctx.save();
            ctx.globalAlpha = p.alpha;
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot);
            ctx.fillStyle = color;
            ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            ctx.font = `${p.size}px Arial`;
            ctx.textAlign = "center";
            ctx.fillStyle = "#fff";
            ctx.fillText(text, 0, p.size / 3);
            ctx.restore();
        });
        if (alive) frame = requestAnimationFrame(draw);
        else { cancelAnimationFrame(frame); overlay.remove(); }
    }
    draw();
}

function createExplosion(x, y) {
    const circle = document.createElement("div");
    Object.assign(circle.style, {
        position: "fixed", left: x + "px", top: y + "px",
        width: "20px", height: "20px",
        border: "5px solid white", borderRadius: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 30, transition: "all .35s"
    });
    document.body.appendChild(circle);
    requestAnimationFrame(() => {
        circle.style.width = "250px";
        circle.style.height = "250px";
        circle.style.opacity = 0;
    });
    setTimeout(() => circle.remove(), 400);
}
