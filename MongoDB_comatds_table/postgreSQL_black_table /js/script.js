import { renderData } from './helpers.js'

const tableBody = document.querySelector('#table-body')
const tableCaption = document.querySelector('#table-caption')
const tablePanel = document.querySelector('#table-panel')
const docsLink = document.querySelector('#section-docs-link')
const segments = document.querySelectorAll('.segment')

const pgIntro = document.querySelector('.pg-intro')
const migrationsIntro = document.querySelector('.migrations-intro')
const dbmanageIntro = document.querySelector('.dbmanage-intro')
const psqlIntro = document.querySelector('.psql-intro')
const advancedIntro = document.querySelector('.advanced-intro')

const DOC_URLS = {
  queries: 'https://www.postgresql.org/docs/current/sql-select.html',
  ddl: 'https://www.postgresql.org/docs/current/ddl.html',
  functions: 'https://www.postgresql.org/docs/current/functions.html',
  migrations: 'https://www.postgresql.org/docs/current/ddl-alter.html',
  dbmanage: 'https://www.postgresql.org/docs/current/managing-databases.html',
  psql: 'https://www.postgresql.org/docs/current/app-psql.html',
  advanced: 'https://www.postgresql.org/docs/current/server-programming.html',
}

const DOC_LABELS = {
  queries: 'Официальная документация PostgreSQL (SELECT & Queries)',
  ddl: 'Официальная документация PostgreSQL (DDL Commands)',
  functions: 'Официальная документация PostgreSQL (Functions)',
  migrations: 'Официальная документация PostgreSQL (ALTER TABLE)',
  dbmanage: 'Официальная документация PostgreSQL (Managing Databases)',
  psql: 'Официальная документация PostgreSQL (psql — App Reference)',
  advanced: 'Официальная документация PostgreSQL (Server Programming)',
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
  tablePanel.dataset.section = sectionKey

  if (pgIntro) pgIntro.classList.toggle('is-hidden', sectionKey !== 'queries')
  if (migrationsIntro) migrationsIntro.classList.toggle('is-hidden', sectionKey !== 'migrations')
  if (dbmanageIntro) dbmanageIntro.classList.toggle('is-hidden', sectionKey !== 'dbmanage')
  if (psqlIntro) psqlIntro.classList.toggle('is-hidden', sectionKey !== 'psql')
  if (advancedIntro) advancedIntro.classList.toggle('is-hidden', sectionKey !== 'advanced')

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
    showSection(payload, 'queries')

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
    tableBody.innerHTML = `<tr><td colspan="5">Ошибка загрузки data.json</td></tr>`
  })
