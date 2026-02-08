/**
 * 简单的frontmatter解析器（浏览器兼容）
 * 解析markdown文件中的YAML frontmatter
 */
export function parseFrontmatter(content: string): { 
  data: Record<string, string>
  content: string 
} {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/
  const match = content.match(frontmatterRegex)
  
  if (!match) {
    return { data: {}, content }
  }
  
  const [, frontmatter, markdown] = match
  const data: Record<string, string> = {}
  
  frontmatter.split('\n').forEach(line => {
    const colonIndex = line.indexOf(':')
    if (colonIndex > 0) {
      const key = line.substring(0, colonIndex).trim()
      const value = line.substring(colonIndex + 1).trim().replace(/^['"]|['"]$/g, '')
      data[key] = value
    }
  })
  
  return { data, content: markdown }
}
