import { GroupedItems } from '@common/type'

declare global {
  interface Window {
    api: {
      scrape: (keywords: string[], selectedLocation: string) => Promise<GroupedItems>
    }

    electron: typeof import('@electron-toolkit/preload').electronAPI
  }
}

export {}
