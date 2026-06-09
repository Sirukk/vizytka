// Поля для виведення даних
const mainTitleName = document.getElementById('main-title-name');
const userEmailNode = document.getElementById('user-email');
const userCityNode = document.getElementById('user-city');
const userThemeNode = document.getElementById('user-theme');

// Кнопки
const themeToggleBtn = document.getElementById('theme-toggle');
const langToggleBtn = document.getElementById('lang-toggle');
const saveBtn = document.getElementById('save-btn');
const toastNotification = document.getElementById('toast');

let currentTheme = 'light';
let currentLang = localStorage.getItem('selected-language') || 'uk';

const translations = {
    uk: {
        themeToggleTitle: 'Змінити тему',
        langToggleTitle: 'Переключити мову',
        langToggleLabel: 'EN',
        navHome: 'Головна',
        navPortfolio: 'Портфоліо',
        navEvents: 'Події',
        navContacts: 'Контакти',
        portfolioPageTitle: 'Проєкти та досягнення',
        eventsPageTitle: 'Важливі події',
        contactsPageTitle: 'Зв\'язок зі мною',
        userProfileTitle: 'Професійний профіль',
        labelEmail: 'Email:',
        labelCity: 'Місто:',
        labelTheme: 'Поточна тема (у DOM):',
        aboutText1: 'Я студентка 3-го курсу фізико-математичного факультету К-ПНУ імені Івана Огієнка. Навчаюся за спеціальністю <strong>"Комп\'ютерні науки та інформаційні технології"</strong>.',
        aboutText2: 'Моя підготовка базується на фундаментальних знаннях ІТ-індустрії. Я працюю над рішеннями від аналізу даних до розробки сучасних інтерфейсів для веб- та мобільних платформ.',
        aboutText3: 'Особливу увагу приділяю продуктивності та безпеці веб-ресурсів, досліджуючи протоколи <strong>HTTP/3</strong> та методи шифрування <strong>HTTPS</strong>.',
        skillsTitle: 'Професійні компетенції',
        skill1: 'Веб-дизайн та розробка веб-технологій',
        skill2: 'Інтелектуальний аналіз та обробка даних',
        skill3: 'Математичне моделювання систем',
        skill4: 'Проєктування інформаційних систем',
        skill5: 'Розробка графічних інтерфейсів',
        skill6: 'Автоматизація в Google Workspace',
        skill7: 'Створення гібридних мобільних додатків',
        contactFormTitle: 'Написати повідомлення',
        contactSubtitle: 'Заповніть форму, і повідомлення буде надіслано на мою електронну пошту.',
        contactNameLabel: 'Ваше ім\'я',
        contactNamePlaceholder: 'Введіть ваше ім\'я',
        contactEmailLabel: 'Email',
        contactEmailPlaceholder: 'example@mail.com',
        contactMessageLabel: 'Повідомлення',
        contactMessagePlaceholder: 'Як я можу вам допомогти?',
        contactSubmit: 'Надіслати повідомлення',
        modalCloseBtn: 'Закрити',
        contactSectionTitle: 'Контактна інформація',
        contactEmailLabelShort: 'Email:',
        contactTelegramLabel: 'Telegram:',
        contactInstagramLabel: 'Instagram:',
        contactLocationLabel: 'Локація:',
        contactLocationValue: 'м. Кам\'янець-Подільський, Україна',
        projectTitleSadiba: 'Вебсайт готелю «Садиба»',
        projectDescSadiba: 'Вебпроєкт, розроблений для представлення готелю «Садиба» в мережі Інтернет. Сайт надає відвідувачам інформацію про готель, умови проживання, доступні послуги та контактні дані. Під час створення проєкту було реалізовано сучасний дизайн, зручну навігацію між сторінками та адаптивне відображення для різних пристроїв. Для розробки використано HTML, CSS та JavaScript, що забезпечило швидку роботу сайту та комфортну взаємодію користувачів із контентом.',
        projectTitleGUI: 'Розробка графічних інтерфейсів (GUI)',
        projectDescGUI: 'Проєкт GUI для автоматизації нарахувань, робота з табличними формами та подіями в реальному часі.',
        projectTitleMatlab: 'Системне моделювання в MATLAB',
        projectDescMatlab: 'Моделювання систем та аналіз даних у MATLAB з візуалізацією результатів.',
        eventSectionHeading: 'Останні та майбутні заходи',
        eventTitle1: 'Участь у хакатоні "IT-Kamianets"',
        eventDesc1: 'Командна розробка та презентація інтерактивної вебплатформи для проходження логічних і технічних квестів.',
        eventTitle2: 'Захист курсового проєкту з GUI',
        eventDesc2: 'Успішна презентація та захист десктопного додатку з автоматизованого розрахунку та нарахування заробітної плати.',
        eventTitle3: 'Науково-практична конференція К-ПНУ',
        eventDesc3: 'Виступ із доповіддю на тему математичного моделювання складних інформаційних систем засобами пакету MATLAB.',
        footerCredit: 'Кам\'янець-Подільський національний університет імені Івана Огієнка, 2026',
    },
    en: {
        themeToggleTitle: 'Toggle theme',
        langToggleTitle: 'Switch language',
        langToggleLabel: 'UA',
        navHome: 'Home',
        navPortfolio: 'Portfolio',
        navEvents: 'Events',
        navContacts: 'Contacts',
        portfolioPageTitle: 'Projects & Achievements',
        eventsPageTitle: 'Important Events',
        contactsPageTitle: 'Contact Me',
        userProfileTitle: 'Professional Profile',
        labelEmail: 'Email:',
        labelCity: 'City:',
        labelTheme: 'Current theme (in DOM):',
        aboutText1: 'I am a third-year student at the Physics and Mathematics Faculty of K-PNU named after Ivan Ohiienko. I study <strong>Computer Science and Information Technology</strong>.',
        aboutText2: 'My training is based on fundamental IT knowledge. I work on solutions from data analysis to modern web and mobile interface development.',
        aboutText3: 'I pay special attention to web performance and security, studying <strong>HTTP/3</strong> protocols and <strong>HTTPS</strong> encryption methods.',
        skillsTitle: 'Professional Skills',
        skill1: 'Web design and web technology development',
        skill2: 'Intelligent data analysis and processing',
        skill3: 'Mathematical system modeling',
        skill4: 'Information system design',
        skill5: 'Graphical user interface development',
        skill6: 'Automation in Google Workspace',
        skill7: 'Hybrid mobile application development',
        contactFormTitle: 'Send a Message',
        contactSubtitle: 'Fill out the form and the message will be sent to my email.',
        contactNameLabel: 'Your name',
        contactNamePlaceholder: 'Enter your name',
        contactEmailLabel: 'Email',
        contactEmailPlaceholder: 'example@mail.com',
        contactMessageLabel: 'Message',
        contactMessagePlaceholder: 'How can I help you?',
        contactSubmit: 'Send Message',
        modalCloseBtn: 'Close',
        contactSectionTitle: 'Contact Information',
        contactEmailLabelShort: 'Email:',
        contactTelegramLabel: 'Telegram:',
        contactInstagramLabel: 'Instagram:',
        contactLocationLabel: 'Location:',
        contactLocationValue: 'Kamianets-Podilskyi, Ukraine',
        projectTitleSadiba: 'Hotel “Sadiba” website',
        projectDescSadiba: 'A web project created to showcase the “Sadiba” hotel online. The website provides guests with information about accommodation, amenities, and contact details. The design includes a modern layout, easy navigation, and responsive behavior for multiple devices. HTML, CSS and JavaScript were used to ensure fast performance and a smooth user experience.',
        projectTitleGUI: 'Graphical User Interface (GUI) Development',
        projectDescGUI: 'A GUI project designed for payroll automation, with table forms and real-time event handling.',
        projectTitleMatlab: 'System Modeling in MATLAB',
        projectDescMatlab: 'Modeling systems and analyzing data in MATLAB with visualization of the results.',
        eventSectionHeading: 'Latest & upcoming events',
        eventTitle1: 'Participation in IT-Kamianets Hackathon',
        eventDesc1: 'Team development and presentation of an interactive web platform for logic and technical quest challenges.',
        eventTitle2: 'GUI Course Project Defense',
        eventDesc2: 'Successful presentation and defense of a desktop application for automated payroll calculation.',
        eventTitle3: 'Scientific-practical Conference at K-PNU',
        eventDesc3: 'A talk on mathematical modeling of complex information systems using MATLAB.',
        footerCredit: 'Kamianets-Podilskyi National University named after Ivan Ohienko, 2026',
    },
};

