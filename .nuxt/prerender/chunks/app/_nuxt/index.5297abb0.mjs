import { _ as _export_sfc, a as __nuxt_component_0$2, b as __nuxt_component_1, c as __nuxt_component_2, d as __nuxt_component_3 } from '../server.mjs';
import { mergeProps, withCtx, createTextVNode, useSSRContext } from 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/vue/index.mjs';
import { ssrRenderAttrs, ssrRenderComponent } from 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/vue/server-renderer/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/ofetch/dist/node.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/hookable/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/unctx/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/ufo/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/h3/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/@unhead/vue/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/@unhead/dom/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/vue-router/dist/vue-router.node.mjs';
import '../../nitro/nitro-prerenderer.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/node-fetch-native/dist/polyfill.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/destr/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/unenv/runtime/fetch/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/scule/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/ohash/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/unstorage/dist/index.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/unstorage/dist/drivers/fs.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/defu/dist/defu.mjs';
import 'file:///home/neno/WebProjects/The%20Odin%20Project%20Projects/portfolio-TOP/node_modules/radix3/dist/index.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  const _component_About = __nuxt_component_1;
  const _component_Projects = __nuxt_component_2;
  const _component_Contact = __nuxt_component_3;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container" }, _attrs))} data-v-faf6003c><h1 class="pr-[50%] text-[2rem]" data-v-faf6003c>Hello, my name is</h1><h1 class="text-[2rem] pr-[40%]" data-v-faf6003c>Neno</h1><h1 class="w-[50%] pr-[] mb-[2000px]" data-v-faf6003c>I am a self thought programer studying Web Developement, Machine Learning and Deep Learning</h1><div class="main-header" data-v-faf6003c>`);
  _push(ssrRenderComponent(_component_NuxtLink, {
    to: "/projects",
    class: "font-bold hover:text-cyan-400 hover:underline"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Click me to go to Projects Page!`);
      } else {
        return [
          createTextVNode("Click me to go to Projects Page!")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
  _push(ssrRenderComponent(_component_About, null, null, _parent));
  _push(ssrRenderComponent(_component_Projects, null, null, _parent));
  _push(ssrRenderComponent(_component_Contact, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-faf6003c"]]);

export { index as default };
//# sourceMappingURL=index.5297abb0.mjs.map
