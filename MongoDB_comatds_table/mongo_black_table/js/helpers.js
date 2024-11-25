function textPrettier(text = '', field = false) {
  if (field) {
    return text.replaceAll(/\<(\w)+\>/g, function () {
      return `<span class="value">&lt;value&gt;</span>`
    })
  }
  return text.replaceAll(/\$(\w+.)+/g, function (key) {
    return `<span>${key}</span>`
  })
}

export function renderData(data, targetNode) {
  const fragment = data.map((elem) => {
    const prittycommand = textPrettier(elem.command, true)
    const prittyDesc = textPrettier(elem.description)
    const prittyExample = textPrettier(elem.example)

    return `
      <tr>
        <td data-cell="id">${elem.id}</td>
        <td data-cell="commads" class="commads">
        <span class="keyword">${elem.keyword || "?"}</span>
        <span class="code">
          ${prittycommand}
        </span>
        </td>
        <td data-cell="desc" colspan="2" class="desc">${prittyDesc}</td>
        <td data-cell="example" class="example">
        ${elem.example ? `<code>${prittyExample}</code>` : ''}
        </td>
      </tr>`
  }).join('')
  targetNode.insertAdjacentHTML('beforeend', fragment)
}


