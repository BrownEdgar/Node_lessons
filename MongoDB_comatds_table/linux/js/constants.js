export const commandsData = [
  // Навигация по файловой системе
  { cmd: "pwd", desc: "Выводит текущую рабочую директорию", cat: "Навигация по файловой системе", diff: "Низкая", danger: "Низкая", ex: "pwd\n# Вывод: /home/user", link: "https://man7.org/linux/man-pages/man1/pwd.1.html" },
  { cmd: "cd", desc: "Смена текущей директории", cat: "Навигация по файловой системе", diff: "Низкая", danger: "Низкая", ex: "cd /var/log\n# Переход в папку логов", link: "https://man7.org/linux/man-pages/man1/cd.1p.html" },
  { cmd: "ls", desc: "Вывод содержимого директории", cat: "Навигация по файловой системе", diff: "Низкая", danger: "Низкая", ex: "ls -la\n# Показать все файлы, включая скрытые", link: "https://man7.org/linux/man-pages/man1/ls.1.html" },
  { cmd: "pushd", desc: "Сохраняет текущую директорию в стек и переходит в новую", cat: "Навигация по файловой системе", diff: "Средняя", danger: "Низкая", ex: "pushd /var/www\n# Переход в каталог с запоминанием старого", link: "https://man7.org/linux/man-pages/man1/pushd.1p.html" },
  { cmd: "popd", desc: "Возвращает в директорию, сохраненную в стеке командой pushd", cat: "Навигация по файловой системе", diff: "Средняя", danger: "Низкая", ex: "popd\n# Возврат в предыдущее место", link: "https://man7.org/linux/man-pages/man1/popd.1p.html" },
  { cmd: "dirs", desc: "Показывает список элементов в стеке директорий", cat: "Навигация по файловой системе", diff: "Средняя", danger: "Низкая", ex: "dirs -v\n# Показать стек с номерами", link: "https://man7.org/linux/man-pages/man1/dirs.1p.html" },

  // Работа с файлами и директориями
  { cmd: "mkdir", desc: "Создание новой папки", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "mkdir -p /tmp/site/images\n# Создать структуру папок", link: "https://man7.org/linux/man-pages/man1/mkdir.1.html" },
  { cmd: "touch", desc: "Создание пустого файла или обновление времени изменения", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "touch file.txt\n# Создать пустой file.txt", link: "https://man7.org/linux/man-pages/man1/touch.1.html" },
  { cmd: "cp", desc: "Копирование файлов или папок", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Средняя", ex: "cp -r /src /backup\n# Рекурсивное копирование папки", link: "https://man7.org/linux/man-pages/man1/cp.1.html" },
  { cmd: "mv", desc: "Перемещение или переименование файлов/директорий", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Средняя", ex: "mv old.txt new.txt\n# Переименовать файл", link: "https://man7.org/linux/man-pages/man1/mv.1.html" },
  { cmd: "rm", desc: "Удаление файлов или директорий", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Высокая", ex: "rm -rf /tmp/junk\n# Удалить папку БЕЗ подтверждения!", link: "https://man7.org/linux/man-pages/man1/rm.1.html" },
  { cmd: "rmdir", desc: "Удаление пустых папок", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "rmdir empty_dir\n# Удалит только если папка пуста", link: "https://man7.org/linux/man-pages/man1/rmdir.1.html" },
  { cmd: "ln", desc: "Создание жестких или символических ссылок", cat: "Работа с файлами и директориями", diff: "Средняя", danger: "Низкая", ex: "ln -s /target /link_name\n# Создать симлинк", link: "https://man7.org/linux/man-pages/man1/ln.1.html" },
  { cmd: "file", desc: "Определение типа содержимого файла", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "file picture.png\n# Покажет истинный формат файла", link: "https://man7.org/linux/man-pages/man1/file.1.html" },
  { cmd: "stat", desc: "Вывод подробной информации о файле или ФС", cat: "Работа с файлами и директориями", diff: "Средняя", danger: "Низкая", ex: "stat document.docx\n# Показать права, размер и даты", link: "https://man7.org/linux/man-pages/man1/stat.1.html" },
  { cmd: "basename", desc: "Выделяет имя файла из полного пути", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "basename /var/log/nginx/access.log\n# Выведет: access.log", link: "https://man7.org/linux/man-pages/man1/basename.1.html" },
  { cmd: "dirname", desc: "Выделяет путь к папке из полного пути файла", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "dirname /var/log/nginx/access.log\n# Выведет: /var/log/nginx", link: "https://man7.org/linux/man-pages/man1/dirname.1.html" },

  // Поиск
  { cmd: "find", desc: "Поиск файлов и папок на основе условий", cat: "Поиск", diff: "Высокая", danger: "Низкая", ex: "find /home -name '*.mp3'\n# Найти все mp3 в /home", link: "https://man7.org/linux/man-pages/man1/find.1.html" },
  { cmd: "locate", desc: "Быстрый поиск файлов с использованием базы данных индекса", cat: "Поиск", diff: "Низкая", danger: "Низкая", ex: "locate nginx.conf\n# Быстрый поиск по всей системе", link: "https://man7.org/linux/man-pages/man1/locate.1.html" },
  { cmd: "updatedb", desc: "Обновление базы данных для утилиты locate", cat: "Поиск", diff: "Средняя", danger: "Низкая", ex: "sudo updatedb\n# Актуализировать индекс файлов", link: "https://man7.org/linux/man-pages/man8/updatedb.8.html" },
  { cmd: "which", desc: "Показывает полный путь к исполняемому файлу команды", cat: "Поиск", diff: "Низкая", danger: "Низкая", ex: "which python3\n# Выведет например /usr/bin/python3", link: "https://man7.org/linux/man-pages/man1/which.1.html" },
  { cmd: "whereis", desc: "Поиск исполняемых файлов, исходников и мануалов программы", cat: "Поиск", diff: "Низкая", danger: "Низкая", ex: "whereis php\n# Найти бинарник и документацию PHP", link: "https://man7.org/linux/man-pages/man1/whereis.1.html" },
  { cmd: "grep", desc: "Поиск строк, соответствующих шаблону, в файлах", cat: "Поиск", diff: "Средняя", danger: "Низкая", ex: "grep -i 'error' auth.log\n# Найти 'error' без учета регистра", link: "https://man7.org/linux/man-pages/man1/grep.1.html" },

  // Просмотр файлов
  { cmd: "cat", desc: "Вывод содержимого файла на экран (или объединение)", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "cat /etc/hostname\n# Показать имя хоста", link: "https://man7.org/linux/man-pages/man1/cat.1.html" },
  { cmd: "less", desc: "Постраничный просмотр файлов с обратной навигацией", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "less /var/log/syslog\n# Удобный просмотр большого лога", link: "https://man7.org/linux/man-pages/man1/less.1.html" },
  { cmd: "more", desc: "Примитивный постраничный просмотр (только вперед)", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "more config.txt\n# Постраничный вывод текста", link: "https://man7.org/linux/man-pages/man1/more.1.html" },
  { cmd: "head", desc: "Вывод первых строк файла (по умолчанию 10)", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "head -n 5 list.txt\n# Показать первые 5 строк", link: "https://man7.org/linux/man-pages/man1/head.1.html" },
  { cmd: "tail", desc: "Вывод последних строк файла", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "tail -f /var/log/nginx/error.log\n# Следить за логом в реальном времени", link: "https://man7.org/linux/man-pages/man1/tail.1.html" },
  { cmd: "tac", desc: "Вывод файла в обратном порядке (снизу вверх)", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "tac reversed.txt\n# Последняя строка станет первой", link: "https://man7.org/linux/man-pages/man1/tac.1.html" },
  { cmd: "nl", desc: "Вывод файла с нумерацией строк", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "nl script.sh\n# Пронумеровать строки кода при выводе", link: "https://man7.org/linux/man-pages/man1/nl.1.html" },
  { cmd: "od", desc: "Дамп файлов в восьмеричном, шестнадцатеричном форматах", cat: "Просмотр файлов", diff: "Высокая", danger: "Низкая", ex: "od -tx1 binary.bin\n# Посмотреть байты бинарного файла", link: "https://man7.org/linux/man-pages/man1/od.1.html" },

  // Работа с текстом
  { cmd: "awk", desc: "Мощный язык обработки строк и генерации отчетов", cat: "Работа с текстом", diff: "Высокая", danger: "Низкая", ex: "awk -F: '{print $1}' /etc/passwd\n# Вывести только имена пользователей", link: "https://man7.org/linux/man-pages/man1/awk.1p.html" },
  { cmd: "sed", desc: "Потоковый текстовый редактор (замена, удаление)", cat: "Работа с текстом", diff: "Высокая", danger: "Средняя", ex: "sed -i 's/false/true/g' conf.json\n# Заменить все false на true внутри файла", link: "https://man7.org/linux/man-pages/man1/sed.1.html" },
  { cmd: "wc", desc: "Подсчет строк, слов и байт в файле", cat: "Работа с текстом", diff: "Низкая", danger: "Низкая", ex: "wc -l text.txt\n# Посчитать количество строк в файле", link: "https://man7.org/linux/man-pages/man1/wc.1.html" },
  { cmd: "sort", desc: "Сортировка строк текстовых файлов", cat: "Работа с текстом", diff: "Низкая", danger: "Низкая", ex: "sort names.txt\n# Отсортировать список по алфавиту", link: "https://man7.org/linux/man-pages/man1/sort.1.html" },
  { cmd: "uniq", desc: "Удаление или фильтрация повторяющихся строк (нужен sort)", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "sort n.txt | uniq -c\n# Посчитать дубликаты каждой строки", link: "https://man7.org/linux/man-pages/man1/uniq.1.html" },
  { cmd: "cut", desc: "Вырезание отдельных полей или секций из строк", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "cut -d',' -f2 data.csv\n# Вырезать вторую колонку из CSV", link: "https://man7.org/linux/man-pages/man1/cut.1.html" },
  { cmd: "tr", desc: "Преобразование или удаление символов", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "echo 'hello' | tr '[a-z]' '[A-Z]'\n# Перевести строку в верхний регистр", link: "https://man7.org/linux/man-pages/man1/tr.1.html" },
  { cmd: "diff", desc: "Сравнение двух файлов построчно", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "diff file1.txt file2.txt\n# Показать разницу между файлами", link: "https://man7.org/linux/man-pages/man1/diff.1.html" },
  { cmd: "xargs", desc: "Формирование и выполнение команд из стандартного ввода", cat: "Работа с текстом", diff: "Высокая", danger: "Средняя", ex: "find . -name '*.tmp' | xargs rm\n# Найти и удалить все файлы .tmp", link: "https://man7.org/linux/man-pages/man1/xargs.1.html" },
  { cmd: "tee", desc: "Чтение из стандартного ввода и запись в вывод и файл одновременно", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "echo 'Log' | tee -a app.log\n# Вывести на экран и дописать в лог", link: "https://man7.org/linux/man-pages/man1/tee.1.html" },

  // Права доступа
  { cmd: "chmod", desc: "Изменение прав доступа к файлам и папкам", cat: "Права доступа", diff: "Средняя", danger: "Высокая", ex: "chmod +x script.sh\n# Сделать скрипт исполняемым", link: "https://man7.org/linux/man-pages/man1/chmod.1.html" },
  { cmd: "chown", desc: "Смена владельца и/или группы файла", cat: "Права доступа", diff: "Средняя", danger: "Высокая", ex: "sudo chown -R www-data:www-data /var/www\n# Сменить владельца на www-data", link: "https://man7.org/linux/man-pages/man1/chown.1.html" },
  { cmd: "chgrp", desc: "Смена только группы файла", cat: "Права доступа", diff: "Средняя", danger: "Средняя", ex: "chgrp developers code.py\n# Сменить группу файла на developers", link: "https://man7.org/linux/man-pages/man1/chgrp.1.html" },
  { cmd: "umask", desc: "Установка маски создания прав для новых файлов", cat: "Права доступа", diff: "Высокая", danger: "Средняя", ex: "umask 022\n# Установить дефолтные права (755 для папок)", link: "https://man7.org/linux/man-pages/man1/umask.1p.html" },
  { cmd: "chattr", desc: "Изменение специальных атрибутов файлов (например, неизменяемость)", cat: "Права доступа", diff: "Высокая", danger: "Высокая", ex: "sudo chattr +i important.conf\n# Запретить любое изменение/удаление файла", link: "https://man7.org/linux/man-pages/man1/chattr.1.html" },
  { cmd: "lsattr", desc: "Просмотр специальных атрибутов файлов Ext4", cat: "Права доступа", diff: "Средняя", danger: "Низкая", ex: "lsattr important.conf\n# Посмотреть, стоит ли флаг +i", link: "https://man7.org/linux/man-pages/man1/lsattr.1.html" },
  { cmd: "sudo", desc: "Выполнение команды от имени суперпользователя (root)", cat: "Права доступа", diff: "Низкая", danger: "Высокая", ex: "sudo apt update\n# Обновить пакеты с правами root", link: "https://man7.org/linux/man-pages/man8/sudo.8.html" },
  { cmd: "su", desc: "Смена текущего пользователя или вход под root", cat: "Права доступа", diff: "Средняя", danger: "Высокая", ex: "su - admin\n# Зайти в систему под юзером admin", link: "https://man7.org/linux/man-pages/man1/su.1.html" },

  // Процессы
  { cmd: "ps", desc: "Снимок текущих запущенных процессов", cat: "Просмотр файлов", diff: "Средняя", danger: "Низкая", ex: "ps aux\n# Показать абсолютно все процессы в системе", link: "https://man7.org/linux/man-pages/man1/ps.1.html" },
  { cmd: "top", desc: "Интерактивный монитор процессов в реальном времени", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "top\n# Запуск динамического диспетчера задач", link: "https://man7.org/linux/man-pages/man1/top.1.html" },
  { cmd: "htop", desc: "Продвинутый цветной интерактивный монитор процессов", cat: "Процессы", diff: "Низкая", danger: "Низкая", ex: "htop\n# Запуск (требует установки, удобнее top)", link: "https://man7.org/linux/man-pages/man1/htop.1.html" },
  { cmd: "kill", desc: "Отправка сигнала процессу (обычно для завершения) по PID", cat: "Процессы", diff: "Средняя", danger: "Высокая", ex: "kill -9 1234\n# Принудительно убить процесс с PID 1234", link: "https://man7.org/linux/man-pages/man1/kill.1.html" },
  { cmd: "killall", desc: "Завершение всех процессов по их имени", cat: "Процессы", diff: "Средняя", danger: "Высокая", ex: "killall nginx\n# Завершить все процессы веб-сервера nginx", link: "https://man7.org/linux/man-pages/man1/killall.1.html" },
  { cmd: "pkill", desc: "Завершение процессов на основе шаблона имени или свойств", cat: "Процессы", diff: "Средняя", danger: "Высокая", ex: "pkill -u tyler\n# Завершить все процессы пользователя tyler", link: "https://man7.org/linux/man-pages/man1/pkill.1.html" },
  { cmd: "bg", desc: "Перевод задачи в фоновый режим", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "bg %1\n# Продолжить выполнение остановленной задачи №1 в фоне", link: "https://man7.org/linux/man-pages/man1/bg.1p.html" },
  { cmd: "fg", desc: "Вывод фоновой задачи на передний план", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "fg %1\n# Вернуть задачу №1 на передний план", link: "https://man7.org/linux/man-pages/man1/fg.1p.html" },
  { cmd: "jobs", desc: "Список текущих задач терминала", cat: "Процессы", diff: "Низкая", danger: "Низкая", ex: "jobs\n# Показать фоновые задачи текущей сессии", link: "https://man7.org/linux/man-pages/man1/jobs.1p.html" },
  { cmd: "nohup", desc: "Запуск команды, устойчивой к обрыву связи (SIGHUP)", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "nohup node server.js &\n# Запустить сервер, чтобы он не упал при закрытии терминала", link: "https://man7.org/linux/man-pages/man1/nohup.1.html" },

  // Системная информация
  { cmd: "uname", desc: "Информация о ядре и системе", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "uname -a\n# Показать полную информацию о версии ядра", link: "https://man7.org/linux/man-pages/man1/uname.1.html" },
  { cmd: "hostnamectl", desc: "Управление и просмотр имени хоста и связанных параметров", cat: "Системная информация", diff: "Низкая", danger: "Средняя", ex: "hostnamectl set-hostname new-server\n# Сменить имя машины", link: "https://man7.org/linux/man-pages/man1/hostnamectl.1.html" },
  { cmd: "uptime", desc: "Время непрерывной работы системы и средняя нагрузка (LA)", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "uptime\n# Узнать сколько дней работает сервер без ребута", link: "https://man7.org/linux/man-pages/man1/uptime.1.html" },
  { cmd: "free", desc: "Показывает использование оперативной памяти (ОЗУ/Swap)", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "free -h\n# Показать память в мегабайтах и гигабайтах", link: "https://man7.org/linux/man-pages/man1/free.1.html" },
  { cmd: "lshw", desc: "Вывод детальной конфигурации аппаратного обеспечения (железа)", cat: "Системная информация", diff: "Высокая", danger: "Низкая", ex: "sudo lshw -short\n# Краткий отчет обо всем железе", link: "https://man7.org/linux/man-pages/man1/lshw.1.html" },
  { cmd: "lscpu", desc: "Подробная информация об архитектуре процессора (CPU)", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "lscpu\n# Показать ядра, кэш, модель процессора", link: "https://man7.org/linux/man-pages/man1/lscpu.1.html" },
  { cmd: "lsusb", desc: "Список подключенных USB-устройств", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "lsusb\n# Посмотреть подключенные флешки, мыши", link: "https://man7.org/linux/man-pages/man8/lsusb.8.html" },
  { cmd: "lspci", desc: "Список всех PCI-устройств (видеокарты, сетевые адаптеры)", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "lspci | grep VGA\n# Посмотреть модель видеокарты", link: "https://man7.org/linux/man-pages/man8/lspci.8.html" },
  { cmd: "dmesg", desc: "Просмотр буфера сообщений ядра (логи загрузки и драйверов)", cat: "Системная информация", diff: "Высокая", danger: "Низкая", ex: "dmesg -T | tail\n# Показать последние сообщения ядра с человеческим временем", link: "https://man7.org/linux/man-pages/man1/dmesg.1.html" },
  { cmd: "arch", desc: "Выводит архитектуру процессора машины", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "arch\n# Вывод: x86_64 или aarch64", link: "https://man7.org/linux/man-pages/man1/arch.1.html" },

  // Работа с дисками
  { cmd: "df", desc: "Анализ свободного места на смонтированных дисках", cat: "Работа с дисками", diff: "Низкая", danger: "Низкая", ex: "df -h\n# Показать свободное место на дисках в понятном виде", link: "https://man7.org/linux/man-pages/man1/df.1.html" },
  { cmd: "du", desc: "Оценка занимаемого места файлами и папками на диске", cat: "Работа с дисками", diff: "Средняя", danger: "Низкая", ex: "du -sh /var/log\n# Показать общий вес папки /var/log", link: "https://man7.org/linux/man-pages/man1/du.1.html" },
  { cmd: "fdisk", desc: "Утилита для управления таблицами разделов дисков", cat: "Работа с дисками", diff: "Высокая", danger: "Высокая", ex: "sudo fdisk -l\n# Вывести список всех дисков и их разделов", link: "https://man7.org/linux/man-pages/man8/fdisk.8.html" },
  { cmd: "lsblk", desc: "Вывод древовидного списка блочных устройств (дисков)", cat: "Работа с дисками", diff: "Низкая", danger: "Низкая", ex: "lsblk\n# Наглядно увидеть диски и их разделы (sda1, sda2...)", link: "https://man7.org/linux/man-pages/man8/lsblk.8.html" },
  { cmd: "mount", desc: "Монтирование файловых систем/дисков к папкам", cat: "Работа с дисками", diff: "Средняя", danger: "Средняя", ex: "sudo mount /dev/sdb1 /mnt/usb\n# Примонтировать флешку в папку /mnt/usb", link: "https://man7.org/linux/man-pages/man8/mount.8.html" },
  { cmd: "umount", desc: "Размонтирование файловых систем", cat: "Работа с дисками", diff: "Средняя", danger: "Средняя", ex: "sudo umount /mnt/usb\n# Безопасное извлечение флешки", link: "https://man7.org/linux/man-pages/man8/umount.8.html" },
  { cmd: "mkfs", desc: "Форматирование раздела диска (создание файловой системы)", cat: "Работа с дисками", diff: "Высокая", danger: "Высокая", ex: "sudo mkfs.ext4 /dev/sdb1\n# Стереть всё и форматировать раздел в Ext4", link: "https://man7.org/linux/man-pages/man8/mkfs.8.html" },
  { cmd: "fsck", desc: "Проверка и восстановление целостности файловых систем", cat: "Работа с дисками", diff: "Высокая", danger: "Высокая", ex: "sudo fsck /dev/sda1\n# Проверить системный раздел на ошибки", link: "https://man7.org/linux/man-pages/man8/fsck.8.html" },

  // Сеть
  { cmd: "ping", desc: "Проверка доступности удаленного хоста по сети", cat: "Сеть", diff: "Низкая", danger: "Низкая", ex: "ping -c 4 google.com\n# Отправить 4 пакета к Google", link: "https://man7.org/linux/man-pages/man8/ping.8.html" },
  { cmd: "ifconfig", desc: "Настройка и просмотр сетевых интерфейсов (устаревает)", cat: "Сеть", diff: "Низкая", danger: "Средняя", ex: "ifconfig eth0\n# Посмотреть IP-адрес интерфейса eth0", link: "https://man7.org/linux/man-pages/man8/ifconfig.8.html" },
  { cmd: "ip", desc: "Современная мощная замена ifconfig для управления сетью", cat: "Сеть", diff: "Средняя", danger: "Средняя", ex: "ip a\n# Показать все IP адреса сетевых карт", link: "https://man7.org/linux/man-pages/man8/ip-address.8.html" },
  { cmd: "curl", desc: "Утилита для передачи данных с/на сервер (HTTP/FTP/и др.)", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "curl -I https://github.com\n# Получить только HTTP заголовки сайта", link: "https://man7.org/linux/man-pages/man1/curl.1.html" },
  { cmd: "wget", desc: "Консольный менеджер закачки файлов из сети", cat: "Сеть", diff: "Низкая", danger: "Низкая", ex: "wget https://example.com/file.zip\n# Скачать файл в текущую папку", link: "https://man7.org/linux/man-pages/man1/wget.1.html" },
  { cmd: "netstat", desc: "Просмотр сетевых соединений и таблиц маршрутизации (устаревает)", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "netstat -tuln\n# Показать все слушаемые порты", link: "https://man7.org/linux/man-pages/man8/netstat.8.html" },
  { cmd: "ss", desc: "Современный аналог netstat, вывод сетевой статистики", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "ss -tulpn\n# Быстро посмотреть какие процессы слушают порты", link: "https://man7.org/linux/man-pages/man8/ss.8.html" },
  { cmd: "traceroute", desc: "Трассировка маршрута сетевых пакетов до хоста", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "traceroute 1.1.1.1\n# Показать через какие роутеры идет трафик", link: "https://man7.org/linux/man-pages/man8/traceroute.8.html" },
  { cmd: "dig", desc: "Запросы к DNS-серверам для получения информации о доменах", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "dig google.com A\n# Узнать IP-адрес домена google.com", link: "https://man7.org/linux/man-pages/man1/dig.1.html" },
  { cmd: "nslookup", desc: "Интерактивный запрос к серверам имен DNS", cat: "Сеть", diff: "Низкая", danger: "Низкая", ex: "nslookup yandex.ru\n# Найти IP-адрес для Яндекса", link: "https://man7.org/linux/man-pages/man1/nslookup.1.html" },
  { cmd: "ssh", desc: "Безопасное удаленное подключение по протоколу SSH", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "ssh root@192.168.1.50\n# Подключиться к удаленному серверу", link: "https://man7.org/linux/man-pages/man1/ssh.1.html" },
  { cmd: "scp", desc: "Безопасное копирование файлов между ПК по сети через SSH", cat: "Сеть", diff: "Средняя", danger: "Средняя", ex: "scp dump.sql user@remote:/tmp\n# Отправить файл на удаленный сервер", link: "https://man7.org/linux/man-pages/man1/scp.1.html" },

  // Архивы
  { cmd: "tar", desc: "Работа с архивами (упаковка, распаковка без/с сжатием)", cat: "Архивы", diff: "Средняя", danger: "Низкая", ex: "tar -czf archive.tar.gz /data\n# Создать сжатый архив папки", link: "https://man7.org/linux/man-pages/man1/tar.1.html" },
  { cmd: "gzip", desc: "Сжатие файлов (заменяет оригинальный файл на .gz)", cat: "Архивы", diff: "Низкая", danger: "Средняя", ex: "gzip logs.txt\n# Сжать файл (появится logs.txt.gz)", link: "https://man7.org/linux/man-pages/man1/gzip.1.html" },
  { cmd: "gunzip", desc: "Распаковка файлов .gz", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "gunzip logs.txt.gz\n# Восстановить оригинальный файл", link: "https://man7.org/linux/man-pages/man1/gunzip.1.html" },
  { cmd: "zip", desc: "Создание классических ZIP архивов", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "zip -r project.zip ./src\n# Заархивировать папку src", link: "https://man7.org/linux/man-pages/man1/zip.1.html" },
  { cmd: "unzip", desc: "Распаковка архивов .zip", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "unzip project.zip -d /tmp\n# Распаковать архив в папку /tmp", link: "https://man7.org/linux/man-pages/man1/unzip.1.html" },
  { cmd: "bzip2", desc: "Высокая степень сжатия файлов (аналог gzip, но медленнее)", cat: "Архивы", diff: "Низкая", danger: "Средняя", ex: "bzip2 bigfile.iso\n# Сжать файл с расширением .bz2", link: "https://man7.org/linux/man-pages/man1/bzip2.1.html" },
  { cmd: "bunzip2", desc: "Распаковка файлов .bz2", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "bunzip2 bigfile.iso.bz2\n# Распаковать bzip2", link: "https://man7.org/linux/man-pages/man1/bunzip2.1.html" },

  // Пользователи и группы
  { cmd: "useradd", desc: "Создание нового пользователя в системе", cat: "Пользователи и группы", diff: "Средняя", danger: "Средняя", ex: "sudo useradd -m tyler\n# Создать юзера tyler с домашней папкой", link: "https://man7.org/linux/man-pages/man8/useradd.8.html" },
  { cmd: "userdel", desc: "Удаление пользователя", cat: "Пользователи и группы", diff: "Средняя", danger: "Высокая", ex: "sudo userdel -r tyler\n# Удалить юзера вместе с его домашней папкой", link: "https://man7.org/linux/man-pages/man8/userdel.8.html" },
  { cmd: "usermod", desc: "Модификация учетной записи пользователя", cat: "Пользователи и группы", diff: "Средняя", danger: "Высокая", ex: "sudo usermod -aG docker tyler\n# Добавить юзера tyler в группу docker", link: "https://man7.org/linux/man-pages/man8/usermod.8.html" },
  { cmd: "passwd", desc: "Смена пароля пользователя", cat: "Пользователи и группы", diff: "Низкая", danger: "Средняя", ex: "passwd\n# Поменять пароль текущего пользователя", link: "https://man7.org/linux/man-pages/man1/passwd.1.html" },
  { cmd: "groupadd", desc: "Создание новой группы пользователей", cat: "Пользователи и группы", diff: "Низкая", danger: "Средняя", ex: "sudo groupadd developers\n# Создать группу разработчиков", link: "https://man7.org/linux/man-pages/man8/groupadd.8.html" },
  { cmd: "groupdel", desc: "Удаление группы", cat: "Пользователи и группы", diff: "Низкая", danger: "Средняя", ex: "sudo groupdel developers\n# Удалить пустую группу", link: "https://man7.org/linux/man-pages/man8/groupdel.8.html" },
  { cmd: "id", desc: "Вывод UID, GID и групп пользователя", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "id root\n# Посмотреть идентификаторы суперпользователя", link: "https://man7.org/linux/man-pages/man1/id.1.html" },
  { cmd: "whoami", desc: "Выводит имя текущего пользователя терминала", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "whoami\n# Выведет имя под кем вы залогинены", link: "https://man7.org/linux/man-pages/man1/whoami.1.html" },
  { cmd: "w", desc: "Показывает кто в системе и что они делают", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "w\n# Список активных сессий пользователей", link: "https://man7.org/linux/man-pages/man1/w.1.html" },
  { cmd: "last", desc: "Показывает историю последних входов пользователей", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "last -n 5\n# Показать последние 5 логинов в систему", link: "https://man7.org/linux/man-pages/man1/last.1.html" },

  // Управление пакетами
  { cmd: "apt", desc: "Менеджер пакетов в Ubuntu/Debian (Установка/Обновление)", cat: "Управление пакетами", diff: "Низкая", danger: "Высокая", ex: "sudo apt install git\n# Установить Git в систему", link: "https://man7.org/linux/man-pages/man8/apt.8.html" },
  { cmd: "yum", desc: "Менеджер пакетов в старых RedHat/CentOS системиах", cat: "Управление пакетами", diff: "Низкая", danger: "Высокая", ex: "sudo yum update\n# Обновить все пакеты CentOS", link: "https://man7.org/linux/man-pages/man8/yum.8.html" },
  { cmd: "dnf", desc: "Современный менеджер пакетов для Fedora/RHEL/CentOS Stream", cat: "Управление пакетами", diff: "Низкая", danger: "Высокая", ex: "sudo dnf install htop\n# Установка пакета через dnf", link: "https://man7.org/linux/man-pages/man8/dnf.8.html" },
  { cmd: "pacman", desc: "Управление пакетами в дистрибутивах Arch Linux", cat: "Управление пакетами", diff: "Средняя", danger: "Высокая", ex: "sudo pacman -Syu\n# Синхронизировать базы и обновить всю систему", link: "https://man7.org/linux/man-pages/man8/pacman.8.html" },
  { cmd: "dpkg", desc: "Низкоуровневый менеджер .deb пакетов Debian", cat: "Управление пакетами", diff: "Средняя", danger: "Средняя", ex: "sudo dpkg -i package.deb\n# Установка скачанного локального пакета", link: "https://man7.org/linux/man-pages/man1/dpkg.1.html" },
  { cmd: "rpm", desc: "Низкоуровневый менеджер пакетов RedHat (.rpm)", cat: "Управление пакетами", diff: "Средняя", danger: "Средняя", ex: "sudo rpm -ivh package.rpm\n# Установка локального rpm пакета", link: "https://man7.org/linux/man-pages/man8/rpm.8.html" },

  // Systemd (сервисы)
  { cmd: "systemctl", desc: "Управление системными службами (сервисами) и демонами systemd", cat: "Systemd (сервисы)", diff: "Средняя", danger: "Высокая", ex: "sudo systemctl restart nginx\n# Перезапустить веб-сервер Nginx", link: "https://man7.org/linux/man-pages/man1/systemctl.1.html" },
  { cmd: "journalctl", desc: "Просмотр логов системного менеджера логов systemd-journald", cat: "Systemd (сервисы)", diff: "Средняя", danger: "Низкая", ex: "journalctl -u ssh -n 50\n# Показать последние 50 логов службы SSH", link: "https://man7.org/linux/man-pages/man1/journalctl.1.html" },

  // DevOps / разработка
  { cmd: "docker", desc: "Управление контейнерами приложений", cat: "DevOps / разработка", diff: "Высокая", danger: "Средняя", ex: "docker run -d -p 80:80 nginx\n# Запустить контейнер nginx в фоне на 80 порту", link: "https://docs.docker.com/reference/cli/docker/" },
  { cmd: "git", desc: "Распределенная система управления версиями кода", cat: "DevOps / разработка", diff: "Средняя", danger: "Низкая", ex: "git clone https://url.com\n# Склонировать репозиторий проекта", link: "https://git-scm.com/docs" },
  { cmd: "make", desc: "Утилита автоматизации сборки программ из исходников", cat: "DevOps / разработка", diff: "Высокая", danger: "Низкая", ex: "make && sudo make install\n# Скомпилировать и установить проект", link: "https://man7.org/linux/man-pages/man1/make.1.html" },
  { cmd: "cron", desc: "Демон планировщика задач (выполнение по расписанию)", cat: "DevOps / разработка", diff: "Средняя", danger: "Средняя", ex: "crontab -e\n# Открыть файл конфигурации задач cron для редактирования", link: "https://man7.org/linux/man-pages/man8/cron.8.html" },
  { cmd: "screen", desc: "Оконный менеджер терминала (сохраняет сессии при разрыве)", cat: "DevOps / разработка", diff: "Средняя", danger: "Низкая", ex: "screen -S backup\n# Создать именованную сессию screen", link: "https://man7.org/linux/man-pages/man1/screen.1.html" },
  { cmd: "tmux", desc: "Современный и мощный терминальный мультиплексор (замена screen)", cat: "DevOps / разработка", diff: "Средняя", danger: "Низкая", ex: "tmux new -s session_name\n# Создать новую независимую сессию", link: "https://man7.org/linux/man-pages/man1/tmux.1.html" }
];

export const remainingCommands = [
  { cmd: "echo", desc: "Вывод строки текста в терминал", cat: "Работа с текстом", diff: "Низкая", danger: "Низкая", ex: "echo 'Привет мир!'", link: "https://man7.org/linux/man-pages/man1/echo.1.html" },
  { cmd: "alias", desc: "Создание сокращений (псевдонимов) для сложных команд", cat: "DevOps / разработка", diff: "Низкая", danger: "Низкая", ex: "alias ll='ls -la'", link: "https://man7.org/linux/man-pages/man1/alias.1p.html" },
  { cmd: "unalias", desc: "Удаление созданного псевдонима", cat: "DevOps / разработка", diff: "Низкая", danger: "Низкая", ex: "unalias ll", link: "https://man7.org/linux/man-pages/man1/unalias.1p.html" },
  { cmd: "history", desc: "Вывод истории команд текущего пользователя", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "history | grep docker", link: "https://man7.org/linux/man-pages/man1/history.1pg.html" },
  { cmd: "clear", desc: "Очистка экрана терминала", cat: "Навигация по файловой системе", diff: "Низкая", danger: "Низкая", ex: "clear", link: "https://man7.org/linux/man-pages/man1/clear.1.html" },
  { cmd: "exit", desc: "Выход из текущей командной оболочки/терминала", cat: "Навигация по файловой системе", diff: "Низкая", danger: "Низкая", ex: "exit", link: "https://man7.org/linux/man-pages/man1/exit.1p.html" },
  { cmd: "shutdown", desc: "Выключение или перезагрузка компьютера", cat: "Системная информация", diff: "Низкая", danger: "Высокая", ex: "sudo shutdown -h now\n# Выключить ПК прямо сейчас", link: "https://man7.org/linux/man-pages/man8/shutdown.8.html" },
  { cmd: "reboot", desc: "Немедленная перезагрузка системы", cat: "Системная информация", diff: "Низкая", danger: "Высокая", ex: "sudo reboot", link: "https://man7.org/linux/man-pages/man8/reboot.8.html" },
  { cmd: "sleep", desc: "Задержка выполнения скрипта на указанное время", cat: "DevOps / разработка", diff: "Низкая", danger: "Низкая", ex: "sleep 5\n# Пауза на 5 секунд", link: "https://man7.org/linux/man-pages/man1/sleep.1.html" },
  { cmd: "passwd", desc: "Смена пароля аккаунта", cat: "Пользователи и группы", diff: "Низкая", danger: "Средняя", ex: "sudo passwd root", link: "https://man7.org/linux/man-pages/man1/passwd.1.html" },
  { cmd: "date", desc: "Вывод или настройка системной даты и времени", cat: "Системная информация", diff: "Низкая", danger: "Средняя", ex: "date", link: "https://man7.org/linux/man-pages/man1/date.1.html" },
  { cmd: "cal", desc: "Вывод простого календаря в терминал", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "cal 2026\n# Показать календарь на текущий 2026 год", link: "https://man7.org/linux/man-pages/man1/cal.1.html" },
  { cmd: "man", desc: "Просмотр официального руководства (мануала) по любой команде", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "man tar", link: "https://man7.org/linux/man-pages/man1/man.1.html" },
  { cmd: "info", desc: "Альтернативная система документации программ GNU", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "info coreutils", link: "https://man7.org/linux/man-pages/man1/info.1.html" },
  { cmd: "export", desc: "Установка переменных окружения (Environment Variables)", cat: "DevOps / разработка", diff: "Средняя", danger: "Низкая", ex: "export NODE_ENV=production", link: "https://man7.org/linux/man-pages/man1/export.1p.html" },
  { cmd: "env", desc: "Просмотр всех переменных окружения системы", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "env", link: "https://man7.org/linux/man-pages/man1/env.1.html" },
  { cmd: "chsh", desc: "Смена дефолтной оболочки пользователя (Shell)", cat: "Пользователи и группы", diff: "Средняя", danger: "Средняя", ex: "chsh -s /bin/zsh", link: "https://man7.org/linux/man-pages/man1/chsh.1.html" },
  { cmd: "groups", desc: "Показывает в каких группах состоит пользователь", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "groups tyler", link: "https://man7.org/linux/man-pages/man1/groups.1.html" },
  { cmd: "paste", desc: "Объединение строк из нескольких файлов параллельно", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "paste f1.txt f2.txt", link: "https://man7.org/linux/man-pages/man1/paste.1.html" },
  { cmd: "head", desc: "Вывод начала файла", cat: "Просмотр файлов", diff: "Низкая", danger: "Низкая", ex: "head -n 2 config.json", link: "https://man7.org/linux/man-pages/man1/head.1.html" },
  { cmd: "wc", desc: "Подсчет строк и слов", cat: "Работа с текстом", diff: "Низкая", danger: "Низкая", ex: "wc -w text.txt", link: "https://man7.org/linux/man-pages/man1/wc.1.html" },
  { cmd: "comm", desc: "Построчное сравнение двух отсортированных файлов", cat: "Работа с текстом", diff: "Средняя", danger: "Низкая", ex: "comm file1.txt file2.txt", link: "https://man7.org/linux/man-pages/man1/comm.1.html" },
  { cmd: "md5sum", desc: "Расчет и проверка хэш-суммы MD5 для контроля целостности", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "md5sum ubuntu.iso", link: "https://man7.org/linux/man-pages/man1/md5sum.1.html" },
  { cmd: "sha256sum", desc: "Расчет хэш-суммы SHA-256 (более надежно, чем MD5)", cat: "Работа с файлами и директориями", diff: "Низкая", danger: "Низкая", ex: "sha256sum backup.tar", link: "https://man7.org/linux/man-pages/man1/sha256sum.1.html" },
  { cmd: "ln", desc: "Создание жестких связей", cat: "Работа с файлами и директориями", diff: "Средняя", danger: "Низкая", ex: "ln file.txt hardlink.txt", link: "https://man7.org/linux/man-pages/man1/ln.1.html" },
  { cmd: "scp", desc: "Копирование по сети", cat: "Сеть", diff: "Средняя", danger: "Средняя", ex: "scp file.txt server:/tmp", link: "https://man7.org/linux/man-pages/man1/scp.1.html" },
  { cmd: "rsync", desc: "Синхронизация файлов и папок локально или удаленно с проверкой дельты", cat: "DevOps / разработка", diff: "Высокая", danger: "Средняя", ex: "rsync -avz /src /dest", link: "https://man7.org/linux/man-pages/man1/rsync.1.html" },
  { cmd: "curl", desc: "Отправка веб-запросов", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "curl http://ifconfig.me\n# Узнать свой внешний IP", link: "https://man7.org/linux/man-pages/man1/curl.1.html" },
  { cmd: "ps", desc: "Просмотр процессов", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "ps -ef", link: "https://man7.org/linux/man-pages/man1/ps.1.html" },
  { cmd: "top", desc: "Монитор системы", cat: "Процессы", diff: "Средняя", danger: "Низкая", ex: "top", link: "https://man7.org/linux/man-pages/man1/top.1.html" },
  { cmd: "kill", desc: "Убить процесс", cat: "Процессы", diff: "Средняя", danger: "Высокая", ex: "kill 1550", link: "https://man7.org/linux/man-pages/man1/kill.1.html" },
  { cmd: "df", desc: "Диски", cat: "Работа с дисками", diff: "Низкая", danger: "Низкая", ex: "df -i\n# Показать свободные inodes", link: "https://man7.org/linux/man-pages/man1/df.1.html" },
  { cmd: "du", desc: "Вес папок", cat: "Работа с дисками", diff: "Средняя", danger: "Низкая", ex: "du -sh *", link: "https://man7.org/linux/man-pages/man1/du.1.html" },
  { cmd: "free", desc: "Оперативная память", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "free -m", link: "https://man7.org/linux/man-pages/man1/free.1.html" },
  { cmd: "uname", desc: "Ядро", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "uname -r", link: "https://man7.org/linux/man-pages/man1/uname.1.html" },
  { cmd: "uptime", desc: "Время аптайма", cat: "Системная информация", diff: "Низкая", danger: "Низкая", ex: "uptime -p", link: "https://man7.org/linux/man-pages/man1/uptime.1.html" },
  { cmd: "hostname", desc: "Просмотр или изменение сетевого имени машины", cat: "Системная информация", diff: "Низкая", danger: "Средняя", ex: "hostname", link: "https://man7.org/linux/man-pages/man1/hostname.1.html" },
  { cmd: "who", desc: "Список всех пользователей вошедших в систему", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "who", link: "https://man7.org/linux/man-pages/man1/who.1.html" },
  { cmd: "w", desc: "Инфо о пользователях", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "w", link: "https://man7.org/linux/man-pages/man1/w.1.html" },
  { cmd: "id", desc: "Идентификаторы", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "id", link: "https://man7.org/linux/man-pages/man1/id.1.html" },
  { cmd: "groups", desc: "Группы текущего юзера", cat: "Пользователи и группы", diff: "Низкая", danger: "Низкая", ex: "groups", link: "https://man7.org/linux/man-pages/man1/groups.1.html" },
  { cmd: "chmod", desc: "Права доступа", cat: "Права доступа", diff: "Средняя", danger: "Высокая", ex: "chmod 644 file.txt", link: "https://man7.org/linux/man-pages/man1/chmod.1.html" },
  { cmd: "chown", desc: "Смена владельца", cat: "Права доступа", diff: "Средняя", danger: "Высокая", ex: "chown root file.txt", link: "https://man7.org/linux/man-pages/man1/chown.1.html" },
  { cmd: "chgrp", desc: "Смена группы", cat: "Права доступа", diff: "Средняя", danger: "Средняя", ex: "chgrp admin file.txt", link: "https://man7.org/linux/man-pages/man1/chgrp.1.html" },
  { cmd: "tar", desc: "Архивы", cat: "Архивы", diff: "Средняя", danger: "Низкая", ex: "tar -xf pack.tar", link: "https://man7.org/linux/man-pages/man1/tar.1.html" },
  { cmd: "gzip", desc: "Сжатие", cat: "Архивы", diff: "Низкая", danger: "Средняя", ex: "gzip -d f.gz", link: "https://man7.org/linux/man-pages/man1/gzip.1.html" },
  { cmd: "zip", desc: "Архиватор", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "zip arch.zip file.txt", link: "https://man7.org/linux/man-pages/man1/zip.1.html" },
  { cmd: "unzip", desc: "Распаковщик", cat: "Архивы", diff: "Низкая", danger: "Низкая", ex: "unzip arch.zip", link: "https://man7.org/linux/man-pages/man1/unzip.1.html" },
  { cmd: "ping", desc: "Проверка сети", cat: "Сеть", diff: "Низкая", danger: "Низкая", ex: "ping 8.8.8.8", link: "https://man7.org/linux/man-pages/man8/ping.8.html" },
  { cmd: "ip", desc: "Сетевые адреса", cat: "Сеть", diff: "Средняя", danger: "Средняя", ex: "ip route show", link: "https://man7.org/linux/man-pages/man8/ip-route.8.html" },
  { cmd: "ss", desc: "Порты", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "ss -a", link: "https://man7.org/linux/man-pages/man8/ss.8.html" },
  { cmd: "dig", desc: "DNS тесты", cat: "Сеть", diff: "Средняя", danger: "Низкая", ex: "dig mx canonical.com", link: "https://man7.org/linux/man-pages/man1/dig.1.html" },
  { cmd: "nslookup", desc: "DNS поиск", cat: "Сеть", diff: "Низкая", danger: "Низкая", ex: "nslookup mail.ru", link: "https://man7.org/linux/man-pages/man1/nslookup.1.html" }
];
// ==========================================================
// Midnight Commander (MC) — горячие клавиши
// ==========================================================
export const mcHotkeys = [
  // Панели и навигация
  { key: "Tab", action: "Переключение между левой и правой панелью", group: "Панели и навигация", note: "Активная панель подсвечена — именно с ней работают все операции." },
  { key: "Insert / Ctrl + T", action: "Выделить (пометить) файл под курсором", group: "Панели и навигация", note: "На Mac клавиша Insert часто отсутствует — используйте Ctrl + T." },
  { key: "Ctrl + \\", action: "Открыть список «горячих» каталогов (закладки)", group: "Панели и навигация", note: "Каталог добавляется в список кнопкой «Добавить текущий»." },
  { key: "Alt + Shift + H", action: "История посещённых каталогов", group: "Панели и навигация", note: "Быстрый возврат туда, где вы уже были." },
  { key: "Ctrl + PgUp / PgDn", action: "Переход в родительский каталог / вход в каталог", group: "Панели и навигация", note: "Аналог cd .. и cd <папка> без ввода команд." },
  { key: "Alt + O", action: "Открыть каталог под курсором в соседней панели", group: "Панели и навигация", note: "Экономит время при копировании между вложенными папками." },
  { key: "Ctrl + U", action: "Поменять панели местами", group: "Панели и навигация", note: "Меняет местами источник и приёмник для копирования." },
  { key: "Alt + I", action: "Синхронизировать каталог соседней панели с текущей", group: "Панели и навигация", note: "Обе панели показывают один и тот же каталог." },

  // Файловые операции
  { key: "F3", action: "Просмотр файла (viewer) без возможности изменить", group: "Файловые операции", note: "Безопасный способ заглянуть в конфиг или лог." },
  { key: "F4", action: "Редактирование файла во встроенном mcedit", group: "Файловые операции", note: "Редактор задаётся переменной EDITOR, по умолчанию mcedit." },
  { key: "F5", action: "Копирование выделенного в соседнюю панель", group: "Файловые операции", note: "Путь назначения можно поправить прямо в диалоге." },
  { key: "F6", action: "Перемещение или переименование", group: "Файловые операции", note: "Если панели указывают на один каталог — это переименование." },
  { key: "F7", action: "Создать новый каталог", group: "Файловые операции", note: "Поддерживает вложенные пути вида logs/2026/08." },
  { key: "F8", action: "Удаление файлов и каталогов", group: "Файловые операции", note: "Удаление идёт мимо корзины — восстановить нельзя." },
  { key: "F9", action: "Вызов верхнего меню MC", group: "Файловые операции", note: "Через меню доступны все настройки и редкие операции." },
  { key: "F10", action: "Выход из Midnight Commander", group: "Файловые операции", note: "Из диалогов та же клавиша работает как «Отмена»." },

  // Поиск и фильтры
  { key: "Alt + ?", action: "Расширенный поиск файлов по имени и содержимому", group: "Поиск и фильтры", note: "Аналог find + grep, но с интерактивным результатом." },
  { key: "Alt + S / Ctrl + S", action: "Быстрый поиск по имени в текущей панели", group: "Поиск и фильтры", note: "Начните печатать имя — курсор прыгнет на совпадение." },
  { key: "Alt + +", action: "Выделить файлы по маске (например *.log)", group: "Поиск и фильтры", note: "Alt + \\ снимает выделение по маске, Alt + * инвертирует его." },
  { key: "Ctrl + X, then Q", action: "Быстрый просмотр файла в соседней панели", group: "Поиск и фильтры", note: "Панель превращается в окно предпросмотра." },

  // Командная строка и терминал
  { key: "Ctrl + O", action: "Свернуть/развернуть панели и показать терминал", group: "Командная строка", note: "Главный приём: посмотреть вывод команды и вернуться в панели." },
  { key: "Ctrl + Enter", action: "Вставить имя файла под курсором в командную строку", group: "Командная строка", note: "Alt + Enter делает то же самое в некоторых терминалах." },
  { key: "Alt + Shift + !", action: "Выполнить команду и показать её вывод в отдельном окне", group: "Командная строка", note: "Удобно для длинного вывода, который не влезает в строку." },
  { key: "Ctrl + X, then P", action: "Вставить путь текущего каталога в командную строку", group: "Командная строка", note: "Ctrl + X, затем Shift + P вставит путь соседней панели." },

  // Права, ссылки, интеграции
  { key: "Ctrl + X, then C", action: "Изменить права доступа (аналог chmod)", group: "Права и интеграции", note: "Права отмечаются флажками — ошибиться сложнее, чем в chmod." },
  { key: "Ctrl + X, then O", action: "Сменить владельца файла (аналог chown)", group: "Права и интеграции", note: "Требует прав root, иначе операция завершится ошибкой." },
  { key: "Ctrl + X, then S", action: "Создать символическую ссылку (аналог ln -s)", group: "Права и интеграции", note: "Ctrl + X, затем L создаёт жёсткую ссылку." },
  { key: "Ctrl + X, then D", action: "Сравнить содержимое каталогов двух панелей", group: "Права и интеграции", note: "Показывает, каких файлов не хватает или что отличается." },
  { key: "Ctrl + R", action: "Обновить содержимое панели", group: "Права и интеграции", note: "Нужно, если файлы изменил другой процесс или пользователь." }
];

// ==========================================================
// Midnight Commander (MC) — топ команд и приёмов
// ==========================================================
export const mcCommands = [
  {
    cmd: "sudo apt install mc",
    task: "Установка MC в Debian/Ubuntu",
    example: "sudo apt update && sudo apt install mc",
    tip: "Для Fedora/RHEL — sudo dnf install mc, для Arch — sudo pacman -S mc, для macOS — brew install midnight-commander."
  },
  {
    cmd: "mc",
    task: "Запуск файлового менеджера в текущем каталоге",
    example: "mc",
    tip: "Выход по F10; после выхода MC возвращает вас в тот каталог, откуда был запущен."
  },
  {
    cmd: "mc /var/log /etc",
    task: "Запуск с заданными каталогами в левой и правой панели",
    example: "mc /var/log /etc",
    tip: "Экономит несколько переходов, если вы всегда работаете с одной парой каталогов."
  },
  {
    cmd: "mc -b",
    task: "Чёрно-белый режим для плохо настроенного терминала",
    example: "mc -b",
    tip: "Помогает, если через SSH цвета отображаются нечитаемо."
  },
  {
    cmd: "alias mc='. /usr/lib/mc/mc-wrapper.sh'",
    task: "Сохранять последний каталог MC после выхода",
    example: "echo \"alias mc='. /usr/lib/mc/mc-wrapper.sh'\" >> ~/.bashrc && source ~/.bashrc",
    tip: "Без обёртки shell после F10 остаётся в исходном каталоге, а не в том, где вы были в MC."
  },
  {
    cmd: "mcedit file.conf",
    task: "Открыть файл во встроенном редакторе MC",
    example: "mcedit /etc/nginx/nginx.conf",
    tip: "mcedit работает и отдельно от MC — удобная замена nano с подсветкой синтаксиса."
  },
  {
    cmd: "mcview access.log",
    task: "Просмотр файла без риска его изменить",
    example: "mcview /var/log/nginx/access.log",
    tip: "Внутри просмотрщика F7 ищет текст, а Shift + F7 повторяет поиск дальше."
  },
  {
    cmd: "mcdiff a.txt b.txt",
    task: "Наглядное сравнение двух файлов",
    example: "mcdiff config.old config.new",
    tip: "Отличия подсвечиваются в двух колонках — читать проще, чем вывод diff."
  },
  {
    cmd: "F2 → User menu",
    task: "Собственное меню часто используемых действий",
    example: "F2 (меню) → пункт настраивается в ~/.config/mc/menu",
    tip: "Сюда стоит вынести рутину: сборку архива, деплой, перезапуск сервиса."
  },
  {
    cmd: "Enter на архиве",
    task: "Войти в tar/zip как в обычный каталог",
    example: "Наведите курсор на backup.tar.gz и нажмите Enter",
    tip: "Работает через VFS: можно копировать файлы из архива клавишей F5 без распаковки."
  },
  {
    cmd: "cd sh://user@host",
    task: "Открыть удалённый сервер по SSH прямо в панели",
    example: "В командной строке MC: cd sh://user@192.168.1.10/var/www",
    tip: "Требует установленного FISH/SFTP на стороне сервера; копирование идёт обычным F5."
  },
  {
    cmd: "cd ftp://user@host",
    task: "Подключение к FTP-серверу как к локальной папке",
    example: "cd ftp://anonymous@ftp.example.com/pub",
    tip: "Пароль MC запросит отдельно и не сохранит его в истории команд."
  },
  {
    cmd: "F9 → Options → Configuration",
    task: "Настройка поведения MC под себя",
    example: "F9 → Настройки → Конфигурация",
    tip: "Настройки сохраняются в ~/.config/mc/ini — файл удобно переносить между серверами."
  },
  {
    cmd: "F9 → Options → Panel options",
    task: "Показ скрытых файлов и формат вывода панели",
    example: "F9 → Настройки → Настройки панелей → Показывать скрытые файлы",
    tip: "Без этой опции файлы вроде .env и .gitignore не видны в панелях."
  },
  {
    cmd: "Alt + T",
    task: "Переключение формата списка файлов",
    example: "Alt + T циклически меняет вид панели",
    tip: "Режимы: краткий, полный, расширенный и пользовательский — полезно на узком терминале."
  },
  {
    cmd: "Ctrl + X, then A",
    task: "Быстрый переход к точке монтирования (Active VFS list)",
    example: "Ctrl + X, затем A",
    tip: "Показывает список активных виртуальных ФС: архивы и удалённые подключения."
  }
];
