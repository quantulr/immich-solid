import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
import { fileURLToPath } from "node:url";
// import fd from "tailwindcss/nesting"
// import postcssNesting from 'postcss-nesting';

export default defineConfig({
    plugins: [solid()],
    server: {
        proxy: {
            "/api": {
                target: "http://photos.erazer.local",
                changeOrigin: true,
                // rewrite: (path) => path.replace(/^\/api/, "")
            }
        }
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
   /* css:{
        postcss: {
            plugins:[
                postcssNesting
            ]
        }
    }*/
})
