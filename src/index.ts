import Frontmatter from 'front-matter'
import type { Plugin, TransformResult } from 'vite'
import * as esbuild from 'esbuild'
import MarkdownIt from 'markdown-it'
import type MarkdownItType from 'markdown-it'

export interface ViteReactMDOptions {
  /** markdownIt instance or config */
  markdownIt?: MarkdownItType.Options
}

function transform(code: string ,id: string, md: MarkdownItType): TransformResult {
  if (!id.endsWith('.md')) {
    return
  }
  const { body, attributes } = Frontmatter(code)
  const html = md.render(body)
  const content = `
  import React from "react"
  const attributes = ${JSON.stringify(attributes)}
  const __html = \`${html.replace(/`/g, '&#96;')}\`
  function ReactComponent(props) {
    return <div className="markdown" dangerouslySetInnerHTML={{__html}} />
  }
  export {
    attributes,
    ReactComponent
  }
  `
  const result = esbuild.transformSync(content, { loader: 'jsx' })
  return {
    code: result.code,
    map: null
  }
}

const plugin = (options: ViteReactMDOptions = {}): Plugin => {
  const config: MarkdownItType.Options = {
    ...options.markdownIt,
    // react need to use self close tag
    xhtmlOut: true
  }
  let md = MarkdownIt(config)
  return {
    name: 'vite-plugin-react-md',
    enforce: 'pre',
    transform (code, id) {
      return transform(code, id, md)
    },
  }
}

export default plugin