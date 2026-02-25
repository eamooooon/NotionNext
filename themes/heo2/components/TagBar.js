import { ChevronDoubleLeft, ChevronDoubleRight } from '@/components/HeroIcons'
import { useGlobal } from '@/lib/global'
import SmartLink from '@/components/SmartLink'
import { useRouter } from 'next/router'
import { useRef, useState } from 'react'

/**
 * 标签横向导航条
 * @param {*} props
 * @returns
 */
export default function TagBar(props) {
    const { tagOptions } = props
    const { locale } = useGlobal()
    const [scrollRight, setScrollRight] = useState(false)
    const tagBarItemsRef = useRef(null)

    const handleToggleScroll = () => {
        if (tagBarItemsRef.current) {
            const { scrollWidth, clientWidth } = tagBarItemsRef.current
            if (scrollRight) {
                tagBarItemsRef.current.scrollLeft = 0
            } else {
                tagBarItemsRef.current.scrollLeft = scrollWidth - clientWidth
            }
            setScrollRight(!scrollRight)
        }
    }

    if (!tagOptions || tagOptions.length === 0) return null

    return (
        <div
            id='tag-bar'
            className='wow fadeInUp flex flex-nowrap justify-between items-center h-12 mb-4 space-x-2 w-full lg:bg-white dark:lg:bg-[#1e1e1e]  
            lg:border lg:hover:border dark:lg:border-gray-800 hover:border-indigo-600 dark:hover:border-yellow-600 py-2 lg:px-2 rounded-xl transition-colors duration-200'>
            <div
                id='tag-bar-items'
                ref={tagBarItemsRef}
                className='scroll-smooth max-w-4xl rounded-lg scroll-hidden flex justify-start flex-nowrap items-center overflow-x-scroll'>
                <TagMenuItem href='/' name='全部' />
                {tagOptions?.map((t, index) => (
                    <TagMenuItem key={index} href={`/tag/${encodeURIComponent(t.name)}`} name={t.name} />
                ))}
            </div>
        </div>
    )
}

const TagMenuItem = ({ href, name }) => {
    const router = useRouter()
    const asPath = router.asPath
    const isOnTagPage = asPath.startsWith('/tag/')
    const isOnCategoryPage = asPath.startsWith('/category/')

    // 在标签页时保存当前选中的标签
    if (isOnTagPage && typeof window !== 'undefined') {
        const currentTag = decodeURIComponent(asPath.replace('/tag/', '').split('/')[0].split('?')[0])
        sessionStorage.setItem('selectedTag', currentTag)
    }

    let selected = false
    if (isOnTagPage) {
        selected = href === '/'
            ? false
            : asPath.startsWith(`/tag/${encodeURIComponent(name)}`)
    } else {
        const savedTag = typeof window !== 'undefined' ? sessionStorage.getItem('selectedTag') : null
        selected = href === '/'
            ? !savedTag
            : savedTag === name
    }

    // "全部"在分类页时不导航（保留分类筛选），只清除标签记忆
    const handleClick = (e) => {
        if (href === '/') {
            sessionStorage.removeItem('selectedTag')
            if (isOnCategoryPage) {
                e.preventDefault()
                router.replace(router.asPath)
            }
        }
    }

    return (
        <div
            onClick={handleClick}
            className={`whitespace-nowrap mr-2 duration-200 transition-all text-sm font-bold px-2 py-0.5 rounded-md text-gray-600 dark:text-gray-300 hover:text-white hover:bg-blue-600 dark:hover:bg-yellow-600 ${selected ? 'text-white bg-blue-600 dark:bg-yellow-600' : ''}`}>
            <SmartLink href={href}>{name}</SmartLink>
        </div>
    )
}
