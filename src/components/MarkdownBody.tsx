import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

/** Parses `[text](url)` inside a line — internal paths become client-side <Link>s. */
function renderInline(text: string): ReactNode[] {
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0
  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const [, label, href] = match
    if (href.startsWith('/')) {
      parts.push(
        <Link key={key++} to={href} className="text-orange-500 hover:underline">
          {label}
        </Link>,
      )
    } else {
      parts.push(
        <a key={key++} href={href} target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
          {label}
        </a>,
      )
    }
    lastIndex = LINK_RE.lastIndex
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

/**
 * Lite markdown: "## " lines are headings, "- " lines group into a bullet list, everything
 * else is a paragraph. Any line may contain `[text](url)` inline links.
 */
export default function MarkdownBody({ lines }: { lines: string[] }) {
  const elements: ReactNode[] = []
  let listBuffer: string[] = []
  let key = 0

  function flushList() {
    if (listBuffer.length === 0) return
    elements.push(
      <ul key={key++} className="list-disc space-y-1 pl-5">
        {listBuffer.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>,
    )
    listBuffer = []
  }

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList()
      elements.push(
        <h2 key={key++} className="mt-8 text-xl font-bold text-neutral-900 dark:text-white">
          {line.slice(3)}
        </h2>,
      )
    } else if (line.startsWith('- ')) {
      listBuffer.push(line.slice(2))
    } else {
      flushList()
      elements.push(<p key={key++}>{renderInline(line)}</p>)
    }
  }
  flushList()

  return <>{elements}</>
}
