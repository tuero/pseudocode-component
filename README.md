# Pseudocode

Quartz v5 transformer plugin that renders `pseudo` and `pseudocode` code blocks using the `pseudocode` library.

## Install

```bash
npx quartz plugin add github:tuero/pseudocode-component
```

## Usage

Add it to `quartz.config.yaml`:

```yaml
plugins:
  - source: github:tuero/pseudocode-component
    enabled: true
    options:
      lineNumber: true
      noEnd: false
```

## Options

| Option | Type |
| --- | --- |
| `lineNumber` | `boolean` |
| `lineNumberPunc` | `string` |
| `noEnd` | `boolean` |
| `scopeLines` | `boolean` |
| `indentSize` | `string` |
| `commentDelimiter` | `string` |
| `captionCount` | `number` |
| `titlePrefix` | `string` |

The plugin also injects the upstream pseudocode stylesheet plus a small border-color override so rendered algorithms inherit the current Quartz theme colors correctly.
