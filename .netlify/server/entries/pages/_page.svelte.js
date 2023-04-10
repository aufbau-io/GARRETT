import { c as create_ssr_component, b as subscribe, d as add_attribute } from "../../chunks/index2.js";
import { s as screenType } from "../../chunks/store.js";
const headshot_1 = "/_app/immutable/assets/1-a9ae5ef3.png";
const headshot_2 = "/_app/immutable/assets/2-5d6c16fb.png";
const headshot_3 = "/_app/immutable/assets/3-9d9b3e48.png";
const instagram = "/_app/immutable/assets/instagram-44b85837.svg";
const linkedin = "/_app/immutable/assets/linkedin-2687ac46.svg";
const mail = "/_app/immutable/assets/gmail-a537f5d8.svg";
const twitter = "/_app/immutable/assets/twitter-e5a4f4d9.svg";
const _page_svelte_svelte_type_style_lang = "";
const css = {
  code: "section.svelte-1awk1a3{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;min-width:500px;width:48vh}picture.svelte-1awk1a3{position:relative}picture.svelte-1awk1a3{background:var(--background);border:6px double var(--primary);margin-bottom:1.1rem}header.svelte-1awk1a3{align-items:center;color:var(--accent);display:flex;height:30px;justify-content:space-between;margin-bottom:.25rem;width:100%}.icons.svelte-1awk1a3{display:flex;gap:10px;justify-content:space-evenly}.icon.svelte-1awk1a3{cursor:pointer;height:24px;opacity:1;width:24px}.icon.svelte-1awk1a3:hover{opacity:.5}.headshot.svelte-1awk1a3{height:46vh;margin:auto;min-height:500px;min-width:500px;-o-object-fit:cover;object-fit:cover;-o-object-position:0 25%;object-position:0 25%;width:48vh}.entry.svelte-1awk1a3,.main.svelte-1awk1a3{align-items:center;display:flex;flex-direction:column;justify-content:center;line-height:0;min-width:120%;text-transform:uppercase}.main.svelte-1awk1a3{background:var(--primary);border:6px double var(--background);bottom:10%;color:var(--background);height:80px;left:50%;max-width:600px;padding:0 2px;position:absolute;transform:translate(-50%);width:66%;z-index:10}.entry.svelte-1awk1a3{animation:goBlack 2s linear 2s;animation-fill-mode:forwards;background:var(--background);border:6px double var(--primary);color:var(--primary);cursor:pointer;height:60px;margin-bottom:1.1rem;min-width:80%;opacity:0;transition:transform .1s ease,box-shadow .1s ease}h1.svelte-1awk1a3{color:var(--background);display:flex;font-size:28px;justify-content:space-around;letter-spacing:4px;width:100%;z-index:10}.entry.svelte-1awk1a3:hover{background:var(--primary)!important;border-color:var(--background)!important;color:var(--background)!important}.entry.svelte-1awk1a3:active{background:var(--background)!important;border:6px double var(--primary)!important;color:var(--primary)!important}h2.svelte-1awk1a3{color:inherit;font-family:untitled,sans-serif;font-size:16px;font-weight:600;letter-spacing:2px}@media(max-width:760px){section.svelte-1awk1a3{max-width:80vw;min-height:0;min-width:0}.icon.svelte-1awk1a3{height:20px;width:20px}h1.svelte-1awk1a3{font-size:5.5vw}h2.svelte-1awk1a3{font-size:14px}.main.svelte-1awk1a3{height:10vh}.entry.svelte-1awk1a3{height:8vh;margin-bottom:0;margin-top:2vh}header.svelte-1awk1a3{margin-bottom:.4vh}picture.svelte-1awk1a3{background:var(--background-50);height:calc(var(--vh, 1vh)*100);margin:0!important;max-height:80vw;max-width:80vw;min-width:none;padding:0!important;padding:calc(var(--margin)*1);width:calc(var(--vh, 1vh)*100)}.headshot.svelte-1awk1a3{max-height:calc(var(--vh, 1vh)*80 - 12px);min-height:0;min-width:0}}@media(max-width:500px) and (min-height:600px){.headshot.svelte-1awk1a3{max-height:calc(80vw - 12px)}}@media(max-width:350px){h1.svelte-1awk1a3{font-size:16px}h2.svelte-1awk1a3{font-size:10px}.icon.svelte-1awk1a3{height:16px;width:16px}}",
  map: null
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $screenType, $$unsubscribe_screenType;
  $$unsubscribe_screenType = subscribe(screenType, (value) => $screenType = value);
  let index = Math.floor(Math.random() * 3) + 1;
  $$result.css.add(css);
  $$unsubscribe_screenType();
  return `${$$result.head += `<!-- HEAD_svelte-10v5kki_START -->${$$result.title = `<title>Garrett “All Business” Musar</title>`, ""}<meta name="${"description"}" content="${"Freelance Copywriter. I have a degree from an accredited business school."}">${index == 1 ? `<link rel="${"preload"}"${add_attribute("href", headshot_1, 0)} as="${"image/png"}">` : `${index == 2 ? `<link rel="${"preload"}"${add_attribute("href", headshot_2, 0)} as="${"image/png"}">` : `${index == 3 ? `<link rel="${"preload"}"${add_attribute("href", headshot_3, 0)} as="${"image/png"}">` : ``}`}`}<link rel="${"preload"}" as="${"font"}" href="${"/fonts/test-financier-display-semibold.woff2"}" type="${"font/woff2"}" crossorigin="${"anonymous"}"><link rel="${"preload"}" as="${"font"}" href="${"/fonts/test-untitled-sans-regular.woff2"}" type="${"font/woff2"}" crossorigin="${"anonymous"}"><!-- HEAD_svelte-10v5kki_END -->`, ""}

<section class="${"svelte-1awk1a3"}">


		
		<header class="${"svelte-1awk1a3"}"><h2 class="${"svelte-1awk1a3"}">GARRETT MUSAR</h2>
			<div class="${"icons tmp svelte-1awk1a3"}"><a href="${"https://www.linkedin.com/in/garrettallbusinessmusar/"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", linkedin, 0)} alt="${"linkedin"}" class="${"icon svelte-1awk1a3"}"></a>
			<a href="${"mailto: garyxmustard@gmail.com"}"><img${add_attribute("src", mail, 0)} alt="${"mail"}" class="${"icon svelte-1awk1a3"}"></a>
			<a href="${"https://www.instagram.com/garymustard_fanclub/"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", instagram, 0)} alt="${"instagram"}" class="${"icon svelte-1awk1a3"}"></a>
			<a href="${"https://twitter.com/LL_Croix"}" target="${"_blank"}" rel="${"noreferrer"}"><img${add_attribute("src", twitter, 0)} alt="${"twitter"}" class="${"icon svelte-1awk1a3"}"></a></div></header>

	<picture class="${"svelte-1awk1a3"}"><div class="${"main svelte-1awk1a3"}"><h1 class="${"svelte-1awk1a3"}">${$screenType != 1 ? `<span>◎</span>` : ``}
				<span>Business In The Front</span>
				${$screenType != 1 ? `<span>◎</span>` : ``}</h1></div>
		
		${index == 1 ? `<img${add_attribute("src", headshot_1, 0)} alt="${"Headshot"}" class="${"headshot fade-a svelte-1awk1a3"}">` : `${index == 2 ? `<img${add_attribute("src", headshot_2, 0)} alt="${"Headshot"}" class="${"headshot fade-a svelte-1awk1a3"}">` : `${index == 3 ? `<img${add_attribute("src", headshot_3, 0)} alt="${"Headshot"}" class="${"headshot fade-a svelte-1awk1a3"}">` : ``}`}`}</picture>

	<div class="${"entry button fase-a svelte-1awk1a3"}"><h2 class="${"svelte-1awk1a3"}">COME ON BACK</h2></div>



</section>`;
});
export {
  Page as default
};
