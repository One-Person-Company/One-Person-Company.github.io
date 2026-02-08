import { parseFrontmatter } from '../utils/frontmatter'

export interface Article {
  id: string
  title: string
  description: string
  date: string
  author: string
  slug: string
  category: string
}

export interface ArticleContent {
  zh: string
  en: string
}

// 语言文件缓存
const markdownCache = new Map<string, Record<string, string>>()

// 动态加载指定语言的markdown文件
async function loadMarkdownFiles(language: string): Promise<Record<string, string>> {
  // 如果已缓存，直接返回
  if (markdownCache.has(language)) {
    return markdownCache.get(language)!
  }

  // 动态导入指定语言的markdown文件
  const modules = import.meta.glob('../assets/articles/research/**/*.md', { 
    query: '?raw',
    import: 'default'
  }) as Record<string, () => Promise<string>>

  const langFiles: Record<string, string> = {}
  const prefix = `../assets/articles/research/${language}/`

  // 筛选并加载指定语言的文件
  for (const [path, loader] of Object.entries(modules)) {
    if (path.startsWith(prefix)) {
      const content = await loader()
      langFiles[path] = content
    }
  }

  // 缓存结果
  markdownCache.set(language, langFiles)
  return langFiles
}

// 中文markdown文件（仅用于生成文章列表）
const zhMarkdownFiles = import.meta.glob('../assets/articles/research/zh/*.md', { 
  query: '?raw',
  import: 'default',
  eager: true 
}) as Record<string, string>

// 解析markdown文件生成文章列表
function parseArticles(): Article[] {
  const articleMap = new Map<string, Article>()
  
  // 仅使用中文文件来生成文章列表（作为唯一数据源）
  for (const [, content] of Object.entries(zhMarkdownFiles)) {
    const { data } = parseFrontmatter(content)
    
    if (data.id && data.slug) {
      articleMap.set(data.slug, {
        id: data.id,
        title: data.title,
        description: data.description,
        date: data.date,
        author: data.author,
        slug: data.slug,
        category: 'research',
      })
    }
  }
  
  // 按日期降序排序
  return Array.from(articleMap.values()).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export const articles: Article[] = parseArticles()

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export async function getArticleTitle(article: Article, language: string): Promise<string> {
  try {
    const langFiles = await loadMarkdownFiles(language)
    const fileName = `../assets/articles/research/${language}/${article.slug}.md`
    const content = langFiles[fileName]
    
    if (content) {
      const { data } = parseFrontmatter(content)
      return data.title || article.title
    }
  } catch (error) {
    console.error(`Failed to load article title for ${language}:`, error)
  }
  
  return article.title
}

export async function getArticleDescription(article: Article, language: string): Promise<string> {
  try {
    const langFiles = await loadMarkdownFiles(language)
    const fileName = `../assets/articles/research/${language}/${article.slug}.md`
    const content = langFiles[fileName]
    
    if (content) {
      const { data } = parseFrontmatter(content)
      return data.description || article.description
    }
  } catch (error) {
    console.error(`Failed to load article description for ${language}:`, error)
  }
  
  return article.description
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
