import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { parseFrontmatter } from '../../utils/frontmatter'
import { getArticleBySlug, formatDate, getArticleTitle } from '../../config/articles'
import './index.css'

interface ArticleState {
  content: string
  title: string
}

export default function ResearchDetail() {
  const { slug } = useParams<{ slug: string }>()
  const { t, i18n } = useTranslation()
  const [articleState, setArticleState] = useState<ArticleState>({ content: '', title: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticle = async () => {
      if (!slug) return

      try {
        // 根据当前语言确定目录
        const lang = i18n.language === 'zh' ? 'zh' : 'en'
        
        // 动态导入markdown文件
        const modules = import.meta.glob('../../assets/articles/research/**/*.md', { 
          query: '?raw',
          import: 'default'
        })
        
        const moduleKey = `../../assets/articles/research/${lang}/${slug}.md`
        const moduleLoader = modules[moduleKey]
        
        if (!moduleLoader) {
          throw new Error('Article not found')
        }
        
        const rawContent = await moduleLoader() as string
        const { content: markdownContent } = parseFrontmatter(rawContent)
        
        // 获取文章标题
        const article = getArticleBySlug(slug)
        const title = article ? await getArticleTitle(article, i18n.language) : ''
        
        setArticleState({ content: markdownContent, title })
      } catch (error) {
        console.error('Failed to load article:', error)
        setArticleState({ content: '# 文章加载失败\n\n无法加载此文章。', title: '' })
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [slug, i18n.language])

  const article = slug ? getArticleBySlug(slug) : undefined

  if (loading) {
    return (
      <motion.section
        className="h-screen flex items-center justify-center px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-white/60">
          {t('research.loading')}
        </div>
      </motion.section>
    )
  }

  if (!article) {
    return (
      <motion.section
        className="h-screen flex items-center justify-center px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-white/60">
          {t('research.notFound')}
        </div>
      </motion.section>
    )
  }

  return (
    <div className="h-screen w-full overflow-x-hidden overflow-y-auto flex flex-col">
      <motion.article
        className="flex-1 px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Article Header */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-light mb-4">
              {articleState.title || article.title}
            </h1>
            <div className="flex items-center gap-4 text-white/50 text-sm">
              <span>{formatDate(article.date)}</span>
              <span>•</span>
              <span>{article.author}</span>
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            className="prose prose-invert max-w-none markdown-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{articleState.content}</ReactMarkdown>
          </motion.div>
        </div>
      </motion.article>
    </div>
  )
}
