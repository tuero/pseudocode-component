import type { Code, Root } from "mdast";
import pseudocode from "pseudocode";
import { visit } from "unist-util-visit";
import type { QuartzTransformerPlugin } from "@quartz-community/types";
import type { PseudocodeOptions } from "./types";

interface PseudocodeNode {
  index: number;
  parent: Root;
  value: string;
}

export const Pseudocode: QuartzTransformerPlugin<PseudocodeOptions> = (opts) => {
  return {
    name: "Pseudocode",
    markdownPlugins() {
      return [
        () => (tree: Root) => {
          const nodes: PseudocodeNode[] = [];

          visit(tree, "code", (node: Code, index, parent) => {
            if ((node.lang === "pseudo" || node.lang === "pseudocode") && index !== undefined && parent) {
              nodes.push({
                index,
                parent: parent as Root,
                value: node.value,
              });
            }
          });

          for (const { index, parent, value } of nodes) {
            try {
              parent.children.splice(index, 1, {
                type: "html",
                value: pseudocode.renderToString(value, opts),
              });
            } catch (error) {
              console.warn(`[pseudocode] skipping block: ${error}`);
            }
          }
        },
      ];
    },
    externalResources() {
      return {
        css: [
          { content: "https://cdn.jsdelivr.net/npm/pseudocode@2.4.1/build/pseudocode.min.css" },
          {
            content:
              ".ps-root .ps-algorithm { border-color: currentColor; } .ps-root .ps-algorithm.with-caption > .ps-line:first-child { border-color: currentColor; }",
            inline: true,
          },
        ],
        js: [],
        additionalHead: [],
      };
    },
  };
};
