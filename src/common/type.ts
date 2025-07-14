export type ScrappedItem = {
  title: string
  price: string
  seller?: string
  url: string
}

export type GroupedItems = Record<string, ScrappedItem[]>

export type SearchQuery = {
  keyword: string
  model: string
}
