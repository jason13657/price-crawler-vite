import puppeteer from 'puppeteer'
import fs from 'node:fs'
import { GroupedItems, ScrappedItem } from '@common/type'
import { sleep } from './helpers'

// const sampleGroupedItems: GroupedItems = {
//   'iPhone 14 Pro 128GB': [
//     {
//       title: 'iPhone 14 Pro 128GB - Excellent Condition',
//       price: '$829',
//       seller: "John's Tech",
//       url: 'https://example.com/iphone-14-pro-128gb-1'
//     },
//     {
//       title: 'Refurbished iPhone 14 Pro 128GB Gold',
//       price: '$799',
//       seller: 'RefurbHub',
//       url: 'https://example.com/iphone-14-pro-128gb-2'
//     }
//   ],
//   'Galaxy S22 Ultra': [
//     {
//       title: 'Samsung Galaxy S22 Ultra 256GB - Certified',
//       price: '$950',
//       seller: 'Galaxy Deals',
//       url: 'https://example.com/galaxy-s22-ultra'
//     }
//   ]
// }

export async function scrapeFacebookPrices(keywords: string[], selectedLocation: string) {
  const results: GroupedItems = {}

  for (const keyword of keywords) {
    try {
      const items = await scrapeFacebookPrice(keyword, selectedLocation)
      results[keyword] = items
    } catch (err) {
      throw err instanceof Error ? err : new Error(String(err))
    }

    await sleep(10)
  }

  return results
}

function chromeExecutablePathWin(): string {
  const candidates = [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe', // 64-bit 기본
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe' // 32-bit 기본
  ]

  for (const p of candidates) {
    if (fs.existsSync(p)) return p
  }
  throw new Error('Chrome executable not found on this system. ' + candidates.join(','))
}

export async function scrapeFacebookPrice(
  keyword: string,
  selectedLocation: string
): Promise<ScrappedItem[]> {
  const url = buildFBSearchUrl(keyword, selectedLocation)
  const browser = await puppeteer.launch({
    executablePath: chromeExecutablePathWin(),
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()

  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  )

  await page.goto(url, { waitUntil: 'networkidle2' })

  const results = await page.evaluate(() => {
    const items: ScrappedItem[] = []

    document.querySelectorAll("a[href*='/marketplace/item']").forEach((a) => {
      const priceEl = Array.from(a.querySelectorAll('span')).find((el) =>
        el.textContent?.trim().startsWith('AU$')
      )

      const titleEl = Array.from(a.querySelectorAll('span')).find(
        (el) =>
          el.textContent &&
          !el.textContent.trim().startsWith('AU$') &&
          el.textContent.trim().length > 5
      )

      const price = priceEl?.textContent?.trim()
      const title = titleEl?.textContent?.trim()

      if (price && title) {
        items.push({ title, price, url: location.href })
      }
    })

    return items
  })

  await browser.close()
  return results as ScrappedItem[]
}

function buildFBSearchUrl(keyword: string, selectedLocation: string) {
  const baseUrl = `https://www.facebook.com/marketplace/${selectedLocation.toLowerCase()}/search/`
  const params = new URLSearchParams({
    query: keyword
  })

  return `${baseUrl}?${params.toString()}`
}
