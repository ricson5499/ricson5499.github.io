const { Engine, Render, Runner, Bodies, Composite, Body, Events } = Matter;

const canvas = document.getElementById("game");

const engine = Engine.create();
engine.gravity.y = 1;

const render = Render.create({
    canvas,
    engine,
    options: { width: WIDTH, height: HEIGHT, wireframes: false, background: "#111" }
});

Render.run(render);
const runner = Runner.create();
Runner.run(runner, engine);

Composite.add(engine.world, [
    Bodies.rectangle(WIDTH / 2, HEIGHT + 20, WIDTH, 40, { isStatic: true }),
    Bodies.rectangle(-20, HEIGHT / 2, 40, HEIGHT, { isStatic: true }),
    Bodies.rectangle(WIDTH + 20, HEIGHT / 2, 40, HEIGHT, { isStatic: true })
]);

function spawnObject() {
    const size = 40 + Math.random() * 30;
    Composite.add(engine.world, Bodies.rectangle(
        Math.random() * WIDTH, -50, size, size,
        { restitution: 0.6, friction: 0.4, label: "office",
          render: { fillStyle: randomColor(), text: randomItem(officeItems) } }
    ));
}

let spawnInterval;
function startSpawning() {
    spawnInterval = setInterval(spawnObject, 900);
}
function stopSpawning() {
    clearInterval(spawnInterval);
}

function pauseGame() {
    runner.enabled = false;
    stopSpawning();
}

function resumeGame() {
    runner.enabled = true;
    startSpawning();
}

document.addEventListener("visibilitychange", () => {
    document.hidden ? pauseGame() : resumeGame();
});

startSpawning();

Events.on(render, "afterRender", () => {
    const ctx = render.context;
    const toRemove = [];

    Composite.allBodies(engine.world).forEach(body => {
        if (body.label !== "office") return;

        const { x, y } = body.position;
        const spd = Math.hypot(body.velocity.x, body.velocity.y);

        // 速度夠快且飛出畫面時破碎
        if (spd > 8 && (x < -60 || x > WIDTH + 60 || y > HEIGHT + 60)) {
            createShatter(x, y, body.render.fillStyle, body.render.text);
            toRemove.push(body);
            return;
        }

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(body.angle);
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#fff";
        ctx.fillText(body.render.text, 0, 5);
        ctx.restore();
    });

    toRemove.forEach(b => Composite.remove(engine.world, b));
});
