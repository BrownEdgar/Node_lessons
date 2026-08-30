import { commandsData } from './constants.js';
import { remainingCommands } from './constants.js';
import { mcHotkeys, mcCommands } from './constants.js';



// Добавляем оставшиеся, гарантируя уникальность порядковых номеров N до 105
let combinedData = [...commandsData];
let counter = combinedData.length;
remainingCommands.forEach(item => {
  counter++;
  combinedData.push({
    cmd: item.cmd,
    desc: `${item.desc} (вариация/доп.назначение)`,
    cat: item.cat,
    diff: item.diff,
    danger: item.danger,
    ex: item.ex,
    link: item.link
  });
});

const extraData = [
  {
    cmd: 'sudo apt update && sudo apt upgrade',
    task: 'Обновить систему и пакеты',
    example: 'sudo apt update && sudo apt upgrade',
    tip: 'Сначала обновляйте индексы, потом пакеты.'
  },
  {
    cmd: 'ls -la',
    task: 'Показать скрытые файлы и атрибуты',
    example: 'ls -la /home/user',
    tip: 'Полезно для проверки структуры папок.'
  },
  {
    cmd: 'df -h',
    task: 'Проверить свободное место на дисках',
    example: 'df -h /',
    tip: 'Помогает быстро увидеть переполнение диска.'
  },
  {
    cmd: 'grep -R "error" /var/log',
    task: 'Найти ошибки в логах',
    example: 'grep -R "error" /var/log',
    tip: 'Ищите по ключевым словам, чтоб не читать весь лог.'
  },
  {
    cmd: 'systemctl status nginx',
    task: 'Проверить состояние сервиса',
    example: 'sudo systemctl status nginx',
    tip: 'Показывает статус, активность и ошибки сервиса.'
  },
  {
    cmd: 'tar -czf backup.tar.gz folder/',
    task: 'Создать архив папки',
    example: 'tar -czf backup.tar.gz /var/www',
    tip: 'Используйте .tar.gz для обычного сжатия.'
  },
  {
    cmd: 'curl -I https://example.com',
    task: 'Проверить доступность сайта',
    example: 'curl -I https://example.com',
    tip: 'Удобно для быстрой проверки HTTP ответа.'
  },
  {
    cmd: 'chmod 755 script.sh',
    task: 'Сделать скрипт исполняемым',
    example: 'chmod 755 script.sh',
    tip: 'Права 755 — стандарт для исполняемых скриптов.'
  }
];

const tableBody = document.getElementById('cmdTable');
const extraTableBody = document.getElementById('extraTable');
const mcHotkeysTableBody = document.getElementById('mcHotkeysTable');
const mcCommandsTableBody = document.getElementById('mcCommandsTable');

// Функция для рендеринга таблицы
function renderTable(data) {
  // Очищаем старые строки, оставляя только первую строку заголовков
  const headers = tableBody.querySelectorAll('.table-header');
  tableBody.innerHTML = '';
  headers.forEach(h => tableBody.appendChild(h));

  data.forEach((row, index) => {
    const isEven = index % 2 === 0 ? 'row-even' : 'row-odd';

    const cellN = `<div class="table-cell ${isEven}">${index + 1}</div>`;
    const cellCmd = `<div class="table-cell ${isEven}"><strong><code>${row.cmd}</code></strong></div>`;
    const cellDesc = `<div class="table-cell flex-column ${isEven}">${row.desc}<a href="${row.link}" target="_blank" class="btn-link">Docs</a></div>`;
    const cellCat = `<div class="table-cell ${isEven}">${row.cat}</div>`;

    let diffClass = row.diff === 'Низкая' ? 'bg-low' : (row.diff === 'Средняя' ? 'bg-medium' : 'bg-high');
    const cellDiff = `<div class="table-cell ${isEven}"><span class="badge ${diffClass}">${row.diff}</span></div>`;

    let dangerClass = row.danger === 'Низкая' ? 'bg-low' : (row.danger === 'Средняя' ? 'bg-medium' : 'bg-high');
    const cellDanger = `<div class="table-cell ${isEven}"><span class="badge ${dangerClass}">${row.danger}</span></div>`;

    const cellEx = `<div class="table-cell ${isEven}"><pre class="example-block">${row.ex}</pre></div>`;

    tableBody.insertAdjacentHTML('beforeend', cellN + cellCmd + cellDesc + cellCat + cellDiff + cellDanger + cellEx);
  });
}