const backupData = {
    "name": "Сірук Аліна",
    "email": "alina.siruk@kpnu.edu.ua",
    "city": "Кам'янець-Подільський",
    "theme": "light"
};

const getTranslation = (key) => {
    const locale = translations[currentLang] || translations.uk;
    return locale[key];
};

const translatePage = () => {
    const locale = translations[currentLang] || translations.uk;
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.dataset.i18n;
        const translation = locale[key];
        if (translation === undefined) return;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = translation;
        } else {
            element.innerHTML = translation;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        const key = element.dataset.i18nPlaceholder;
        const translation = locale[key];
        if (translation !== undefined) {
            element.placeholder = translation;
        }
    });

    document.querySelectorAll('[data-i18n-title]').forEach((element) => {
        const key = element.dataset.i18nTitle;
        const translation = locale[key];
        if (translation !== undefined) {
            element.title = translation;
        }
    });

    if (langToggleBtn) {
        langToggleBtn.textContent = locale.langToggleLabel || langToggleBtn.textContent;
        langToggleBtn.title = locale.langToggleTitle || langToggleBtn.title;
    }
    if (themeToggleBtn) {
        themeToggleBtn.title = locale.themeToggleTitle || themeToggleBtn.title;
    }
};

const setLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem('selected-language', currentLang);
    translatePage();
};

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

