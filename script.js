// Поля для виведення даних
const mainTitleName = document.getElementById('main-title-name');
const userEmailNode = document.getElementById('user-email');
const userCityNode = document.getElementById('user-city');
const userThemeNode = document.getElementById('user-theme');

// Кнопки
const themeToggleBtn = document.getElementById('theme-toggle');
const saveBtn = document.getElementById('save-btn');
const toastNotification = document.getElementById('toast');

let currentTheme = 'light';

// Резервні дані, якщо браузер блокує завантаження json файлу (file:///)
const backupData = {
    "name": "Сірук Аліна",
    "email": "alina.siruk@kpnu.edu.ua",
    "city": "Кам'янець-Подільський",
    "theme": "light"
};

// Функція зміни теми
const applyTheme = (theme) => {
    currentTheme = theme;
    if (userThemeNode) userThemeNode.textContent = theme;

    if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-color', '#211821');
        document.documentElement.style.setProperty('--card-bg', '#2b202b');
        document.documentElement.style.setProperty('--item-bg', '#382938');
        document.documentElement.style.setProperty('--item-hover', '#493447');
        document.documentElement.style.setProperty('--text-color', '#fff3f8');
        document.documentElement.style.setProperty('--title-color', '#ffffff');
        document.documentElement.style.setProperty('--muted-color', '#e8c8d6');
        document.documentElement.style.setProperty('--accent-color', '#f29abe');
        document.documentElement.style.setProperty('--accent-hover', '#ffb3cc');
        document.documentElement.style.setProperty('--success-color', '#d96f9f');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#fff7fb');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        document.documentElement.style.setProperty('--item-bg', '#fdeff6');
        document.documentElement.style.setProperty('--item-hover', '#f8d7e8');
        document.documentElement.style.setProperty('--text-color', '#3b2631');
        document.documentElement.style.setProperty('--title-color', '#2a1721');
        document.documentElement.style.setProperty('--muted-color', '#8b6072');
        document.documentElement.style.setProperty('--accent-color', '#d65a8a');
        document.documentElement.style.setProperty('--accent-hover', '#bf4776');
        document.documentElement.style.setProperty('--success-color', '#e48aac');
    }
};

// Перевіряємо локальну пам'ять браузера ДО завантаження даних, щоб зберегти тему на вкладках
const savedTheme = localStorage.getItem('user-selected-theme');
if (savedTheme) {
    applyTheme(savedTheme);
}

