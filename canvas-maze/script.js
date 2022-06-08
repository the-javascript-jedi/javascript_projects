console.log("script loaded");
const { Engine, Render, Runner, World, Bodies, MouseConstraint, Mouse } =
  Matter;

const engine = Engine.create();
const { world } = engine;

const render = Render.create({
  // element to generate matter object in html
  element: document.body,
  engine: engine,
  options: {
    width: 800,
    height: 600,
  },
});

Render.run(render);
Runner.run(Runner.create(), engine);
// for mouse dragg and drop
World.add(
  world,
  MouseConstraint.create(engine, {
    mouse: Mouse.create(render.canvas),
  })
);
// Add Shape
const shape = Bodies.rectangle(200, 200, 50, 50, {
  // dont want shape to move so shape will stay in same place
  isStatic: true,
});
// add shape to world object
World.add(world, shape);
// Walls
const walls = [
  // top wall
  Bodies.rectangle(400, 0, 800, 40, { isStatic: true }),
  // bottom wall
  Bodies.rectangle(400, 600, 800, 40, { isStatic: true }),
  // left wall
  Bodies.rectangle(0, 300, 40, 600, { isStatic: true }),
  // right wall,
  Bodies.rectangle(800, 300, 40, 600, { isStatic: true }),
];

World.add(world, walls);
// random rectangle
World.add(world, Bodies.rectangle(200, 200, 50, 50));
