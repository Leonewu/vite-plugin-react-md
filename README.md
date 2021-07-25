# vite-plugin-react-md

This plugins build for vite-react project and using markdown file like a react component.

## Usage

1. `npm install vite-plugin-react-md -D`
2. add it into vite config file

  ```js
  import md from 'vite-plugin-react-md'
  export default defineConfig({
    plugins: [
      md()
    ]
  })
  ```

3. now you can import markdown file as a react component

  ```js
  import { ReactComponent as Md, attributes } from 'your.md'
  // <Md />
  ```

## Frontmatter

Frontmatter will be parsed and expose in variable `attributes`  
for expample:

```md
---
file: index.md
---
```

will be expose in `attributes`

```js
import { attributes } from 'index.md'
console.log(attributes)
// { file: 'index.md' }
```

## Types

Typescript project need to declare types for *.md files

```ts
declare module '*.md' {
  const attributes: Record<string, unknown>; 
  import React from 'react'
  const ReactComponent: React.VFC;
  export { attributes, ReactComponent };
}
```

## Options

This plugin uses markdown-it internally.It's available to pass any markdown-it options with option `markdownIt`.  
for example:

```js
md({
  markdownIt: {
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="language-'+lang+'">' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</pre>';
        } catch (__) {}
      }
      return '';
    }
  }
})
```
