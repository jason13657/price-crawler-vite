import { ScrappedItem } from '@common/type'

type Props = {
  item: ScrappedItem
}

export function KeywordsBlock({ item }: Props) {
  return (
    <div className="p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer group">
      <div className="flex flex-col justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-1">
            <span>{item.title}</span>
          </div>
        </div>
        <p className="text-xs">{item.seller}</p>
        <div className="w-full flex justify-between">
          <p className="text-base font-bold text-green-600 whitespace-nowrap">{item.price}</p>
        </div>
      </div>
    </div>
  )
}
