var _a, _b;
import { reactive, getCurrentInstance, toRef, isRef, inject, defineComponent, computed, ref, h, resolveComponent, version, nextTick, shallowRef, useSSRContext, mergeProps, withCtx, createTextVNode, unref, defineAsyncComponent, provide, onErrorCaptured, createApp } from "vue";
import { $fetch } from "ofetch";
import { useRuntimeConfig as useRuntimeConfig$1 } from "#internal/nitro";
import { createHooks } from "hookable";
import { getContext, executeAsync } from "unctx";
import "destr";
import { hasProtocol, parseURL, joinURL, isEqual } from "ufo";
import { createError as createError$1, sendRedirect } from "h3";
import { createHead as createHead$1, useHead } from "@unhead/vue";
import { renderDOMHead, debouncedRenderDOMHead } from "@unhead/dom";
import { createMemoryHistory, createRouter } from "vue-router";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderSuspense } from "vue/server-renderer";
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    static: {
      data: {}
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a2;
      if (prop === "public") {
        return target.public;
      }
      return (_a2 = target[prop]) != null ? _a2 : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useRouter = () => {
  var _a2;
  return (_a2 = useNuxtApp()) == null ? void 0 : _a2.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal = hasProtocol(toPath, true);
  if (isExternal && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      const el = void 0;
      return () => {
        var _a2, _b2, _c;
        if (!isExternal.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b2 = (_a2 = router.resolve(to.value)) == null ? void 0 : _a2.href) != null ? _b2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
function isObject(value) {
  return value !== null && typeof value === "object";
}
function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === void 0) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isObject(value) && isObject(object[key])) {
      object[key] = _defu(value, object[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => arguments_.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defuFn = createDefu((object, key, currentValue, _namespace) => {
  if (typeof object[key] !== "undefined" && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});
const inlineConfig = {};
defuFn(inlineConfig);
const main = "";
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
function createHead(initHeadObject) {
  const unhead = createHead$1();
  const legacyHead = {
    unhead,
    install(app) {
      if (app.config.globalProperties)
        app.config.globalProperties.$head = unhead;
      app.provide("usehead", unhead);
    },
    resolveTags() {
      return unhead.resolveTags();
    },
    headEntries() {
      return unhead.headEntries();
    },
    headTags() {
      return unhead.resolveTags();
    },
    push(input, options) {
      return unhead.push(input, options);
    },
    addEntry(input, options) {
      return unhead.push(input, options);
    },
    addHeadObjs(input, options) {
      return unhead.push(input, options);
    },
    addReactiveEntry(input, options) {
      const api = useHead(input, options);
      if (typeof api !== "undefined")
        return api.dispose;
      return () => {
      };
    },
    removeHeadObjs() {
    },
    updateDOM(document2, force) {
      if (force)
        renderDOMHead(unhead, { document: document2 });
      else
        debouncedRenderDOMHead(unhead, { delayFn: (fn) => setTimeout(() => fn(), 50), document: document2 });
    },
    internalHooks: unhead.hooks,
    hooks: {
      "before:dom": [],
      "resolved:tags": [],
      "resolved:entries": []
    }
  };
  unhead.addHeadObjs = legacyHead.addHeadObjs;
  unhead.updateDOM = legacyHead.updateDOM;
  unhead.hooks.hook("dom:beforeRender", (ctx) => {
    for (const hook of legacyHead.hooks["before:dom"]) {
      if (hook() === false)
        ctx.shouldRender = false;
    }
  });
  if (initHeadObject)
    legacyHead.addHeadObjs(initHeadObject);
  return legacyHead;
}
version.startsWith("2.");
const appHead = { "meta": [{ "name": "viewport", "content": "width=device-width, initial-scale=1" }, { "charset": "utf-8" }], "link": [], "style": [], "script": [], "noscript": [] };
const appPageTransition = false;
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  head.push(appHead);
  nuxtApp.vueApp.use(head);
  nuxtApp._useHead = useHead;
  {
    nuxtApp.ssrContext.renderMeta = async () => {
      const { renderSSRHead } = await import("@unhead/ssr");
      const meta = await renderSSRHead(head.unhead);
      return {
        ...meta,
        bodyScriptsPrepend: meta.bodyTagsOpen,
        bodyScripts: meta.bodyTags
      };
    };
  }
});
const __nuxt_page_meta = {};
const _routes = [
  {
    name: (_a = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.name) != null ? _a : "index",
    path: (_b = __nuxt_page_meta == null ? void 0 : __nuxt_page_meta.path) != null ? _b : "/",
    file: "/home/neno/WebProjects/The Odin Project Projects/portfolio-TOP/pages/index.vue",
    children: [],
    meta: __nuxt_page_meta,
    alias: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.alias) || [],
    redirect: (__nuxt_page_meta == null ? void 0 : __nuxt_page_meta.redirect) || void 0,
    component: () => import("./_nuxt/index.c6fb7fdd.js").then((m) => m.default || m)
  }
];
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    let position = savedPosition || void 0;
    if (!position && from && to && to.meta.scrollToTop !== false && _isDifferentRoute(from, to)) {
      position = { left: 0, top: 0 };
    }
    if (to.path === from.path) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
      }
    }
    const hasTransition = (route) => {
      var _a2;
      return !!((_a2 = route.meta.pageTransition) != null ? _a2 : appPageTransition);
    };
    const hookToWait = hasTransition(from) && hasTransition(to) ? "page:transition:finish" : "page:finish";
    return new Promise((resolve) => {
      nuxtApp.hooks.hookOnce(hookToWait, async () => {
        await nextTick();
        if (to.hash) {
          position = { el: to.hash, top: _getHashElementScrollMarginTop(to.hash) };
        }
        resolve(position);
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = document.querySelector(selector);
    if (elem) {
      return parseFloat(getComputedStyle(elem).scrollMarginTop);
    }
  } catch {
  }
  return 0;
}
function _isDifferentRoute(a, b) {
  const samePageComponent = a.matched[0] === b.matched[0];
  if (!samePageComponent) {
    return true;
  }
  if (samePageComponent && JSON.stringify(a.params) !== JSON.stringify(b.params)) {
    return true;
  }
  return false;
}
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = defineNuxtRouteMiddleware(async (to) => {
  var _a2;
  let __temp, __restore;
  if (!((_a2 = to.meta) == null ? void 0 : _a2.validate)) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (typeof result === "boolean") {
    return result;
  }
  return createError(result);
});
const globalMiddleware = [
  validate
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a2, _b2, _c, _d;
  let __temp, __restore;
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b2 = (_a2 = routerOptions.history) == null ? void 0 : _a2.call(routerOptions, routerBase)) != null ? _b2 : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a3, _b3, _c2, _d2;
    if (((_b3 = (_a3 = to.matched[0]) == null ? void 0 : _a3.components) == null ? void 0 : _b3.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a3, _b3;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a3 = initialLayout.value) != null ? _a3 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b3 = namedMiddleware[entry2]) == null ? void 0 : _b3.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusCode: 404,
            statusMessage: `Page Not Found: ${initialURL}`
          });
          await callWithNuxt(nuxtApp, showError, [error2]);
          return false;
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB
];
const home_vue_vue_type_style_index_0_scoped_392b83e6_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = {};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "home-container h-[700px] mt-[7rem]" }, _attrs))} data-v-392b83e6><h1 class="pr-[50%] text-[2rem]" data-v-392b83e6>Hello, my name is</h1><h1 class="text-[2rem] pr-[40%]" data-v-392b83e6>Neno</h1><h1 class="w-[50%] pr-[]" data-v-392b83e6> I am a self thought programer studying Web Developement, Machine Learning and Deep Learning </h1><img${ssrRenderAttr("src", "")} alt="" data-v-392b83e6><div class="nuxt-link" data-v-392b83e6>`);
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
  _push(`</div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/home.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-392b83e6"]]);
