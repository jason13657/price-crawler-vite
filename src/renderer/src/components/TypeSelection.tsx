import { useState } from 'react'
import { galaxyKeywords, iPhoneKeywords } from '../constants/keywords'
import { KeywordsBlocks } from './KeywordsBlocks'
import { GroupedItems } from '@common/type'

export type PhoneType = 'iPhone' | 'Galaxy'
export type LocationType = 'Sydney' | 'Melbourne'

const KEYWORDS = {
  iPhone: iPhoneKeywords,
  Galaxy: galaxyKeywords
}

export function TypeSelection() {
  const [selected, setSelected] = useState<PhoneType>('iPhone')
  const [loading, setLoading] = useState(false)
  const [galaxy, setGalaxy] = useState<GroupedItems>()
  const [iphone, setIPhone] = useState<GroupedItems>()
  const [selectedLocation, setSelectedLocation] = useState<LocationType>('Sydney')
  const [error, setError] = useState<string>()

  const handleGenerate = async (keywords: string[]): Promise<GroupedItems> => {
    try {
      return await window.api.scrape(keywords, selectedLocation)
    } catch (error) {
      console.error('Scrape failed:', error)
      setError(`${error}`)
      alert('Failed to scrape data. Please try again.')
      return {}
    }
  }

  const handleGenerateAll = async () => {
    setLoading(true)

    const iphoneKeywords = KEYWORDS.iPhone.map((k) => k.keyword)
    const galaxyKeywords = KEYWORDS.Galaxy.map((k) => k.keyword)

    const iphoneData = await handleGenerate(iphoneKeywords)
    setIPhone(iphoneData)

    const galaxyData = await handleGenerate(galaxyKeywords)
    setGalaxy(galaxyData)

    setLoading(false)
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedLocation(e.target.value as LocationType)
  }

  if (!galaxy || !iphone) {
    return (
      <div className="flex gap-2 mx-auto items-center">
        <div className="flex gap-4">
          <label>
            <input
              disabled={loading}
              type="radio"
              name="location"
              value="Sydney"
              checked={selectedLocation === 'Sydney'}
              onChange={handleLocationChange}
            />
            Sydney
          </label>

          <label>
            <input
              disabled={loading}
              type="radio"
              name="location"
              value="Melbourne"
              checked={selectedLocation === 'Melbourne'}
              onChange={handleLocationChange}
            />
            Melbourne
          </label>
        </div>
        <button
          className={`px-4 py-2 rounded border bg-white text-black`}
          onClick={() => {
            handleGenerateAll()
          }}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </div>
    )
  }

  return (
    <div className="gap-4 w-full overflow-x-hidden">
      {error && <p>Error : {error}</p>}
      {selected == 'iPhone' ? (
        <KeywordsBlocks
          groupedItems={iphone}
          setGroupItem={setIPhone}
          keywords={KEYWORDS.iPhone}
          selected={selected}
          setSelected={setSelected}
          refresh={handleGenerateAll}
          loading={loading}
        />
      ) : (
        <KeywordsBlocks
          groupedItems={galaxy}
          setGroupItem={setGalaxy}
          keywords={KEYWORDS.Galaxy}
          selected={selected}
          setSelected={setSelected}
          refresh={handleGenerateAll}
          loading={loading}
        />
      )}
    </div>
  )
}
