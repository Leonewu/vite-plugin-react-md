"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const front_matter_1 = __importDefault(require("front-matter"));
const esbuild = __importStar(require("esbuild"));
const markdown_it_1 = __importDefault(require("markdown-it"));
function transform(code, id, md) {
    if (!id.endsWith('.md')) {
        return;
    }
    const { body, attributes } = front_matter_1.default(code);
    const html = md.render(body);
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
  `;
    const result = esbuild.transformSync(content, { loader: 'jsx' });
    return {
        code: result.code,
        map: null
    };
}
const plugin = (options = {}) => {
    const config = Object.assign(Object.assign({}, options.markdownIt), { 
        // react need to use self close tag
        xhtmlOut: true });
    let md = markdown_it_1.default(config);
    return {
        name: 'vite-plugin-react-md',
        enforce: 'pre',
        transform(code, id) {
            return transform(code, id, md);
        },
    };
};
exports.default = plugin;
