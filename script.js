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
        skill1Desc: 'Володію навичками створення сучасних вебсайтів із використанням HTML, CSS та JavaScript. Розробляю адаптивні сторінки, які коректно відображаються на комп’ютерах, планшетах і смартфонах. Працюю над структурою, дизайном та функціональністю вебресурсів, приділяючи увагу зручності користувачів і швидкодії сайту.',
        skill2Desc: 'Вмію збирати, аналізувати та систематизувати дані для отримання корисної інформації. Працюю з електронними таблицями, статистичними показниками та методами обробки даних. Можу виконувати візуалізацію результатів і формувати звіти для подальшого аналізу.',
        skill3Desc: 'Застосовую математичні методи для дослідження та аналізу різних процесів і систем. Володію навичками побудови математичних моделей, виконання розрахунків та інтерпретації отриманих результатів. Використовую математичний апарат для розв’язання прикладних задач у сфері інформаційних технологій.',
        skill4Desc: 'Маю знання з аналізу вимог до інформаційних систем та їхнього проєктування. Вмію створювати структуру системи, моделювати взаємодію між її компонентами та розробляти логічні схеми роботи. Розумію основні принципи побудови ефективних програмних рішень.',
        skill5Desc: 'Створюю зрозумілі та зручні інтерфейси для веб- і мобільних застосунків. Працюю з прототипуванням, підбором кольорових схем, компонентів та елементів навігації. Використовую сучасні підходи до UI/UX-дизайну для забезпечення комфортної взаємодії користувача з програмним продуктом.',
        skill6Desc: 'Використовую Google Apps Script для автоматизації роботи з сервісами Google. Створюю сценарії для обробки даних у Google Sheets, автоматичного формування документів і презентацій, а також оптимізації рутинних процесів. Це дозволяє значно підвищити ефективність роботи з інформацією.',
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
        openGalleryBtn: 'Відкрити',
        modalCloseBtn: 'Закрити',
        contactSectionTitle: 'Контактна інформація',
        contactEmailLabelShort: 'Email:',
        contactTelegramLabel: 'Telegram:',
        contactInstagramLabel: 'Instagram:',
        contactLocationLabel: 'Локація:',
        contactLocationValue: 'м. Кам\'янець-Подільський, Україна',
        projectTitleSadiba: 'Вебсайт готелю «Садиба»',
        projectDescSadibaSummary: 'Вебпроєкт, розроблений для представлення готелю «Садиба» в мережі Інтернет.',
        projectDescSadiba: 'Вебпроєкт, розроблений для представлення готелю «Садиба» в мережі Інтернет. Сайт надає відвідувачам інформацію про готель, умови проживання, доступні послуги та контактні дані. Під час створення проєкту було реалізовано сучасний дизайн, зручну навігацію між сторінками та адаптивне відображення для різних пристроїв. Для розробки використано HTML, CSS та JavaScript, що забезпечило швидку роботу сайту та комфортну взаємодію користувачів із контентом.',
        projectTitleGUI: 'Розробка графічних інтерфейсів (GUI)',
        projectDescGUISummary: 'Проєкт GUI для автоматизації нарахувань.',
        projectDescGUI: 'Проєкт GUI для автоматизації нарахувань, робота з табличними формами та подіями в реальному часі.',
        projectTitleMatlab: 'Системне моделювання в MATLAB',
        projectDescMatlab: 'Моделювання систем та аналіз даних у MATLAB з візуалізацією результатів.',
        eventSectionHeading: 'Останні та майбутні заходи',
        eventDate1: 'Жовтень 2025',
        eventTitle1: 'Участь у хакатоні "IT-Kamianets"',
        eventDesc1: 'Командна розробка та презентація інтерактивної вебплатформи для проходження логічних і технічних квестів.',
        eventDetails1: '<p><strong>Детальніше:</strong></p><p>У рамках хакатону я працювала в команді над створенням інтерактивної вебплатформи для проходження логічних та технічних квестів.</p><p>Брала участь у проєктуванні інтерфейсу, розробці функціоналу та тестуванні системи.</p><p>Захід дозволив отримати практичний досвід командної роботи та розробки IT-проєктів у стислі терміни.</p>',
        eventDate2: 'Грудень 2025',
        eventTitle2: 'Захист курсового проєкту з GUI',
        eventDesc2: 'Успішна презентація та захист десктопного додатку з автоматизованого розрахунку та нарахування заробітної плати.',
        eventDetails2: '<p><strong>Детальніше:</strong></p><p>Було розроблено десктопний додаток для автоматизації розрахунку заробітної плати з використанням сучасних підходів до створення графічних інтерфейсів користувача.</p><p>Під час захисту було продемонстровано функціональність програми, зручність інтерфейсу та коректність виконання розрахунків.</p>',
        eventDate3: 'Травень 2026',
        eventTitle3: 'Науково-практична конференція К-ПНУ',
        eventDesc3: 'Виступ із доповіддю на тему математичного моделювання складних інформаційних систем засобами пакету MATLAB.',
        eventDetails3: '<p><strong>Детальніше:</strong></p><p>На конференції було представлено доповідь, присвячену математичному моделюванню складних інформаційних систем засобами MATLAB.</p><p>Під час виступу було розглянуто методи аналізу даних, побудову математичних моделей та результати проведених досліджень.</p>',
        detailsBtn: 'Детальніше',
        detailsCloseBtn: 'Сховати',
        userName: 'Сірук Аліна',
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
        skill1Desc: 'I can create modern websites using HTML, CSS and JavaScript. I build responsive pages that display correctly on desktops, tablets, and smartphones. I focus on structure, design, and functionality, paying attention to user comfort and loading speed.',
        skill2Desc: 'I can collect, analyze, and organize data to obtain useful information. I work with spreadsheets, statistical indicators, and data processing methods. I can visualize results and generate reports for further analysis.',
        skill3Desc: 'I apply mathematical methods to research and analyze various processes and systems. I can build mathematical models, perform calculations, and interpret results. I use mathematical tools to solve practical problems in IT.',
        skill4Desc: 'I have knowledge of requirements analysis and design of information systems. I can create system structure, model interaction between components, and develop logical operating schemes. I understand the principles of building efficient software solutions.',
        skill5Desc: 'I create clear and user-friendly interfaces for web and mobile applications. I work with prototyping, color schemes, components, and navigation elements. I use modern UI/UX approaches to ensure a comfortable user experience.',
        skill6Desc: 'I use Google Apps Script to automate workflows with Google services. I create scripts for data processing in Google Sheets, automatic document and presentation generation, and optimization of routine processes. This improves efficiency when working with information.',
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
        openGalleryBtn: 'Open',
        modalCloseBtn: 'Close',
        contactSectionTitle: 'Contact Information',
        projectDescSadibaSummary: 'A web project created to showcase the “Sadiba” hotel online.',
        projectDescGUISummary: 'A GUI project designed for payroll automation.',
        projectDescMatlabSummary: 'Modeling systems and analyzing data in MATLAB.',
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
        eventDate1: 'October 2025',
        eventTitle1: 'Participation in IT-Kamianets Hackathon',
        eventDesc1: 'Team development and presentation of an interactive web platform for logic and technical quest challenges.',
        eventDetails1: '<p><strong>More details:</strong></p><p>During the hackathon, I worked in a team to build an interactive web platform for logic and technical quest challenges.</p><p>I contributed to interface design, feature implementation, and system testing.</p><p>The event provided practical experience in teamwork and fast-paced IT project development.</p>',
        eventDate2: 'December 2025',
        eventTitle2: 'GUI Course Project Defense',
        eventDesc2: 'Successful presentation and defense of a desktop application for automated payroll calculation.',
        eventDetails2: '<p><strong>More details:</strong></p><p>A desktop application was developed to automate payroll calculations using modern graphical interface design techniques.</p><p>During the defense, I demonstrated the application’s features, user-friendly interface, and calculation accuracy.</p>',
        eventDate3: 'May 2026',
        eventTitle3: 'Scientific-practical Conference at K-PNU',
        eventDesc3: 'A talk on mathematical modeling of complex information systems using MATLAB.',
        eventDetails3: '<p><strong>More details:</strong></p><p>The conference featured a presentation on mathematical modeling of complex information systems using MATLAB.</p><p>The talk covered data analysis methods, model construction, and research results.</p>',
        detailsBtn: 'More details',
        detailsCloseBtn: 'Hide',
        userName: 'Alina Siruk',
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
    if (mainTitleName && locale.userName) {
    mainTitleName.textContent = locale.userName;
}

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

    document.querySelectorAll('.details-btn').forEach((button) => {
        const details = button.nextElementSibling;
        if (details?.classList.contains('open')) {
            button.textContent = locale.detailsCloseBtn || button.textContent;
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

function initSkillAccordions() {
    const toggles = document.querySelectorAll('.skill-toggle');
    toggles.forEach((toggle) => {
        toggle.addEventListener('click', () => {
            const item = toggle.closest('.discipline-item');
            const panel = item?.querySelector('.skill-panel');
            if (!item || !panel) return;

            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.discipline-item.open').forEach((opened) => {
                if (opened !== item) {
                    opened.classList.remove('open');
                    const openedToggle = opened.querySelector('.skill-toggle');
                    const openedPanel = opened.querySelector('.skill-panel');
                    if (openedToggle) openedToggle.setAttribute('aria-expanded', 'false');
                    if (openedPanel) openedPanel.setAttribute('aria-hidden', 'true');
                }
            });

            if (isOpen) {
                item.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
                panel.setAttribute('aria-hidden', 'true');
            } else {
                item.classList.add('open');
                toggle.setAttribute('aria-expanded', 'true');
                panel.setAttribute('aria-hidden', 'false');
            }
        });
    });
}

function initPhotoZoom() {
    const profileImg = document.querySelector('.profile-pic');
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('image-modal-img');
    const modalClose = document.getElementById('image-modal-close');
    if (!profileImg || !modal || !modalImg || !modalClose) return;

    profileImg.addEventListener('click', () => {
        modalImg.src = profileImg.src;
        modalImg.alt = profileImg.alt || 'Profile photo';
        modal.classList.add('show');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    });

    const closeModal = () => {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
    });
}

