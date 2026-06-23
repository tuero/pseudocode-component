export type {
  CSSResource,
  QuartzPluginData,
  QuartzTransformerPlugin,
  QuartzTransformerPluginInstance,
  StaticResources,
} from "@quartz-community/types";

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
