/// <reference path="../node_modules/@quartz-community/types/globals.d.ts" />

declare module "*.scss" {
  const content: string;
  export default content;
}

declare module "*.inline.ts" {
  const content: string;
  export default content;
}

declare module "pseudocode" {
  export interface PseudocodeOptions {
    lineNumber?: boolean;
    lineNumberPunc?: string;
    noEnd?: boolean;
    scopeLines?: boolean;
    indentSize?: string;
    commentDelimiter?: string;
    captionCount?: number;
    titlePrefix?: string;
  }

  const pseudocode: {
    renderToString(input: string, options?: PseudocodeOptions): string;
  };

  export default pseudocode;
}

declare module "pseudocode/build/pseudocode.min.js" {
  export * from "pseudocode";
  import pseudocode from "pseudocode";
  export default pseudocode;
}
