import gfm from "@bytemd/plugin-gfm";
import gemoji from "@bytemd/plugin-gemoji";
import breaks from "@bytemd/plugin-breaks";
import highlightSsr from "@bytemd/plugin-highlight-ssr";
import mermaid from "@bytemd/plugin-mermaid";
import gfmLocale from "@bytemd/plugin-gfm/locales/pt_BR.json";
import mermaidLocale from "@bytemd/plugin-mermaid/locales/pt_BR.json";

export const bytemdPlugins = [
  gfm({ locale: gfmLocale }),
  gemoji(),
  breaks(),
  highlightSsr(),
  mermaid({ locale: mermaidLocale }),
];
