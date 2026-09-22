/**
 * Regresión del bug de producción: un `NEXT_PUBLIC_SITE_URL` mal formado
 * (http:// en vez de https://, o con barra final) se colaba sin normalizar
 * en `siteConfig.url` y generaba URLs rotas en sitemap.xml, robots.txt,
 * canonical, og:image y los redirects /go/[partner] (doble barra al
 * concatenar con un href que ya empieza por "/").
 */
import { describe, expect, it } from "vitest";
import { normalizeSiteUrl } from "../site";

describe("normalizeSiteUrl", () => {
  it("fuerza https:// cuando la URL llega en http://", () => {
    expect(normalizeSiteUrl("http://fiscalit.es")).toBe("https://fiscalit.es");
  });

  it("retira la barra final para evitar dobles barras al concatenar un href", () => {
    expect(normalizeSiteUrl("https://fiscalit.es/")).toBe("https://fiscalit.es");
  });

  it("corrige a la vez http:// y barra final (el caso real detectado en producción)", () => {
    expect(normalizeSiteUrl("http://fiscalit.es/")).toBe("https://fiscalit.es");
  });

  it("retira múltiples barras finales", () => {
    expect(normalizeSiteUrl("https://fiscalit.es///")).toBe("https://fiscalit.es");
  });

  it("deja intacta una URL ya limpia", () => {
    expect(normalizeSiteUrl("https://fiscalit.es")).toBe("https://fiscalit.es");
  });

  it("no toca un https:// legítimo dentro del dominio (solo el prefijo del protocolo)", () => {
    expect(normalizeSiteUrl("https://fiscalit-git-main-asterisk-on.vercel.app")).toBe(
      "https://fiscalit-git-main-asterisk-on.vercel.app",
    );
  });
});
