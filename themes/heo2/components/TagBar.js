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
                {tagOptions?.map((t, index) => (
                    <TagMenuItem key={index} href={`/tag/${encodeURIComponent(t.name)}`} name={t.name} />
                ))}
            </div>

            <div id='tag-bar-next' className='flex items-center justify-center'>
                <div
                    id='tag-right'
                    className='cursor-pointer mx-2 dark:text-gray-300 dark:hover:text-yellow-600 hover:text-indigo-600'
                    onClick={handleToggleScroll}>
                    {scrollRight ? (
                        <ChevronDoubleLeft className={'w-5 h-5'} />
                    ) : (
                        <ChevronDoubleRight className={'w-5 h-5'} />
                    )}
                </div>
                <SmartLink
                    href='/tag'
                    className='whitespace-nowrap font-bold text-gray-900 dark:text-white transition-colors duration-200 hover:text-indigo-600 dark:hover:text-yellow-600'>
                    {locale.COMMON.TAGS}
                </SmartLink>
            </div>
        </div>
    )
}

const TagMenuItem = ({ href, name }) => {
    const router = useRouter()
    const { tag } = router.query
    const selected = decodeURIComponent(tag || '') === name
    return (
        <div
            className={`whitespace-nowrap mr-2 duration-200 transition-all font-bold px-2 py-0.5 rounded-md text-gray-900 dark:text-white hover:text-white hover:bg-indigo-600 dark:hover:bg-yellow-600 ${selected ? 'text-white bg-indigo-600 dark:bg-yellow-600' : ''}`}>
            <SmartLink href={href}>{name}</SmartLink>
        </div>
    )
}
