import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
    main: {
        plugins: [externalizeDepsPlugin()]
    },
    preload: {
        plugins: [externalizeDepsPlugin()]
    },
    renderer: {
        resolve: {
            alias: {
                '@renderer': resolve('src/renderer/src')
            }
        },
        plugins: [react(), svgr({
            include: '**/*.svg?react',
        })],
        css: {
            modules: {
                localsConvention: 'camelCase',
                generateScopedName: '[local]_[hash:base64:2]'
            }
        }
    }
})
