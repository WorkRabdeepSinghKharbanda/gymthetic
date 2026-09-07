function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Opens a new tab with a clean printable table and triggers the print dialog. */
export function printWorkoutSheet(title: string, headers: string[], rows: string[][]) {
  const win = window.open('', '_blank', 'noopener,noreferrer')
  if (!win) return

  const headerHtml = headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')
  const rowsHtml = rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join('')}</tr>`).join('')

  win.document.write(`<!doctype html>
<html>
<head>
<title>${escapeHtml(title)} — Gymthetic</title>
<style>
  body { font-family: system-ui, sans-serif; padding: 24px; color: #111; }
  h1 { font-size: 20px; margin: 0 0 4px; }
  p { margin: 0 0 16px; color: #666; font-size: 13px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { border: 1px solid #ccc; padding: 8px 10px; text-align: left; font-size: 14px; }
  th { background: #f5f5f5; }
</style>
</head>
<body>
  <h1>${escapeHtml(title)}</h1>
  <p>Gymthetic — printed ${new Date().toLocaleDateString()}</p>
  <table>
    <thead><tr>${headerHtml}</tr></thead>
    <tbody>${rowsHtml}</tbody>
  </table>
</body>
</html>`)
  win.document.close()
  win.focus()
  win.print()
}
