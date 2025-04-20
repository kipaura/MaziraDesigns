import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Typography } from "@/components/typography-provider"
import { MarkdownContent } from "@/components/markdown-content"

const { H1, PLarge } = Typography

interface PolicyLayoutProps {
  title: string
  lastUpdated: string
  content: string
}

export function PolicyLayout({ title, lastUpdated, content }: PolicyLayoutProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      <main className="py-12">
        <Section size="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="mb-16 text-center">
                <H1 className="mb-6">{title}</H1>
                <PLarge className="text-zinc-400">Last updated: {lastUpdated}</PLarge>
              </div>

              <div className="prose prose-invert prose-lg max-w-none">
                <div className="space-y-8">
                  <MarkdownContent 
                    content={content} 
                    className="
                      [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-6 [&_h2]:mt-12 [&_h2]:text-white
                      [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mb-4 [&_h3]:text-zinc-200
                      [&_p]:text-zinc-300 [&_p]:leading-relaxed [&_p]:mb-4
                      [&_ul]:space-y-2 [&_ul]:mb-6 [&_ul]:list-none [&_ul]:pl-0
                      [&_li]:text-zinc-300 [&_li]:leading-relaxed
                      [&_a]:text-pink-500 [&_a]:no-underline [&_a]:hover:text-pink-400
                      first:[&_h2]:mt-0
                    "
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <SiteFooter />
    </div>
  )
} 