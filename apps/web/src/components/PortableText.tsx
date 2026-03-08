import { PortableText as PortableTextRenderer } from '@portabletext/react'

type Props = {
  value: unknown[] | null | undefined
}

export function PortableText({ value }: Props) {
  if (!value?.length) return null
  return (
    <PortableTextRenderer
      value={value as Parameters<typeof PortableTextRenderer>[0]['value']}
      components={{
        block: {
          normal: ({ children }) => <p className="mb-4">{children}</p>,
          h2: ({ children }) => (
            <h2 className="mb-3 mt-6 text-xl font-semibold text-[var(--sea-ink)]">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mb-2 mt-4 text-lg font-semibold text-[var(--sea-ink)]">
              {children}
            </h3>
          ),
        },
      }}
    />
  )
}
