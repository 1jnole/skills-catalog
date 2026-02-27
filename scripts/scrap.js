// scrape-react-v9-to-md.mjs
// Requiere: node >= 18 (fetch), npm i cheerio turndown
import fs from "node:fs/promises";
import path from "node:path";
import cheerio from "cheerio";
import TurndownService from "turndown";

const BASE = "https://react-v9.holt.courses";
const OUT_DIR = path.resolve("react-v9-lessons-md");

const td = new TurndownService({
    codeBlockStyle: "fenced",
    headingStyle: "atx",
});

// Ajuste: conservar code fences razonables
td.addRule("pre", {
    filter: ["pre"],
    replacement(content, node) {
        const code = node?.children?.[0]?.data ? node.children[0].data : node.textContent;
        return `\n\n\`\`\`\n${code?.trim() ?? ""}\n\`\`\`\n\n`;
    },
});

async function fetchHtml(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
    return res.text();
}

async function main() {
    await fs.mkdir(OUT_DIR, { recursive: true });

    // 1) Lee la home y saca los links del sidebar/TOC
    const homeHtml = await fetchHtml(`${BASE}/`);
    const $ = cheerio.load(homeHtml);

    // Selector simple: ajusta si cambia la estructura
    const links = [];
    $("a").each((_, a) => {
        const href = $(a).attr("href");
        if (!href) return;
        if (href.startsWith("/lessons/")) {
            links.push(new URL(href, BASE).toString());
        }
    });

    const unique = [...new Set(links)];

    // 2) Por cada lección: extraer el contenido principal y pasarlo a MD
    for (const url of unique) {
        const html = await fetchHtml(url);
        const $$ = cheerio.load(html);

        // Ajusta selector al contenedor real del contenido si lo necesitas
        const main = $$("main").first().html() ?? $$("body").html() ?? "";
        const md = td.turndown(main);

        // nombre de archivo por slug
        const slug = url.replace(`${BASE}/lessons/`, "").replaceAll("/", "__");
        const file = path.join(OUT_DIR, `${slug}.md`);
        await fs.writeFile(file, md, "utf8");
        console.log("Wrote", file);
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
