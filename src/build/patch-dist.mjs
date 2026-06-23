import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distPath = path.resolve(__dirname, "../../dist/index.js");

let source = await fs.readFile(distPath, "utf8");

const replacements = [
  [/(?<!var )\battrVal = style\[attrName\];/g, "var attrVal = style[attrName];"],
  [
    /if \(typeof katex === "undefined"\)\s+(?<!var )([A-Za-z_$][A-Za-z0-9_$]*) = require_katex\(\);/g,
    'var katex;\n        if (typeof katex === "undefined")\n          katex = require_katex();',
  ],
  [
    /if \(typeof (MathJax\d*) === "undefined"\)\s+(?<!var )\1 = require_node_main\(\);/g,
    'var $1;\n        if (typeof $1 === "undefined")\n          $1 = require_node_main();',
  ],
  [/(?<!var )\bifCond = node\.children\[0\];/g, "var ifCond = node.children[0];"],
  [/(?<!var )\buponCond = node\.children\[0\];/g, "var uponCond = node.children[0];"],
  [
    /"version": parseInt\((MathJax\d*)\.version\.split\("\."\)\[0\]\),/g,
    '"version": parseInt((typeof $1.version === "string" ? $1.version : "0").split(".")[0]),',
  ],
];

for (const [from, to] of replacements) {
  source = source.replaceAll(from, to);
}

await fs.writeFile(distPath, source);
