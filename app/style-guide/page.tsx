"use client"
import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Typography } from "@/components/typography-provider"

const { H1, H2, H3, H4, P, PLarge, PSmall, Strong, Em, Highlight } = Typography

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <SiteHeader />

      <main>
        <Section size="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <H1 className="mb-6">Style Guide</H1>
              <PLarge className="mb-12">
                This page documents the standardized layout and spacing system used throughout the site.
              </PLarge>

              {/* Container Sizes */}
              <div className="mb-16">
                <H2 className="mb-6">Container Sizes</H2>
                <div className="space-y-8">
                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Extra Small (xs): max-w-screen-sm (640px)</P>
                    <div className="bg-zinc-800/50 p-4 max-w-screen-sm mx-auto">
                      <P className="text-center">Extra Small Container</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Small (sm): max-w-screen-md (768px)</P>
                    <div className="bg-zinc-800/50 p-4 max-w-screen-md mx-auto">
                      <P className="text-center">Small Container</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Medium (md): max-w-screen-lg (1024px)</P>
                    <div className="bg-zinc-800/50 p-4 max-w-screen-lg mx-auto">
                      <P className="text-center">Medium Container</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Large (lg - Default): max-w-screen-xl (1280px)</P>
                    <div className="bg-zinc-800/50 p-4 max-w-screen-xl mx-auto">
                      <P className="text-center">Large Container (Default)</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Extra Large (xl): max-w-screen-2xl (1536px)</P>
                    <div className="bg-zinc-800/50 p-4 max-w-screen-2xl mx-auto">
                      <P className="text-center">Extra Large Container</P>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section Sizes */}
              <div className="mb-16">
                <H2 className="mb-6">Section Spacing</H2>
                <div className="space-y-8">
                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Small (sm): py-8 (32px)</P>
                    <div className="bg-zinc-800/50 py-8 flex items-center justify-center">
                      <P>Small Section (py-8)</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Medium (md - Default): py-16 (64px)</P>
                    <div className="bg-zinc-800/50 py-16 flex items-center justify-center">
                      <P>Medium Section (py-16)</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Large (lg): py-20 (80px)</P>
                    <div className="bg-zinc-800/50 py-20 flex items-center justify-center">
                      <P>Large Section (py-20)</P>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Extra Large (xl): py-24 (96px)</P>
                    <div className="bg-zinc-800/50 py-24 flex items-center justify-center">
                      <P>Extra Large Section (py-24)</P>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Spacing */}
              <div className="mb-16">
                <H2 className="mb-6">Content Spacing</H2>
                <div className="space-y-8">
                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Small Content Spacing: space-y-content-sm (16px)</P>
                    <div className="bg-zinc-800/50 p-4 space-y-content-sm">
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 1</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 2</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 3</div>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Default Content Spacing: space-y-content (24px)</P>
                    <div className="bg-zinc-800/50 p-4 space-y-content">
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 1</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 2</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 3</div>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Large Content Spacing: space-y-content-lg (32px)</P>
                    <div className="bg-zinc-800/50 p-4 space-y-content-lg">
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 1</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 2</div>
                      <div className="bg-zinc-700 h-12 flex items-center justify-center">Element 3</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Usage Examples */}
              <div className="mb-16">
                <H2 className="mb-6">Usage Examples</H2>
                <div className="space-y-8">
                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Standard Page Layout</P>
                    <div className="bg-zinc-800/50 p-4">
                      <pre className="text-sm text-zinc-300 overflow-x-auto p-4 bg-black rounded">
                        {`<Section size="lg">
  <Container>
    <H1 className="mb-6">Page Title</H1>
    <PLarge className="mb-10">Page description goes here...</PLarge>
    
    <div className="space-y-content">
      {/* Content with consistent spacing */}
    </div>
  </Container>
</Section>`}
                      </pre>
                    </div>
                  </div>

                  <div className="border border-dashed border-zinc-700 p-4">
                    <P className="mb-2 text-zinc-400">Narrower Content Section</P>
                    <div className="bg-zinc-800/50 p-4">
                      <pre className="text-sm text-zinc-300 overflow-x-auto p-4 bg-black rounded">
                        {`<Section size="md" className="bg-zinc-900">
  <Container size="md">
    <div className="space-y-content">
      <H2 className="mb-4">Section Title</H2>
      <P className="mb-6">Section content goes here...</P>
    </div>
  </Container>
</Section>`}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* Implementation Notes */}
              <div className="mb-16">
                <H2 className="mb-6">Implementation Notes</H2>
                <div className="space-y-4">
                  <P>
                    <Strong>Container Component:</Strong> Use the <code className="text-pink-500">Container</code>{" "}
                    component to maintain consistent max-widths and horizontal padding.
                  </P>
                  <P>
                    <Strong>Section Component:</Strong> Use the <code className="text-pink-500">Section</code> component
                    to maintain consistent vertical spacing.
                  </P>
                  <P>
                    <Strong>Spacing Utilities:</Strong> Use <code className="text-pink-500">space-y-content</code>,{" "}
                    <code className="text-pink-500">space-y-content-sm</code>, and{" "}
                    <code className="text-pink-500">space-y-content-lg</code> for consistent vertical spacing between
                    elements.
                  </P>
                  <P>
                    <Strong>Margin Utilities:</Strong> Use <code className="text-pink-500">mb-content</code>,{" "}
                    <code className="text-pink-500">mb-content-sm</code>, and{" "}
                    <code className="text-pink-500">mb-content-lg</code> for consistent bottom margins.
                  </P>
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
