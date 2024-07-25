import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import type { ManifestOptions } from "vite-plugin-pwa";
import manifest from "./webmanifest.json";
import AstroPWA from "@vite-pwa/astro";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			credits: true,
			customCss: ['./src/styles/custom.css'],
			social: {
				github: 'https://github.com/sanabel-al-firdaws/Starlight-Pwa',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
			],
			components: {
				Head: './src/components/Head.astro',
				Search: './src/components/Search.astro',			}
		}),
		AstroPWA({
			workbox: {
			  skipWaiting: true,
			  clientsClaim: true,
			  navigateFallback: "/404",
			  ignoreURLParametersMatching: [/./],
			  globPatterns: ['**/*.{html,js,css,png,svg,json,ttf,pf_fragment,pf_index,pf_meta,pagefind,wasm}'],
			},
			 experimental: {
			  directoryAndTrailingSlashHandler: true,
			},
			mode: "production",
			registerType: 'autoUpdate',
			manifest: (manifest as Partial<ManifestOptions>)
		  }),
	],
});
