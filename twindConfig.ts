import { defineConfig } from '@twind/core'
import presetTailwind from '@twind/preset-tailwind'

export const twindConfig = defineConfig({
  presets: [presetTailwind()], // Usa o preset padrão do Tailwind
})

import { setup } from '@twind/core'

// Configura o Twind
setup(twindConfig)
