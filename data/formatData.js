import { readFile, writeFile } from "fs/promises";

let data = await readFile("./data/gb_data_raw.json", "utf-8");
data = JSON.parse(data).entities;
const keys = Object.keys(data);

const fmt = {};
for (const entity of keys) {
  fmt[entity] = {};
  let levels = Object.keys(data[entity]).filter((e) => e !== "undefined" && e !== "NaN");
  if (Math.max(...levels.map((e) => Number(e))) === 201) levels = levels.filter((e) => e !== "201");
  for (const level of levels) {
    let effects = [];
    data[entity][level].map((e) => effects.push({ value: e.value, amount: e.amount ?? -1 }));
    fmt[entity][level] = effects;
  }
}
await writeFile("./data/gb_data.json", JSON.stringify(fmt), "utf-8");

// const tor = data["X_OceanicFuture_Landmark3"];
// const k = Object.keys(tor);
// for (const a of k) console.log(tor[a][1].value);
