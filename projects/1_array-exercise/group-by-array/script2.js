console.log("script 2 loaded");
const arr = [
  { shape: "square", color: "red", used: 1, instances: 1 },
  { shape: "square", color: "red", used: 2, instances: 1 },
  { shape: "circle", color: "blue", used: 0, instances: 0 },
  { shape: "square", color: "blue", used: 4, instances: 4 },
  { shape: "circle", color: "red", used: 1, instances: 1 },
  { shape: "circle", color: "red", used: 1, instances: 0 },
  { shape: "square", color: "blue", used: 4, instances: 5 },
  { shape: "square", color: "red", used: 2, instances: 1 },
];

const result = [
  ...arr
    .reduce((r, o) => {
      const key = o.shape + "-" + o.color;

      const item =
        r.get(key) ||
        Object.assign({}, o, {
          used: 0,
          instances: 0,
        });

      item.used += o.used;
      item.instances += o.instances;

      return r.set(key, item);
    }, new Map())
    .values(),
];

console.log(result);
