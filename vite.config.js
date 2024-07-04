import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), dts({ insertTypesEntry: true })],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "ui-kit",
            formats: ['es', 'cjs'],
            fileName: function (format) {
                if (format === 'es') {
                    return 'index.js'; // ES module 파일 이름
                }
                if (format === 'cjs') {
                    return 'index.cjs'; // CommonJS 파일 이름
                }
                return "index.".concat(format, ".js"); // 기타 파일 이름
            },
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                },
            },
        },
    },
});
