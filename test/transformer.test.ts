import { describe, expect, it } from "vitest";
import type { Root } from "mdast";
import { Pseudocode } from "../src/transformer";
import { createCtx } from "./helpers";

describe("Pseudocode", () => {
  it("replaces pseudocode fences with rendered HTML", () => {
    const ctx = createCtx();
    const transformer = Pseudocode({ lineNumber: true });
    const plugins = transformer.markdownPlugins?.(ctx) ?? [];
    const plugin = plugins[0] as () => (tree: Root) => void;

    const tree: Root = {
      type: "root",
      children: [
        {
          type: "code",
          lang: "pseudo",
          value: "\\begin{algorithm}\n\\caption{Example}\n\\begin{algorithmic}\n\\STATE hello\n\\end{algorithmic}\n\\end{algorithm}",
        },
      ],
    };

    plugin()(tree);

    const htmlNode = tree.children[0];
    expect(htmlNode?.type).toBe("html");
    if (htmlNode?.type !== "html") {
      throw new Error("Expected html node");
    }

    expect(htmlNode.value).toContain("ps-root");
    expect(htmlNode.value).toContain("Example");
  });

  it("injects the pseudocode stylesheet and color fix", () => {
    const resources = Pseudocode().externalResources?.(createCtx());
    expect(resources?.css).toHaveLength(2);
    expect(resources?.css?.[0]?.content).toContain("pseudocode.min.css");
    expect(resources?.css?.[1]?.content).toContain("border-color: currentColor");
  });
});
