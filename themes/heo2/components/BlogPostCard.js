import LazyImage from '@/components/LazyImage'
import NotionIcon from './NotionIcon'
import { siteConfig } from '@/lib/config'
import SmartLink from '@/components/SmartLink'
import CONFIG from '../config'
import TagItemMini from './TagItemMini'

const BlogPostCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview =
    siteConfig('HEO_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  if (
    post &&
    !post.pageCoverThumbnail &&
    siteConfig('HEO_POST_LIST_COVER_DEFAULT', null, CONFIG)
  ) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover =
    siteConfig('HEO_POST_LIST_COVER', null, CONFIG) &&
    post?.pageCoverThumbnail &&
    !showPreview

  const COVER_HOVER_ENLARGE = siteConfig(
    'HEO_POST_LIST_COVER_HOVER_ENLARGE',
    true,
    CONFIG
  )

  return (
    <article
      className={` ${COVER_HOVER_ENLARGE} ? ' hover:transition-all duration-150' : ''}`}>
      <div
        data-wow-delay='.2s'
        className='wow fadeInUp bg-white dark:bg-[#1e1e1e] flex mb-4 flex-col group w-full shadow-md hover:shadow-xl dark:shadow-gray-900 duration-300 transition-all overflow-hidden rounded-2xl'>

        {/* 图片封面 */}
        {showPageCover && (
          <SmartLink href={post?.href} passHref legacyBehavior>
            <div className='w-full h-52 overflow-hidden cursor-pointer select-none'>
              <LazyImage
                priority={index === 0}
                src={post?.pageCoverThumbnail}
                alt={post?.title}
                className='h-full w-full object-cover group-hover:scale-105 group-hover:brightness-90 transition-all duration-500 ease-in-out'
              />
            </div>
          </SmartLink>
        )}

        {/* 文字区块 */}
        <div className='flex p-5 flex-col justify-between flex-1'>

          {/* 分类 + 日期 */}
          <div className='flex items-center justify-between text-xs mb-2 text-gray-700 dark:text-gray-300'>
            {post?.category && (
              <SmartLink
                passHref
                href={`/category/${post.category}`}
                className='flex items-center gap-1 font-medium cursor-pointer hover:text-blue-600 dark:hover:text-yellow-500'>
                <i className='fa-regular fa-folder-open' />
                {post.category}
              </SmartLink>
            )}
            {post?.publishDay && (
              <span className='flex items-center gap-1'>
                <i className='fa-regular fa-clock' />
                {post.publishDay}
              </span>
            )}
          </div>

          {/* 标题 */}
          <header>
            <SmartLink
              href={post?.href}
              passHref
              className='group-hover:text-blue-600 dark:group-hover:text-yellow-500 text-gray-900 dark:text-gray-100 line-clamp-2 replace cursor-pointer text-base font-bold leading-snug'>
              {siteConfig('POST_TITLE_ICON') && (
                <NotionIcon
                  icon={post.pageIcon}
                  className="heo-icon w-5 h-5 mr-1 align-middle transform translate-y-[-8%]"
                />
              )}
              <span className='menu-link'>{post.title}</span>
            </SmartLink>
          </header>

          {/* 摘要 - 固定两行高度 */}
          <main className='mt-2 line-clamp-2 replace text-gray-500 dark:text-gray-400 text-xs font-light leading-relaxed min-h-[2.5rem]'>
            {post.summary}
          </main>

          {/* 标签 */}
          <div className='mt-3 flex flex-wrap gap-1.5'>
            {post.tagItems?.map(tag => (
              <TagItemMini key={tag.name} tag={tag} />
            ))}
          </div>

        </div>
      </div>
    </article>
  )
}

export default BlogPostCard
