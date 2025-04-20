"use client"

import { marked } from 'marked'
import { useEffect, useState } from 'react'
import { Typography } from "@/components/typography-provider"

const { H1, H2, H3, P, PLarge } = Typography

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  const [htmlContent, setHtmlContent] = useState('')

  useEffect(() => {
    // Configure marked options
    marked.setOptions({
      gfm: true, // GitHub Flavored Markdown
      breaks: true, // Convert line breaks to <br>
    })

    // Convert markdown to HTML
    const html = marked.parse(content) as string
    setHtmlContent(html)
  }, [content])

  return (
    <div 
      className={`prose prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
} 