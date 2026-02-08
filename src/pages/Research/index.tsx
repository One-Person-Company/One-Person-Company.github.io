import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { articles, formatDate, getArticleTitle, getArticleDescription } from '../../config/articles'
import './index.css'

interface ArticleData {
  [key: string]: {
    title: string
    description: string
  }
}

export default function Research() {
  const { t, i18n } = useTranslation()
  const [articleData, setArticleData] = useState<ArticleData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadArticleData = async () => {
      setLoading(true)
      const data: ArticleData = {}

      // 并行加载所有文章的标题和描述
      await Promise.all(
        articles.map(async (article) => {
          const title = await getArticleTitle(article, i18n.language)
          const description = await getArticleDescription(article, i18n.language)
          data[article.slug] = { title, description }
        })
      )

      setArticleData(data)
      setLoading(false)
    }

    loadArticleData()
  }, [i18n.language])

  return (
    <div className="h-screen w-full overflow-x-hidden overflow-y-auto flex flex-col">
      <motion.section
        className="flex-1 px-6 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <h1 className="text-5xl md:text-6xl font-light mb-4">
              {t('nav.research')}
            </h1>
            <p className="text-lg text-white/60">
              {t('research.subtitle')}
            </p>
          </motion.div>

          {/* Articles List */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-white/60">{t('research.loading')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {articles.map((article, index) => (
                <motion.article
                  key={article.id}
                  className="group border border-white/10 rounded-lg p-6 hover:border-white/20 transition-all duration-200 ease-out cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  }}
                >
                  <Link
                    to={`/research/${article.slug}`}
                    className="block hover:no-underline"
                  >
                    <h2 className="text-2xl font-medium mb-2 group-hover:text-white/90 transition-colors">
                      {articleData[article.slug]?.title || article.title}
                    </h2>
                    <p className="text-white/60 mb-4 group-hover:text-white/70 transition-colors">
                      {articleData[article.slug]?.description || article.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-white/40 group-hover:text-white/50 transition-colors">
                      <span>{formatDate(article.date)}</span>
                      <span>•</span>
                      <span>{article.author}</span>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  )
}
