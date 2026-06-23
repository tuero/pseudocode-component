export { CSSResource, QuartzPluginData, QuartzTransformerPlugin, QuartzTransformerPluginInstance, StaticResources } from '@quartz-community/types';

interface PseudocodeOptions {
    lineNumber?: boolean;
    lineNumberPunc?: string;
    noEnd?: boolean;
    scopeLines?: boolean;
    indentSize?: string;
    commentDelimiter?: string;
    captionCount?: number;
    titlePrefix?: string;
}

export type { PseudocodeOptions };