const _imports_0$1 = "" + globalThis.__buildAssetsURL("profile_image.5219ffc5.jpg");
const _imports_1 = "" + globalThis.__buildAssetsURL("JavaScript_logo.92876df0.png");
const _imports_2 = "" + globalThis.__buildAssetsURL("python-icon.8858ab35.svg");
const _imports_3 = "" + globalThis.__buildAssetsURL("c-plusplus.df7d0036.svg");
const _imports_4 = "" + globalThis.__buildAssetsURL("git-icon.d59a2cfd.svg");
const _imports_5 = "" + globalThis.__buildAssetsURL("react.5e92e61d.svg");
const _imports_6 = "" + globalThis.__buildAssetsURL("Vue_Logo.4a9505c3.png");
const _imports_7 = "" + globalThis.__buildAssetsURL("nuxt-icon.00f382d3.svg");
const _imports_8 = "" + globalThis.__buildAssetsURL("tailwindcss-icon.da161fa0.svg");
const _imports_9 = "" + globalThis.__buildAssetsURL("tensorflow.ebcf9091.svg");
const _imports_10 = "" + globalThis.__buildAssetsURL("keras.febfda4d.svg");
const _imports_11 = "" + globalThis.__buildAssetsURL("pytorch-icon.d0c2ba82.svg");
const _imports_12 = "" + globalThis.__buildAssetsURL("Fast.ai.f604df0d.png");
const about_vue_vue_type_style_index_0_scoped_f137d6a0_lang = "";
const _sfc_main$6 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "about-container" }, _attrs))} data-v-f137d6a0><h2 class="about-header" data-v-f137d6a0>About Neno</h2><div class="about-info" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_0$1)} class="profile-image" data-v-f137d6a0><p class="profile-desc" data-v-f137d6a0> I dabble in programming mostly as to keep the deterioration of my brain at bay from not doing anything with myself, only staying in my room every day, all day, rotting my brain with hate, anger, pity, rage, fear, porn, loneliness, sadness, neglect. </p></div><div class="about-tools-holder" data-v-f137d6a0><div class="about-tools-header" data-v-f137d6a0>Some technologies I have worked with</div><div class="about-tools" data-v-f137d6a0><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>JavaScript</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_1)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Python</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_2)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>C++</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_3)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Git</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_4)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>React</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_5)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Vue</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_6)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Nuxt</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_7)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Tailwind</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_8)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Tensorflow</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_9)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Keras</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_10)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Pytorch</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_11)} alt="" data-v-f137d6a0></div></div><div class="about-tool-holder" data-v-f137d6a0><div data-v-f137d6a0>Fast.ai</div><div class="about-tool-image" data-v-f137d6a0><img${ssrRenderAttr("src", _imports_12)} alt="" data-v-f137d6a0></div></div></div></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/about.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-f137d6a0"]]);
const memoryGame = {
  title: "Memory Game",
  titleClass: "memory-game",
  desc: "A memory based game where the goal is to click every unique image once. Clicking the same image twice will reset the game score and the game will reset. Clicking every unique image in succesion will result in a Win!",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    },
    {
      tool: "React",
      image: "React-logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/memory-card-OdinProject/",
  image: "Memory Game 1080p.png"
};
const ecommerceStore = {
  title: "Small E-commerce Store",
  titleClass: "e-commerce-store",
  desc: "A small fan based shop of a popular video game. The website features multiple products and categories, along with sizes, colors, quantity and reviews for each product. The website also has a cart feature with a checkout functionality, along with some smaller features.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    },
    {
      tool: "React",
      image: "React-logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/shopping-cart-OdinProject/#/",
  image: "ecomerce_frontpage.png"
};
const battleshipsGame = {
  title: "Battleships Game",
  titleClass: "battleships-game",
  desc: "The classic Battleship Game where the victory objective is to sink your enemy ships before they sink yours, while taking turns to take your shots. Rotate and place your own ships on the board and keep firing until you discover hidden enemy ships and sink them all.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/battleship-TheOdinProject/",
  image: "battleship_game.png"
};
const imageTaggingGame = {
  title: "Image Tagging Game",
  titleClass: "image-tagging-game",
  desc: "A game where the goal is to find the right given characters in an image filled with various characters. Find them as fast as possible and submit your sore to the global leaderboards.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    },
    {
      tool: "React",
      image: "React-logo.png"
    },
    {
      tool: "Firebase",
      image: "firebase-logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/find-me-image-tagging-game/",
  image: "imagetagging_game.png"
};
const cvMaker = {
  title: "CV Maker",
  titleClass: "cv-maker",
  desc: "Custom CV Maker where you can add your work experience, education, skills, photo ect. After filling your CV export it in a pdf file or print it.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    },
    {
      tool: "React",
      image: "React-logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/cv-project-TheOdinProject/",
  image: "CV_maker.png"
};
const ticTacToeGame = {
  title: "Tic-Tac-Toe Game",
  titleClass: "tic-tac-toe-game",
  desc: "A basic Tic-Tac-Toe game. Align three of your markers first and win the game.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    }
  ],
  webLink: "https://nenopr.github.io/tic-tac-toe-project-The-Odin-Project/",
  image: "tictactoe_game.png"
};
const responsiveWebsite = {
  title: "Responsive Website",
  titleClass: "responsive-website",
  desc: "A website with a responsive design, marketing disenfection robots. Accessing /user in the url bar leads to a small demo of the dummyapi, listing all the available users with diffrent UI designs and gives user details in dynamic routes for pages.",
  tools: [
    {
      tool: "HTML",
      image: "html-5-logo.png"
    },
    {
      tool: "CSS",
      image: "CSS3_logo.png"
    },
    {
      tool: "JavaScript",
      image: "JavaScript_logo.png"
    },
    {
      tool: "Vue",
      image: "Vue_Logo.png"
    },
    {
      tool: "Nuxt3",
      image: "nuxt3-logo.png"
    }
  ],
  webLink: "https://lloyds-verdas-frontend-assigment.vercel.app/en",
  image: "lloyds-verdas.png"
};
const projects = {
  memoryGame,
  ecommerceStore,
  battleshipsGame,
  imageTaggingGame,
  cvMaker,
  ticTacToeGame,
  responsiveWebsite
};
const projectInfo_vue_vue_type_style_index_0_scoped_a2f50ca2_lang = "";
const _sfc_main$5 = {
  __name: "projectInfo",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(`<!--[--><div class="${ssrRenderClass([project.titleClass, "project-holder"])}" data-v-a2f50ca2><div class="project-details-name" data-v-a2f50ca2>${ssrInterpolate(project.title)}</div><div class="project-details-holder" data-v-a2f50ca2><div class="project-info-holder" data-v-a2f50ca2><div class="font-bold text-xl" data-v-a2f50ca2>Description:</div><p class="project-details-description" data-v-a2f50ca2>${ssrInterpolate(project.desc)}</p></div><div class="project-tools-holder" data-v-a2f50ca2><p class="project-details-tool-header" data-v-a2f50ca2>Tools Used</p><div class="project-details-tools-holder" data-v-a2f50ca2><!--[-->`);
        ssrRenderList(project.tools, (item) => {
          _push(`<div class="project-details-tool" data-v-a2f50ca2><div class="project-details-tool-name" data-v-a2f50ca2>${ssrInterpolate(item.tool)}</div><div class="project-details-logo" data-v-a2f50ca2><img${ssrRenderAttr("src", `/_nuxt/assets/images/${item.image}`)}${ssrRenderAttr("alt", item.tool)} data-v-a2f50ca2></div></div>`);
        });
        _push(`<!--]--></div></div></div><a${ssrRenderAttr("href", `${project.webLink}`)} target="_blank" rel="noreferrer noopener" class="tryit-link" data-v-a2f50ca2>Try it Out</a><div class="project-images-slider-container" data-v-a2f50ca2><div class="project-images-left" data-v-a2f50ca2>&lt;</div><div class="project-images-holder" data-v-a2f50ca2><img${ssrRenderAttr("src", "_nuxt/assets/images/" + project.image)} class="project-details-image" alt="" data-v-a2f50ca2><img${ssrRenderAttr("src", "_nuxt/assets/images/" + project.image)} class="project-details-image" alt="" data-v-a2f50ca2></div><div class="project-images-right" data-v-a2f50ca2>&gt;</div></div></div><div class="separator" data-v-a2f50ca2></div><!--]-->`);
      });
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects/projectInfo.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-a2f50ca2"]]);
const projects_vue_vue_type_style_index_0_scoped_cd6e6df6_lang = "";
const _sfc_main$4 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_ProjectsProjectInfo = __nuxt_component_0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "projects-container" }, _attrs))} data-v-cd6e6df6><h1 class="header-projects font-bold text-xl" data-v-cd6e6df6> Some Personal Projects I worked on! </h1><div class="separator" data-v-cd6e6df6></div><div class="projects-list pt-4 pb-4" data-v-cd6e6df6>`);
  _push(ssrRenderComponent(_component_ProjectsProjectInfo, null, null, _parent));
  _push(`</div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/projects.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-cd6e6df6"]]);