// Заповнення HTML сторінки даними
function renderData(data) {
    if (mainTitleName && mainTitleName.textContent !== "Помилка завантаження") {
        mainTitleName.textContent = localStorage.getItem('user-name') || data.name;
    }
    if (userEmailNode) userEmailNode.textContent = data.email;
    if (userCityNode) userCityNode.textContent = data.city;
    
    // Якщо користувач ще не перемикав тему сам, ставимо дефолтну з файлу
    if (!localStorage.getItem('user-selected-theme')) {
        applyTheme(data.theme);
    }
}

    // Portfolio modal handlers
    (function(){
        const links = document.querySelectorAll('.portfolio-link');
        const modal = document.getElementById('portfolio-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalImage = document.getElementById('modal-image');
        const modalDesc = document.getElementById('modal-desc');
        const modalClose = document.getElementById('modal-close');

        if (!modal) return;

        const galleryPrev = document.getElementById('gallery-prev');
    const galleryNext = document.getElementById('gallery-next');
    const galleryIndicator = document.getElementById('gallery-indicator');
    const galleryThumbs = document.getElementById('gallery-thumbs');
    let galleryImages = [];
    let galleryIndex = 0;

    function updateGalleryIndicator(){
        if (!galleryImages.length) return;
        galleryIndicator.textContent = `${galleryIndex + 1} / ${galleryImages.length}`;
    }

    function renderGalleryThumbnails(){
        if (!galleryThumbs) return;
        galleryThumbs.innerHTML = '';
        galleryImages.forEach((image, index) => {
            const thumb = document.createElement('button');
            thumb.type = 'button';
            thumb.className = 'gallery-thumb' + (index === galleryIndex ? ' active' : '');
            thumb.setAttribute('aria-label', `Фото ${index + 1}`);
            const imgEl = document.createElement('img');
            imgEl.src = image;
            imgEl.alt = `Фото ${index + 1}`;
            thumb.appendChild(imgEl);
            thumb.addEventListener('click', () => {
                galleryIndex = index;
                modalImage.src = galleryImages[galleryIndex];
                updateGalleryIndicator();
                renderGalleryThumbnails();
            });
            galleryThumbs.appendChild(thumb);
        });
    }

    function openModal(title, img, desc, alt, gallery = []){
            modalTitle.textContent = title || '';
            galleryImages = gallery.length ? gallery : (img ? [img] : []);
            galleryIndex = galleryImages.indexOf(img) >= 0 ? galleryImages.indexOf(img) : 0;
            modalImage.src = galleryImages[galleryIndex] || '';
            modalImage.alt = alt || title || '';
            modalDesc.textContent = desc || '';
            updateGalleryIndicator();
            renderGalleryThumbnails();
            modal.classList.add('show');
            modal.setAttribute('aria-hidden','false');
            document.body.style.overflow = 'hidden';
        }
        function closeModal(){
            modal.classList.remove('show');
            modal.setAttribute('aria-hidden','true');
            document.body.style.overflow = '';
            modalImage.src = '';
            galleryImages = [];
            galleryIndex = 0;
            if (galleryThumbs) galleryThumbs.innerHTML = '';
        }

        function changeGallery(delta){
            if (!galleryImages.length) return;
            galleryIndex = (galleryIndex + delta + galleryImages.length) % galleryImages.length;
            modalImage.src = galleryImages[galleryIndex];
            updateGalleryIndicator();
            renderGalleryThumbnails();
        }

        let lastTouch = 0;
        function handlePortfolioOpen(e, link){
            if (e.type === 'click' && Date.now() - lastTouch < 500) return;
            if (e.cancelable) e.preventDefault();
            lastTouch = e.type === 'touchend' ? Date.now() : lastTouch;
            const title = link.dataset.title || '';
            const img = link.dataset.image || '';
            const desc = link.dataset.desc || '';
            const alt = link.querySelector('img')?.alt || title;
            const gallery = link.dataset.gallery ? link.dataset.gallery.split(',').map(item => item.trim()).filter(Boolean) : [];
            openModal(title, img, desc, alt, gallery);
        }

        links.forEach(link=>{
            link.addEventListener('click', (e)=> handlePortfolioOpen(e, link));
            link.addEventListener('touchend', (e)=> handlePortfolioOpen(e, link));
        });

        if (galleryPrev) galleryPrev.addEventListener('click', () => changeGallery(-1));
        if (galleryNext) galleryNext.addEventListener('click', () => changeGallery(1));
        if (modalClose) modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e)=>{
            if (e.target === modal) closeModal();
        });
        document.addEventListener('keydown', (e)=>{
            if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
        });
    })();

// ЗАВАНТАЖЕННЯ З JSON
async function loadUserData() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) throw new Error("Помилка");
        const userData = await response.json();
        renderData(userData);
    } catch (error) {
        // Захист від блокування CORS браузером на комп'ютері
        renderData(backupData);
    }
}

loadUserData();

// ОБРОБНИК КНОПКИ ТЕМИ
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = (currentTheme === 'light') ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem('user-selected-theme', nextTheme); // Зберігаємо вибір
    });
}

// ІМІТАЦІЯ ЗБЕРЕЖЕННЯ
if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        saveBtn.textContent = "Збереження...";
        saveBtn.disabled = true;

        setTimeout(() => {
            if (toastNotification) {
                toastNotification.style.display = 'block';
                setTimeout(() => toastNotification.style.display = 'none', 3000);
            }
            saveBtn.textContent = "Зберегти зміни";
            saveBtn.disabled = false;
        }, 1500);
    });
}

const contactForm = document.getElementById('contact-form');
const formFeedback = document.getElementById('form-feedback');
if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton?.textContent || 'Надіслати повідомлення';

        if (submitButton) {
            submitButton.textContent = 'Надсилаю...';
            submitButton.disabled = true;
        }

        if (formFeedback) {
            formFeedback.style.display = 'none';
            formFeedback.textContent = '';
            formFeedback.classList.remove('success', 'error');
        }

        try {
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                mode: 'cors',
                redirect: 'follow'
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            if (formFeedback) {
                formFeedback.textContent = 'Повідомлення надіслано! Дякую за звернення.';
                formFeedback.classList.add('success');
                formFeedback.style.display = 'block';
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }
            contactForm.reset();

            if (submitButton) {
                submitButton.textContent = 'Надіслано!';
            }
        } catch (error) {
            if (formFeedback) {
                formFeedback.textContent = 'Не вдалося надіслати форму. Спробуйте пізніше.';
                formFeedback.classList.add('error');
                formFeedback.style.display = 'block';
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 6000);
            }
            console.error(error);
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                setTimeout(() => {
                    submitButton.textContent = originalText;
                }, 2500);
            }
        }
    });
}
