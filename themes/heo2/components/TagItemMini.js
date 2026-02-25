import { HashTag } from '@/components/HeroIcons'
import SmartLink from '@/components/SmartLink'

const TagItemMini = ({ tag, selected = false }) => {
  return (
    <SmartLink
      key={tag}
      href={selected ? '/' : `/tag/${encodeURIComponent(tag.name)}`}
      passHref
      className='cursor-pointer inline-block hover:text-white hover:bg-blue-600 dark:hover:bg-yellow-600 text-blue-600 dark:text-yellow-500 px-2 py-0.5 rounded-full duration-200 text-xs whitespace-nowrap'>
      <div className='font-medium flex items-center'>
        <HashTag className='stroke-2 mr-0.5 w-2.5 h-2.5' />{' '}
        {tag.name}{' '}
      </div>
    </SmartLink>
  )
}

export default TagItemMini