const savedTheme = localStorage.getItem('user-selected-theme');
if (savedTheme) {
    applyTheme(savedTheme);
}

function renderData(data) {
    if (mainTitleName && mainTitleName.textContent !== 'Помилка завантаження') {
        mainTitleName.textContent = localStorage.getItem('user-name') || data.name;
    }
    if (userEmailNode) userEmailNode.textContent = data.email;
    if (userCityNode) userCityNode.textContent = data.city;

    if (!localStorage.getItem('user-selected-theme')) {
        applyTheme(data.theme);
    }
}

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
        const langSuffix = currentLang === 'en' ? 'En' : 'Uk';
        const title = link.dataset[`title${langSuffix}`] || link.dataset.title || '';
        const img = link.dataset.image || '';
        const desc = link.dataset[`desc${langSuffix}`] || link.dataset.desc || '';
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

async function loadUserData() {
    try {
        const response = await fetch('user.json');
        if (!response.ok) throw new Error('Помилка');
        const userData = await response.json();
        renderData(userData);
    } catch (error) {
        renderData(backupData);
    }
}

loadUserData();
translatePage();

if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const nextTheme = (currentTheme === 'light') ? 'dark' : 'light';
        applyTheme(nextTheme);
        localStorage.setItem('user-selected-theme', nextTheme);
    });
}

if (langToggleBtn) {
    langToggleBtn.addEventListener('click', () => {
        setLanguage(currentLang === 'uk' ? 'en' : 'uk');
    });
}

if (saveBtn) {
    saveBtn.addEventListener('click', () => {
        saveBtn.textContent = 'Збереження...';
        saveBtn.disabled = true;

        setTimeout(() => {
            if (toastNotification) {
                toastNotification.style.display = 'block';
                setTimeout(() => toastNotification.style.display = 'none', 3000);
            }
            saveBtn.textContent = 'Зберегти зміни';
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
        const originalText = submitButton?.textContent || getTranslation('contactSubmit') || 'Send Message';

        if (submitButton) {
            submitButton.textContent = currentLang === 'en' ? 'Sending...' : 'Надсилаю...';
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
                formFeedback.textContent = currentLang === 'en' ? 'Message sent! Thank you for contacting me.' : 'Повідомлення надіслано! Дякую за звернення.';
                formFeedback.classList.add('success');
                formFeedback.style.display = 'block';
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                }, 5000);
            }
            contactForm.reset();

            if (submitButton) {
                submitButton.textContent = currentLang === 'en' ? 'Sent!' : 'Надіслано!';
            }
        } catch (error) {
            if (formFeedback) {
                formFeedback.textContent = currentLang === 'en' ? 'Failed to send form. Please try again later.' : 'Не вдалося надіслати форму. Спробуйте пізніше.';
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
