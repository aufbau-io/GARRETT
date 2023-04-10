import { c as create_ssr_component, b as subscribe } from "../../chunks/index2.js";
import { s as screenType } from "../../chunks/store.js";
import "lil-gui";
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
const css = {
  code: ".app.svelte-1s1xsd2{align-items:center;display:flex;justify-content:center;width:100%;width:100vw}.app.svelte-1s1xsd2,.webgl.svelte-1s1xsd2{height:100%;height:calc(var(--vh, 1vh)*100);overflow:hidden}.webgl.svelte-1s1xsd2{position:absolute;width:100%;z-index:-10}main.svelte-1s1xsd2{align-items:center;box-sizing:border-box;display:flex;flex:1;height:100%;justify-content:center;margin:0 auto;width:100%}",
  map: null
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $screenType, $$unsubscribe_screenType;
  $$unsubscribe_screenType = subscribe(screenType, (value) => $screenType = value);
  $$result.css.add(css);
  $$unsubscribe_screenType();
  return `<canvas class="${"webgl svelte-1s1xsd2"}"></canvas>

<div class="${"app svelte-1s1xsd2"}">${$screenType ? `

	<main class="${"svelte-1s1xsd2"}">${slots.default ? slots.default({}) : ``}</main>

	` : ``}
</div>`;
});
export {
  Layout as default
};
