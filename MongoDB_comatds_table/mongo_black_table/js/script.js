import { renderData } from './helpers.js'

const tableBody = document.querySelector('#table-body')
const tableCaption = document.querySelector('#table-caption')
const tablePanel = document.querySelector('#table-panel')
const docsLink = document.querySelector('#section-docs-link')
const segments = document.querySelectorAll('.segment')

const DOC_URLS = {
  aggregation: 'https://www.mongodb.com/docs/manual/reference/mql/aggregation-stages/',
  expressions: 'https://www.mongodb.com/docs/manual/reference/mql/expressions/',
  comparisonQuery: 'https://www.mongodb.com/docs/manual/reference/mql/query-predicates/comparison/',
}

const DOC_LABELS = {
  aggregation: 'Պաշտոնական փաստաթուղթ (aggregation stages)',
  expressions: 'Պաշտոնական փաստաթուղթ (expressions)',
  comparisonQuery: 'Պաշտոնական փաստաթուղթ (comparison query)',
}

function setActiveSegment(activeBtn) {
  segments.forEach((btn) => {
    const on = btn === activeBtn
    btn.classList.toggle('is-active', on)
    btn.setAttribute('aria-selected', on ? 'true' : 'false')
  })
}

function showSection(payload, sectionKey) {
  const rows = payload[sectionKey]
  const caption = payload.captions?.[sectionKey] ?? sectionKey

  tableBody.innerHTML = ''
  tableCaption.textContent = caption
  docsLink.href = DOC_URLS[sectionKey] ?? '#'
  docsLink.textContent = DOC_LABELS[sectionKey] ?? 'Docs'

  renderData(rows, tableBody)
}

let fadeGeneration = 0

function transitionToSection(payload, sectionKey) {
  fadeGeneration += 1
  const gen = fadeGeneration
  tablePanel.classList.add('is-fading')
  window.setTimeout(() => {
    if (gen !== fadeGeneration) return
    showSection(payload, sectionKey)
    window.requestAnimationFrame(() => {
      tablePanel.classList.remove('is-fading')
    })
  }, 220)
}

fetch('./data.json')
  .then((res) => res.json())
  .then((payload) => {
    showSection(payload, 'aggregation')

    segments.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.section
        if (!key || btn.classList.contains('is-active')) return
        setActiveSegment(btn)
        transitionToSection(payload, key)
      })
    })
  })
  .catch((err) => {
    console.error(err)
    tableBody.innerHTML = `<tr><td colspan="5">data.json բեռնումը ձախողվեց։</td></tr>`
  })
