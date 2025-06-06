import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import UnoCSS from 'unocss/vite';
import presetWind3 from '@unocss/preset-wind3';

export default defineConfig({
    plugins: [
        react(),
        UnoCSS({
            presets: [
                presetWind3(),
            ],
        }),
    ],
});