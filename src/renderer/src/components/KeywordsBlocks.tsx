import { useState } from 'react'
import { KeywordsBlock } from './KeywordsBlock'
import { PhoneType } from './TypeSelection'
import { GroupedItems } from '@common/type'

type Props = {
  selected: PhoneType
  setSelected: (type: PhoneType) => void
  groupedItems: GroupedItems
  setGroupItem: (item: GroupedItems) => void
  keywords: { keyword: string; model: string }[]
  refresh: () => void
  loading: boolean
}

export function KeywordsBlocks({ groupedItems, selected, setSelected, loading, refresh }: Props) {
  const [query, setQuery] = useState('')

  const items = Object.entries(groupedItems).filter(([keyword]) =>
    keyword.toLowerCase().includes(query.toLowerCase())
  )
  return (
    <div className="overflow-x-scroll">
      <div className="flex flex-col gap-2 mb-2">
        <p>{selected}</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Filter by keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            className={`px-4 py-2 rounded border bg-white text-black`}
            onClick={() => {
              if (selected == 'Galaxy') {
                setSelected('iPhone')
              } else {
                setSelected('Galaxy')
              }
            }}
          >
            Go to {selected == 'iPhone' ? 'Galaxy' : 'iPhone'}
          </button>
          <button
            className={`px-4 py-2 rounded border bg-white text-black`}
            onClick={() => {
              refresh()
            }}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>
      </div>
      <div className="flex gap-8 pb-2 ">
        {items.map(([keyword, items]) => (
          <div
            key={keyword}
            className="w-[400px] flex-shrink-0 snap-start bg-white rounded-lg shadow-sm border border-gray-100"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">{keyword}</h2>
                <span className="text-sm text-gray-500">{items.length} items</span>
              </div>
            </div>

            <div className="max-h-[60vh] overflow-y-auto divide-y divide-gray-100">
              {items.map((item, idx) => (
                <KeywordsBlock key={idx} item={item} />
              ))}
            </div>
          </div>
        ))}
      </div>{' '}
    </div>
  )
}
