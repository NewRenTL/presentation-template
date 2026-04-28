import type { ReactNode } from 'react'

// CodeBlock — syntax-highlighted code block with macOS window chrome
// Supports Python syntax by default. Customize KEYWORDS / BUILTINS for other languages.
//
// Usage:
//   <CodeBlock code={`def hello():\n    print("Hello, World!")`} />
interface Props {
  code: string
  showHeader?: boolean
  fontSize?: number
  language?: string
}

type TokenType = 'keyword' | 'builtin' | 'string' | 'number' | 'comment' | 'operator' | 'default'

interface Token {
  type: TokenType
  value: string
}

const tokenColors: Record<TokenType, string> = {
  keyword:  '#c792ea',
  builtin:  '#82aaff',
  string:   '#c3e88d',
  number:   '#f78c6c',
  comment:  '#637777',
  operator: '#89DDFF',
  default:  'rgba(255,255,255,0.82)',
}

// Extend these sets to add more keywords/builtins for your language
const KEYWORDS = new Set([
  'def', 'if', 'elif', 'else', 'for', 'while', 'in', 'and', 'or', 'not',
  'True', 'False', 'None', 'import', 'from', 'return', 'break', 'continue',
  'pass', 'class', 'with', 'as', 'is', 'lambda', 'del', 'global',
  // JS/TS keywords
  'const', 'let', 'var', 'function', 'async', 'await', 'export', 'default',
  'new', 'this', 'typeof', 'instanceof', 'throw', 'try', 'catch', 'finally',
  'interface', 'type', 'extends', 'implements', 'null', 'undefined',
])

const BUILTINS = new Set([
  'print', 'input', 'int', 'float', 'str', 'bool', 'len', 'range',
  'type', 'list', 'dict', 'set', 'tuple', 'open', 'format', 'append',
  'console', 'Math', 'JSON', 'Promise', 'Array', 'Object', 'String', 'Number',
])

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = []
  const commentIdx = line.indexOf('#')
  const slashCommentIdx = line.indexOf('//')
  const commentStart = [commentIdx, slashCommentIdx].filter(i => i >= 0).reduce((a, b) => Math.min(a, b), Infinity)
  const codePart = isFinite(commentStart) ? line.slice(0, commentStart) : line
  const commentPart = isFinite(commentStart) ? line.slice(commentStart) : null

  const regex = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|\b([a-zA-Z_]\w*)\b|(\d+\.?\d*)|([+\-*/%=<>!&|^~]+)|([()[\]{},:.@])|(\s+)|(.)/g

  let match: RegExpExecArray | null
  let lastIndex = 0

  while ((match = regex.exec(codePart)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'default', value: codePart.slice(lastIndex, match.index) })
    }

    const full = match[0]
    const str  = match[1]
    const word = match[2]
    const num  = match[3]
    const op   = match[4]

    if (str) {
      tokens.push({ type: 'string', value: str })
    } else if (word) {
      if (KEYWORDS.has(word))      tokens.push({ type: 'keyword', value: word })
      else if (BUILTINS.has(word)) tokens.push({ type: 'builtin', value: word })
      else                         tokens.push({ type: 'default', value: word })
    } else if (num) {
      tokens.push({ type: 'number', value: num })
    } else if (op) {
      tokens.push({ type: 'operator', value: op })
    } else {
      tokens.push({ type: 'default', value: full })
    }

    lastIndex = match.index + full.length
  }

  if (lastIndex < codePart.length) {
    tokens.push({ type: 'default', value: codePart.slice(lastIndex) })
  }

  if (commentPart) {
    tokens.push({ type: 'comment', value: commentPart })
  }

  return tokens
}

export default function CodeBlock({ code, showHeader = true, fontSize = 13, language = 'code' }: Props) {
  const lines = code.split('\n')

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'rgba(5, 9, 15, 0.75)', border: '1px solid rgba(255,255,255,0.08)' }}
    >
      {showHeader && (
        <div
          className="px-4 py-2 flex items-center gap-2 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)' }}
        >
          {(['#f87171', '#fbbf24', '#34d399'] as const).map(c => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c, opacity: 0.55 }} />
          ))}
          <span
            className="text-[10px] ml-1"
            style={{ fontFamily: 'JetBrains Mono, monospace', color: 'rgba(255,255,255,0.22)' }}
          >
            {language}
          </span>
        </div>
      )}
      <pre
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          lineHeight: 1.75,
          padding: '12px 16px',
          margin: 0,
          fontSize,
          overflowX: 'auto',
        }}
      >
        {lines.map((line, lineIdx): ReactNode => (
          <div key={lineIdx}>
            {line === '' ? ' ' : tokenizeLine(line).map((token, tokenIdx) => (
              <span key={tokenIdx} style={{ color: tokenColors[token.type] }}>
                {token.value}
              </span>
            ))}
          </div>
        ))}
      </pre>
    </div>
  )
}
