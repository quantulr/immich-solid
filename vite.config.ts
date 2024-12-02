import {defineConfig} from 'vite'
import solid from 'vite-plugin-solid'
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
   /* css:{
        postcss: {
            plugins:[
                postcssNesting
            ]
        }
    }*/
})
