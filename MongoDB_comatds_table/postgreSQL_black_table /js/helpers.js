function textPrettier(text = '', field = false) {
  if (field) {
    return text.replaceAll(/\<(\w)+\>/g, function () {
      return `<span class="value">&lt;value&gt;</span>`
    })
  }
  // подсвечивает SQL-ключевые слова (2+ заглавные латинские буквы)
  return text.replaceAll(/\b([A-Z]{2,})\b/g, function (key) {
    return `<span>${key}</span>`
  })
}

export function renderData(data, targetNode) {
  const fragment = data
    .map((elem) => {
      const prittycommand = textPrettier(elem.command, true)
      const prittyDesc = textPrettier(elem.description)
      const prittyExample = textPrettier(elem.example)
      const linkHtml = elem.link
        ? `<p class="doc-link"><a href="${elem.link}" target="_blank" rel="noreferrer">PostgreSQL docs →</a></p>`
        : ''

      return `
      <tr>
        <td data-cell="id">${elem.id}</td>
        <td data-cell="commads" class="commads">
        <span class="keyword">${elem.keyword || '?'}</span>
        <span class="code">
          ${prittycommand}
        </span>
        </td>
        <td data-cell="desc" colspan="2" class="desc">${prittyDesc}${linkHtml}</td>
        <td data-cell="example" class="example">
        ${elem.example ? `<code>${prittyExample}</code>` : ''}
        </td>
      </tr>`
    })
    .join('')
  targetNode.insertAdjacentHTML('beforeend', fragment)
}


