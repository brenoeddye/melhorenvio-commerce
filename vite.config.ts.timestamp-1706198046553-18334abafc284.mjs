// vite.config.ts
import { defineConfig } from "file:///C:/Users/breno/OneDrive/Documentos/Development/melhorenvio-commerce/node_modules/vite/dist/node/index.js";
import vue from "file:///C:/Users/breno/OneDrive/Documentos/Development/melhorenvio-commerce/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import { resolve } from "path";
import Unimport from "file:///C:/Users/breno/OneDrive/Documentos/Development/melhorenvio-commerce/node_modules/unimport/dist/unplugin.mjs";
import Components from "file:///C:/Users/breno/OneDrive/Documentos/Development/melhorenvio-commerce/node_modules/unplugin-vue-components/dist/vite.mjs";
var WORKING_DIR = process.cwd();
var SASS_PATH = resolve(WORKING_DIR, "src", "assets", "scss").replace(
  /\\/g,
  "/"
);
var SASS_AUTO_IMPORT = `@use "sass:color";
@use "sass:math";
@import "${SASS_PATH}/variables";
@import "${SASS_PATH}/themes";
@import "${SASS_PATH}/reset";
@import "${SASS_PATH}/mixins";`;
var vite_config_default = defineConfig({
  plugins: [
    Unimport.vite({
      presets: ["vue", "pinia"],
      dirs: [
        "./src/composables/*",
        "./src/components/*",
        "./src/core/*",
        "./src/store/*",
        "./src/utils/*"
      ],
      addons: {
        vueTemplate: true
      },
      dts: resolve(WORKING_DIR, "src", "imports.d.ts")
    }),
    Components({
      dts: resolve(WORKING_DIR, "src", "components.d.ts"),
      dirs: ["./src/components"],
      deep: true,
      directoryAsNamespace: true
    }),
    vue()
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: SASS_AUTO_IMPORT,
        sassOptions: {
          precision: 8,
          outputStyle: "compressed",
          sourceComments: false,
          includePaths: [SASS_PATH],
          quietDeps: true
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": resolve(WORKING_DIR, "src")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxicmVub1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudG9zXFxcXERldmVsb3BtZW50XFxcXG1lbGhvcmVudmlvLWNvbW1lcmNlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxicmVub1xcXFxPbmVEcml2ZVxcXFxEb2N1bWVudG9zXFxcXERldmVsb3BtZW50XFxcXG1lbGhvcmVudmlvLWNvbW1lcmNlXFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9icmVuby9PbmVEcml2ZS9Eb2N1bWVudG9zL0RldmVsb3BtZW50L21lbGhvcmVudmlvLWNvbW1lcmNlL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZmlsZVVSTFRvUGF0aCwgVVJMIH0gZnJvbSAnbm9kZTp1cmwnXG5cbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJztcbmltcG9ydCBVbmltcG9ydCBmcm9tICd1bmltcG9ydC91bnBsdWdpbic7XG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJztcblxuLyoqXG4gKiBDdXJyZW50IHdvcmtpbmcgZGlyZWN0b3J5LCBhbHdheXMgcmVsYXRpdmUgdG8gd2hlcmUgdGhlIHNjcmlwdCBpcyBydW4uXG4gKi9cbmNvbnN0IFdPUktJTkdfRElSID0gcHJvY2Vzcy5jd2QoKTtcblxuY29uc3QgU0FTU19QQVRIID0gcmVzb2x2ZShXT1JLSU5HX0RJUiwgJ3NyYycsICdhc3NldHMnLCAnc2NzcycpLnJlcGxhY2UoXG4gIC9cXFxcL2csXG4gICcvJ1xuKTtcblxuY29uc3QgU0FTU19BVVRPX0lNUE9SVCA9IGBAdXNlIFwic2Fzczpjb2xvclwiO1xuQHVzZSBcInNhc3M6bWF0aFwiO1xuQGltcG9ydCBcIiR7U0FTU19QQVRIfS92YXJpYWJsZXNcIjtcbkBpbXBvcnQgXCIke1NBU1NfUEFUSH0vdGhlbWVzXCI7XG5AaW1wb3J0IFwiJHtTQVNTX1BBVEh9L3Jlc2V0XCI7XG5AaW1wb3J0IFwiJHtTQVNTX1BBVEh9L21peGluc1wiO2A7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgVW5pbXBvcnQudml0ZSh7XG4gICAgICBwcmVzZXRzOiBbJ3Z1ZScsICdwaW5pYSddLFxuICAgICAgZGlyczogW1xuICAgICAgICAnLi9zcmMvY29tcG9zYWJsZXMvKicsXG4gICAgICAgICcuL3NyYy9jb21wb25lbnRzLyonLFxuICAgICAgICAnLi9zcmMvY29yZS8qJyxcbiAgICAgICAgJy4vc3JjL3N0b3JlLyonLFxuICAgICAgICAnLi9zcmMvdXRpbHMvKicsXG4gICAgICBdLFxuICAgICAgYWRkb25zOiB7XG4gICAgICAgIHZ1ZVRlbXBsYXRlOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGR0czogcmVzb2x2ZShXT1JLSU5HX0RJUiwgJ3NyYycsICdpbXBvcnRzLmQudHMnKSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIGR0czogcmVzb2x2ZShXT1JLSU5HX0RJUiwgJ3NyYycsICdjb21wb25lbnRzLmQudHMnKSxcbiAgICAgIGRpcnM6IFsnLi9zcmMvY29tcG9uZW50cyddLFxuICAgICAgZGVlcDogdHJ1ZSxcbiAgICAgIGRpcmVjdG9yeUFzTmFtZXNwYWNlOiB0cnVlLFxuICAgIH0pLFxuICAgIHZ1ZSgpLFxuICBdLFxuICBjc3M6IHtcbiAgICBwcmVwcm9jZXNzb3JPcHRpb25zOiB7XG4gICAgICBzY3NzOiB7XG4gICAgICAgIGFkZGl0aW9uYWxEYXRhOiBTQVNTX0FVVE9fSU1QT1JULFxuICAgICAgICBzYXNzT3B0aW9uczoge1xuICAgICAgICAgIHByZWNpc2lvbjogOCxcbiAgICAgICAgICBvdXRwdXRTdHlsZTogJ2NvbXByZXNzZWQnLFxuICAgICAgICAgIHNvdXJjZUNvbW1lbnRzOiBmYWxzZSxcbiAgICAgICAgICBpbmNsdWRlUGF0aHM6IFtTQVNTX1BBVEhdLFxuICAgICAgICAgIHF1aWV0RGVwczogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHJlc29sdmUoV09SS0lOR19ESVIsICdzcmMnKSxcbiAgICB9LFxuICB9LFxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBRUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLFNBQVMsZUFBZTtBQUN4QixPQUFPLGNBQWM7QUFDckIsT0FBTyxnQkFBZ0I7QUFLdkIsSUFBTSxjQUFjLFFBQVEsSUFBSTtBQUVoQyxJQUFNLFlBQVksUUFBUSxhQUFhLE9BQU8sVUFBVSxNQUFNLEVBQUU7QUFBQSxFQUM5RDtBQUFBLEVBQ0E7QUFDRjtBQUVBLElBQU0sbUJBQW1CO0FBQUE7QUFBQSxXQUVkLFNBQVM7QUFBQSxXQUNULFNBQVM7QUFBQSxXQUNULFNBQVM7QUFBQSxXQUNULFNBQVM7QUFHcEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsU0FBUyxLQUFLO0FBQUEsTUFDWixTQUFTLENBQUMsT0FBTyxPQUFPO0FBQUEsTUFDeEIsTUFBTTtBQUFBLFFBQ0o7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsUUFBUTtBQUFBLFFBQ04sYUFBYTtBQUFBLE1BQ2Y7QUFBQSxNQUNBLEtBQUssUUFBUSxhQUFhLE9BQU8sY0FBYztBQUFBLElBQ2pELENBQUM7QUFBQSxJQUNELFdBQVc7QUFBQSxNQUNULEtBQUssUUFBUSxhQUFhLE9BQU8saUJBQWlCO0FBQUEsTUFDbEQsTUFBTSxDQUFDLGtCQUFrQjtBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLHNCQUFzQjtBQUFBLElBQ3hCLENBQUM7QUFBQSxJQUNELElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxxQkFBcUI7QUFBQSxNQUNuQixNQUFNO0FBQUEsUUFDSixnQkFBZ0I7QUFBQSxRQUNoQixhQUFhO0FBQUEsVUFDWCxXQUFXO0FBQUEsVUFDWCxhQUFhO0FBQUEsVUFDYixnQkFBZ0I7QUFBQSxVQUNoQixjQUFjLENBQUMsU0FBUztBQUFBLFVBQ3hCLFdBQVc7QUFBQSxRQUNiO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsYUFBYSxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