function renderExtraTable(data) {
  const headers = extraTableBody.querySelectorAll('.table-header');
  extraTableBody.innerHTML = '';
  headers.forEach(h => extraTableBody.appendChild(h));

  data.forEach((row, index) => {
    const isEven = index % 2 === 0 ? 'row-even' : 'row-odd';
    const cellN = `<div class="table-cell ${isEven}">${index + 1}</div>`;
    const cellCmd = `<div class="table-cell ${isEven}"><strong><code>${row.cmd}</code></strong></div>`;
    const cellTask = `<div class="table-cell ${isEven}">${row.task}</div>`;
    const cellExample = `<div class="table-cell ${isEven}"><pre class="example-block">${row.example}</pre></div>`;
    const cellTip = `<div class="table-cell ${isEven}">${row.tip}</div>`;

    extraTableBody.insertAdjacentHTML('beforeend', cellN + cellCmd + cellTask + cellExample + cellTip);
  });
}

function renderMcHotkeysTable(data) {
  const headers = mcHotkeysTableBody.querySelectorAll('.table-header');
  mcHotkeysTableBody.innerHTML = '';
  headers.forEach(h => mcHotkeysTableBody.appendChild(h));

  data.forEach((row, index) => {
    const isEven = index % 2 === 0 ? 'row-even' : 'row-odd';
    const cellN = `<div class="table-cell ${isEven}">${index + 1}</div>`;
    const cellKey = `<div class="table-cell ${isEven}"><kbd class="mc-key">${row.key}</kbd></div>`;
    const cellAction = `<div class="table-cell ${isEven}">${row.action}</div>`;
    const cellGroup = `<div class="table-cell ${isEven}">${row.group}</div>`;
    const cellNote = `<div class="table-cell ${isEven}">${row.note}</div>`;

    mcHotkeysTableBody.insertAdjacentHTML('beforeend', cellN + cellKey + cellAction + cellGroup + cellNote);
  });
}

function renderMcCommandsTable(data) {
  const headers = mcCommandsTableBody.querySelectorAll('.table-header');
  mcCommandsTableBody.innerHTML = '';
  headers.forEach(h => mcCommandsTableBody.appendChild(h));

  data.forEach((row, index) => {
    const isEven = index % 2 === 0 ? 'row-even' : 'row-odd';
    const cellN = `<div class="table-cell ${isEven}">${index + 1}</div>`;
    const cellCmd = `<div class="table-cell ${isEven}"><strong><code>${row.cmd}</code></strong></div>`;
    const cellTask = `<div class="table-cell ${isEven}">${row.task}</div>`;
    const cellExample = `<div class="table-cell ${isEven}"><pre class="example-block">${row.example}</pre></div>`;
    const cellTip = `<div class="table-cell ${isEven}">${row.tip}</div>`;

    mcCommandsTableBody.insertAdjacentHTML('beforeend', cellN + cellCmd + cellTask + cellExample + cellTip);
  });
}

renderTable(combinedData);
renderExtraTable(extraData);
renderMcHotkeysTable(mcHotkeys);
renderMcCommandsTable(mcCommands);

// Функция поиска
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const value = searchInput.value.toLowerCase();
  const filteredData = combinedData.filter(item => {
    return item.cmd.toLowerCase().includes(value) ||
      item.desc.toLowerCase().includes(value) ||
      item.cat.toLowerCase().includes(value);
  });
  renderTable(filteredData);
});

// Поиск по горячим клавишам MC
const mcSearchInput = document.getElementById('mcSearchInput');
mcSearchInput.addEventListener('input', () => {
  const value = mcSearchInput.value.toLowerCase();
  const filteredHotkeys = mcHotkeys.filter(item => {
    return item.key.toLowerCase().includes(value) ||
      item.action.toLowerCase().includes(value) ||
      item.group.toLowerCase().includes(value);
  });
  renderMcHotkeysTable(filteredHotkeys);
});

// Функция сортировки
let sortDirection = false;
const keys = ['n', 'cmd', 'desc', 'cat', 'diff', 'danger'];

function sortTable(columnIndex) {
  sortDirection = !sortDirection;

  if (columnIndex === 0) {
    combinedData.sort((a, b) => sortDirection ? 1 : -1);
  } else if (columnIndex < keys.length) {
    const key = keys[columnIndex];
    combinedData.sort((a, b) => {
      let valA = a[key] ? a[key].toLowerCase() : '';
      let valB = b[key] ? b[key].toLowerCase() : '';
      return sortDirection ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });
  }
  renderTable(combinedData);
}

// Event delegation для сортировки
tableBody.addEventListener('click', (e) => {
  const header = e.target.closest('.table-header');
  if (header && header.dataset.column !== undefined) {
    const columnIndex = parseInt(header.dataset.column);
    sortTable(columnIndex);
  }
});

const tabButtons = document.querySelectorAll('.tab-button');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    const target = button.dataset.tab;

    tabButtons.forEach(item => {
      const isActive = item === button;
      item.classList.toggle('active', isActive);
      item.setAttribute('aria-selected', String(isActive));
    });

    tabPanels.forEach(panel => {
      const isActive = panel.id === `tab-${target}`;
      panel.classList.toggle('active', isActive);
    });
  });
});
