import os
import json
import re

# Настройки
ROOT_DIR = '.'  # Текущая папка
OUTPUT_FILE = os.path.join('js', 'data.js')

# Папки, которые скрипт будет игнорировать
IGNORE_DIRS = {'.git', '.idea', 'venv', '__pycache__', 'css', 'js', 'assets', 'fonts'}


def clean_html(raw_html):
    """Удаляет HTML теги из текста"""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext.strip()


def get_page_info(filepath):
    """Читает файл и находит заголовок и описание"""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # 1. Ищем <title>
        title_match = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
        if title_match:
            title = clean_html(title_match.group(1))
        else:
            title = os.path.basename(filepath)

        # 2. Ищем meta description
        desc_match = re.search(r'<meta name="description" content="(.*?)">', content, re.IGNORECASE)
        if desc_match:
            desc = desc_match.group(1)
        else:
            # 3. Если нет description, берем первый параграф <p>
            p_match = re.search(r'<p>(.*?)</p>', content, re.IGNORECASE | re.DOTALL)
            if p_match:
                # Берем первые 100 символов текста без тегов
                text = clean_html(p_match.group(1))
                desc = (text[:100] + '...') if len(text) > 100 else text
            else:
                desc = "Vaata lähemalt..."

        return title, desc
    except Exception as e:
        print(f"Ошибка чтения {filepath}: {e}")
        return "Error", "Error"


def scan_site():
    pages = []
    print("--- Начинаем сканирование сайта ---")

    for root, dirs, files in os.walk(ROOT_DIR):
        # Исключаем ненужные папки, чтобы не сканировать их
        dirs[:] = [d for d in dirs if d not in IGNORE_DIRS]

        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)

                # Получаем данные
                title, desc = get_page_info(full_path)

                # Создаем относительную ссылку для браузера (заменяем \ на / для Windows)
                rel_url = os.path.relpath(full_path, ROOT_DIR).replace('\\', '/')

                print(f"Добавлен: {rel_url} -> {title}")

                pages.append({
                    "title": title,
                    "url": rel_url,
                    "desc": desc
                })

    # Генерируем содержимое JS файла
    js_content = f"const siteContent = {json.dumps(pages, ensure_ascii=False, indent=4)};"

    # Создаем папку js если нет
    if not os.path.exists('js'):
        os.makedirs('js')

    # Записываем файл
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(js_content)

    print(f"\n--- Готово! Файл {OUTPUT_FILE} обновлен. ---")


if __name__ == "__main__":
    scan_site()