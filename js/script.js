
/* ==========================================
    Поиск по сайту (Fuse.js)
   ========================================== */

const fuseOptions = {
    includeScore: true,
    threshold: 0.4,
    keys: ['title', 'desc']
};

if (typeof Fuse !== 'undefined') {
    const fuse = new Fuse(siteContent, fuseOptions);

    // Новые элементы
    const searchBox = document.querySelector('.search-box');
    const searchBtn = document.querySelector('.btn-search');
    const searchInput = document.getElementById('search-input');
    const resultsBox = document.getElementById('results-container');

    if (searchBox && searchBtn && searchInput) {

        // 1. Логика кнопки (клик по лупе)
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Чтобы страница не прыгала
            searchBox.classList.toggle('active'); // Добавляем/убираем класс

            // Если открыли - ставим курсор внутрь
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            } else {
                // Если закрыли - очищаем
                searchInput.value = '';
                resultsBox.style.display = 'none';
            }
        });

        // 2. Логика ввода (как и раньше)
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value;
            resultsBox.innerHTML = '';

            if (query.trim().length === 0) {
                resultsBox.style.display = 'none';
                return;
            }

            const results = fuse.search(query);

            if (results.length > 0) {
                resultsBox.style.display = 'block';
                results.forEach(result => {
                    const item = result.item;
                    // --- НАЧАЛО ИСПРАВЛЕНИЯ ---
                    let correctUrl = item.url;

                    // 2. Проверка глубины вложенности
                    // Если мы находимся внутри папки "pages", нужно добавить "../" для выхода в корень
                    if (window.location.pathname.includes('/pages/')) {
                        // Разбиваем текущий путь по слэшам и убираем пустые элементы
                        const pathParts = window.location.pathname.split('/').filter(part => part.length > 0);
                        const pagesIndex = pathParts.indexOf('pages');

                        if (pagesIndex !== -1) {
                            // Считаем, сколько папок нужно пройти вверх, чтобы вернуться в корень
                            // Формула: Длина пути - Индекс папки 'pages' - 1 (сам файл)
                            const depth = pathParts.length - pagesIndex - 1;

                            // Создаем префикс (например, "../../")
                            const prefix = '../'.repeat(depth);
                            correctUrl = prefix + correctUrl;
                        }
                    }
                    // --- КОНЕЦ ИСПРАВЛЕНИЯ ---

                    const html = `
                        <div class="result-item">
                            <a href="${correctUrl}">${item.title}</a>
                            <p>${item.desc}</p>
                        </div>
                    `;
                    resultsBox.innerHTML += html;
                });
            } else {
                resultsBox.style.display = 'block';
                resultsBox.innerHTML = '<div class="result-item"><p>Ei leitud midagi.</p></div>';
            }
        });

        // 3. Закрыть, если кликнули в любое другое место
        document.addEventListener('click', function(e) {
            // Если клик НЕ по кнопке поиска и НЕ по полю ввода
            if (!searchBox.contains(e.target)) {
                searchBox.classList.remove('active');
                resultsBox.style.display = 'none';
            }
        });
    }
} else {
    console.error("Fuse.js library not loaded");
}
/* ==========================================
   3. Логика увеличения картинок (Lightbox)
   ========================================== */

// Создаем "шторку" (модальное окно) один раз при загрузке
const modalHTML = `
    <div id="image-modal">
        <img id="modal-img" src="" alt="Full view">
    </div>
`;
document.body.insertAdjacentHTML('beforeend', modalHTML);

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-img');

// Функция: Открыть картинку
function openModal(imageSrc) {
    modal.style.display = 'flex'; // Показываем шторку
    modalImg.src = imageSrc;      // Подставляем путь к картинке
}

// Функция: Закрыть картинку
modal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Находим все картинки с классом "zoomable" и добавляем им клик
// (Используем делегирование, чтобы работало даже на новых элементах)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('zoomable')) {
        openModal(e.target.src);
    }
});
/* ==========================================
   3. Логика (Quiz)
   ========================================== */
function checkQuiz() {
        let score = 0;
        const answers = {
            q1: 'b',
            q2: 'c',
            q3: 'a'
        };

        const resultDiv = document.getElementById('quiz-result');
        resultDiv.innerHTML = '';

        for (let q in answers) {
            const selected = document.querySelector(`input[name="${q}"]:checked`);
            if (selected && selected.value === answers[q]) {
                score++;
            }
        }

        resultDiv.innerText = `Sa said ${score} punkti 3-st!`;
        if (score === 3) {
            resultDiv.style.color = 'green';
            resultDiv.innerText += " Suurepärane töö!";
        } else {
            resultDiv.style.color = 'red';
            resultDiv.innerText += " Proovi uuesti!";
        }
    }