function renderData(data) {
    if (mainTitleName && mainTitleName.textContent !== 'Помилка завантаження') {
       mainTitleName.textContent = getTranslation('userName');
    }
    if (userEmailNode) userEmailNode.textContent = data.email;
    if (userCityNode) userCityNode.textContent = data.city;

    if (!localStorage.getItem('user-selected-theme')) {
        applyTheme(data.theme);
    }
}

(function(){
    const buttons = document.querySelectorAll('.portfolio-open-btn');
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
        modalDesc.innerHTML = desc || '';
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
    let touchStartX = 0;
    let touchStartY = 0;
    let touchMoved = false;

    function handlePortfolioOpen(e, button){
        if (e.type === 'click' && Date.now() - lastTouch < 500) return;
        if (e.cancelable) e.preventDefault();
        lastTouch = e.type === 'touchend' ? Date.now() : lastTouch;
        const card = button.closest('.portfolio-card');
        if (!card) return;
        const langSuffix = currentLang === 'en' ? 'En' : 'Uk';
        const title = card.dataset[`title${langSuffix}`] || card.dataset.title || '';
        const img = card.dataset.image || '';
        const desc = card.dataset[`desc${langSuffix}`] || card.dataset.desc || '';
        const alt = card.querySelector('img')?.alt || title;
        const gallery = card.dataset.gallery ? card.dataset.gallery.split(',').map(item => item.trim()).filter(Boolean) : [];
        openModal(title, img, desc, alt, gallery);
    }

    function handlePortfolioTouchStart(e){
        const touch = e.touches[0];
        if (!touch) return;
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        touchMoved = false;
    }

    function handlePortfolioTouchMove(e){
        const touch = e.touches[0];
        if (!touch) return;
        if (Math.abs(touch.clientX - touchStartX) > 10 || Math.abs(touch.clientY - touchStartY) > 10) {
            touchMoved = true;
        }
    }

    function handlePortfolioTouchEnd(e, button){
        if (touchMoved) return;
        handlePortfolioOpen(e, button);
    }

    buttons.forEach(button=>{
        button.addEventListener('click', (e)=> handlePortfolioOpen(e, button));
        button.addEventListener('touchstart', handlePortfolioTouchStart);
        button.addEventListener('touchmove', handlePortfolioTouchMove);
        button.addEventListener('touchend', (e)=> handlePortfolioTouchEnd(e, button));
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

function initScrollHelpers() {
    const header = document.querySelector('header');
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-top-btn';
    scrollTopBtn.type = 'button';
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    scrollTopBtn.title = 'Scroll to top';
    scrollTopBtn.textContent = '↑';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '24px';
    scrollTopBtn.style.right = '24px';
    scrollTopBtn.style.width = '48px';
    scrollTopBtn.style.height = '48px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.backgroundColor = 'var(--accent-color, #d65a8a)';
    scrollTopBtn.style.color = '#fff';
    scrollTopBtn.style.fontSize = '1.6rem';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.display = 'flex';
    scrollTopBtn.style.alignItems = 'center';
    scrollTopBtn.style.justifyContent = 'center';
    scrollTopBtn.style.zIndex = '1500';
    scrollTopBtn.style.boxShadow = '0 12px 28px rgba(0,0,0,0.18)';
    scrollTopBtn.style.transition = 'transform 0.2s ease, opacity 0.3s ease';
    scrollTopBtn.classList.add('hide');
    document.body.appendChild(scrollTopBtn);

    const styleEl = document.createElement('style');
    styleEl.textContent = `
        header { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        header.header-hidden { transform: translateY(-110%); }
        header.header-scrolled { box-shadow: 0 12px 30px rgba(0,0,0,0.14); }
        #scroll-top-btn.show { opacity: 1; transform: translateY(0); pointer-events: auto; }
        #scroll-top-btn.hide { opacity: 0; transform: translateY(12px); pointer-events: none; }
    `;
    document.head.appendChild(styleEl);

    let lastY = window.scrollY;

    const updateScrollUI = () => {
        const currentY = window.scrollY;
        if (header) {
            if (currentY > lastY && currentY > 80) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
            if (currentY > 10) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }
        if (scrollTopBtn) {
            if (currentY > 250) {
                scrollTopBtn.classList.add('show');
                scrollTopBtn.classList.remove('hide');
            } else {
                scrollTopBtn.classList.add('hide');
                scrollTopBtn.classList.remove('show');
            }
        }
        lastY = currentY;
    };

    window.addEventListener('scroll', updateScrollUI, { passive: true });
    scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    updateScrollUI();
}

loadUserData();
translatePage();
initSkillAccordions();
initPhotoZoom();
initScrollHelpers();

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
