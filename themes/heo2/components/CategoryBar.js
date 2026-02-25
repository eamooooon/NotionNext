import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 博客列表上方嵌入条
 * @param {*} props
 * @returns
 */
export default function CategoryBar(props) {
  const { categoryOptions, border = true } = props
  const { locale } = useGlobal()
  const [scrollRight, setScrollRight] = useState(false)
  // 创建一个ref引用
  const categoryBarItemsRef = useRef(null)

  // 点击#right时，滚动#category-bar-items到最右边
  const handleToggleScroll = () => {
    if (categoryBarItemsRef.current) {
      const { scrollWidth, clientWidth } = categoryBarItemsRef.current
      if (scrollRight) {
        categoryBarItemsRef.current.scrollLeft = 0
      } else {
        categoryBarItemsRef.current.scrollLeft = scrollWidth - clientWidth
      }
      setScrollRight(!scrollRight)
    }
  }

  return (
    <div
      id='category-bar'
      className={`wow fadeInUp flex flex-nowrap justify-between items-center h-12 mb-4 space-x-2 w-full lg:bg-white dark:lg:bg-[#1e1e1e]  
            ${border ? 'lg:border lg:hover:border dark:lg:border-gray-800 hover:border-indigo-600 dark:hover:border-yellow-600 ' : ''}  py-2 lg:px-2 rounded-xl transition-colors duration-200`}>
      <div
        id='category-bar-items'
        ref={categoryBarItemsRef}
        className='scroll-smooth max-w-4xl rounded-lg scroll-hidden flex justify-start flex-nowrap items-center overflow-x-scroll'>
        <MenuItem href='/' name='全部' />
        {categoryOptions?.map((c, index) => (
          <MenuItem key={index} href={`/category/${c.name}`} name={c.name} />
        ))}
      </div>
    </div>
  )
}

/**
 * 按钮
 * @param {*} param0
 * @returns
 */
const MenuItem = ({ href, name }) => {
  const router = useRouter()
  const asPath = router.asPath
  const isOnCategoryPage = asPath.startsWith('/category/')

  // 分类页匹配对应分类，其他页面"全部"高亮
  const selected = href === '/'
    ? !isOnCategoryPage
    : asPath.startsWith(`/category/${encodeURIComponent(name)}`)

  return (
    <div
      className={`whitespace-nowrap mr-2 duration-200 transition-all font-bold px-2 py-0.5 rounded-md text-gray-900 dark:text-white hover:text-white hover:bg-blue-600 dark:hover:bg-yellow-600 ${selected ? 'text-white bg-blue-600 dark:bg-yellow-600' : ''}`}>
      <SmartLink href={href}>{name}</SmartLink>
    </div>
  )
}
