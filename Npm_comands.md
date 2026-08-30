# commands

0. npm i <packageName> | npm i <packageName>@4.21.12
1. npm uninstall mongoose | npm un mongoose
2. npm outdated
3. npm list --depth=0

⚠️ ВНИМАНИЕ

Команда безвозвратно удаляет все node_modules внутри Node_lessons.

✅ Команда удаления всех node_modules рекурсивно
cd /путь/к/Node_lessons

find . -name "node_modules" -type d -prune -exec rm -rf {} +

📌 Что здесь происходит:

find . — ищем внутри текущей папки
-name "node_modules" — только папки node_modules
-type d — именно директории
-prune — не заходим внутрь (важно для скорости)
rm -rf — удаление без вопросов

🔍 Если хочешь сначала ТОЛЬКО посмотреть, что будет удалено
find . -name "node_modules" -type d -prune
