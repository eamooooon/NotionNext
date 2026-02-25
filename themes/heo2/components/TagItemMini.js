import { HashTag } from '@/components/HeroIcons'
import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className={
        'cursor-pointer inline-block hover:text-white hover:bg-indigo-600 dark:hover:bg-yellow-600 px-1.5 py-0.5 rounded-2xl dark:text-white duration-200 text-xs whitespace-nowrap '
      }>
      <div className='font-light flex items-center'>
        <HashTag className='stroke-2 mr-0.5 w-2.5 h-2.5' />{' '}
        {tag.name + (tag.count ? `(${tag.count})` : '')}{' '}
      </div>
    </SmartLink>
  )
}

export default TagItemMini