const _imports_0 = "" + globalThis.__buildAssetsURL("contact_phone_green.76e2cc02.jpg");
const contact_vue_vue_type_style_index_0_scoped_d0765153_lang = "";
const _sfc_main$3 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "contact-container m-[2rem]" }, _attrs))} data-v-d0765153><h2 class="m-[2rem] text-lg font-bold" data-v-d0765153>Contact me</h2><p class="m-[1rem]" data-v-d0765153>Please do not hesitate to contact me if you would like to work with me!</p><div data-v-d0765153>Feel free to contact me at this email:</div><p data-v-d0765153>nenadpredan@gmail.com</p><img${ssrRenderAttr("src", _imports_0)} alt="" data-v-d0765153></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/contact.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-d0765153"]]);
const footer_vue_vue_type_style_index_0_scoped_4afac9d6_lang = "";
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer-container" }, _attrs))} data-v-4afac9d6><h1 class="" data-v-4afac9d6>Footer</h1><div data-v-4afac9d6>Sources from FreePik By:</div><a href="https://www.freepik.com/free-vector/sphere-explosion-background_18454078.htm#page=2&amp;query=geometric&amp;position=4&amp;from_view=keyword" data-v-4afac9d6>GarryKillian</a><a href="https://www.freepik.com/free-vector/abstract-3d-design-elements-collection-vector_18717379.htm#page=2&amp;query=geometric&amp;position=6&amp;from_view=keyword" data-v-4afac9d6>rawpixel.com</a><a href="https://www.freepik.com/free-vector/background-line-abstract-gradient-colorful-style_33780726.htm#page=5&amp;query=geometric&amp;position=12&amp;from_view=keyword" data-v-4afac9d6>AndreaCharlesta</a><a href="https://www.freepik.com/free-vector/phone-surrounded-by-messages-isometric-style_5453890.htm#query=contact&amp;position=42&amp;from_view=search&amp;track=sph" data-v-4afac9d6>pikisuperstar</a><a href="https://www.freepik.com/free-vector/new-message-concept-illustration_6183564.htm#query=mail&amp;position=28&amp;from_view=search&amp;track=sph" data-v-4afac9d6>storyset</a></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4afac9d6"]]);
const app_vue_vue_type_style_index_0_lang = "";
const _sfc_main$1 = {
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Home = __nuxt_component_0$1;
      const _component_About = __nuxt_component_1;
      const _component_Projects = __nuxt_component_2;
      const _component_Contact = __nuxt_component_3;
      const _component_Footer = __nuxt_component_4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-container" }, _attrs))}><nav class="top-header"><div class="top-header-nav"><h2 class="header title-header">Hi, I&#39;m Neno</h2><h2 class="header-space-fill"></h2><h2 class="header home">Home</h2><h2 class="header about">About Neno</h2><h2 class="header projects projects-hover"> Projects </h2><h2 class="header contact">Contact</h2></div><div class="top-header-projects-selection"><!--[-->`);
      ssrRenderList(unref(projects), (project) => {
        _push(`<div class="${ssrRenderClass([project.titleClass + "-header", "projects-selection-project"])}">${ssrInterpolate(project.title)}</div>`);
      });
      _push(`<!--]--></div></nav>`);
      _push(ssrRenderComponent(_component_Home, null, null, _parent));
      _push(ssrRenderComponent(_component_About, null, null, _parent));
      _push(ssrRenderComponent(_component_Projects, null, null, _parent));
      _push(ssrRenderComponent(_component_Contact, null, null, _parent));
      _push(ssrRenderComponent(_component_Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import("./_nuxt/error-component.dbb3772d.js").then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$1), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
export {
  _export_sfc as _,
  __nuxt_component_0$2 as a,
  __nuxt_component_1 as b,
  __nuxt_component_2 as c,
  __nuxt_component_3 as d,
  entry$1 as default,
  useNuxtApp as u
};
//# sourceMappingURL=server.mjs.map
