import { renderers } from './renderers.mjs';
import { manifest } from './manifest_h3oDAg1G.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_ZIvEvQwD.mjs');
const _page1 = () => import('./chunks/articles_jlX8NcXm.mjs');
const _page2 = () => import('./chunks/register_6h6oeVan.mjs');
const _page3 = () => import('./chunks/signin_pfvEWhqR.mjs');
const _page4 = () => import('./chunks/signout_QMsnDjFi.mjs');
const _page5 = () => import('./chunks/index_Twyf4M6B.mjs');
const _page6 = () => import('./chunks/create_RNcNcFfK.mjs');
const _page7 = () => import('./chunks/register_mK9FEhHz.mjs');
const _page8 = () => import('./chunks/signin_0_n8xrd3.mjs');
const _page9 = () => import('./chunks/update_wbcjeXtk.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.3.1_typescript@5.3.3/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/articles.json.ts", _page1],
    ["src/pages/api/auth/register.ts", _page2],
    ["src/pages/api/auth/signin.ts", _page3],
    ["src/pages/api/auth/signout.ts", _page4],
    ["src/pages/index.astro", _page5],
    ["src/pages/create.astro", _page6],
    ["src/pages/register.astro", _page7],
    ["src/pages/signin.astro", _page8],
    ["src/pages/update.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "098e474b-28f3-4f14-84f7-e933dca45f0d"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
