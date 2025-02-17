window.onload = function() {

    // * ----- Прокручивание страницы до соответствующего пункта основного и бургер-меню (при клике на него)

    let desktopMenu = document.querySelector(".nav");
    let displayedStyle = getComputedStyle(desktopMenu).display;
    //console.log(displayedStyle);

    let menuLinks;

    if(displayedStyle === "none") { 
        // отображается бургер меню 
        menuLinks = document.querySelectorAll(".burger-menu-nav a");
        console.log("Бургер-меню");
        console.log(menuLinks);
    } else {
        // отображается основное меню 
        menuLinks = document.querySelectorAll(".nav a");
        console.log("Основное меню");
        console.log(menuLinks);
    }

    menuLinks.forEach((link) => {
        link.addEventListener("click", function(e) { 
            e.preventDefault();

            let  id = link.getAttribute('href').replace('#', '');
            //console.log(id);
            let anchor = document.querySelector(`section[id="${id}"]`);
            //console.log(anchor);

            anchor.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

        });
    });

    // * ---- Выделение пункта меню при прокручивании страницы до соответствующего блока
    let sections = document.querySelectorAll("section");

    window.addEventListener('scroll', markMenuItem);
    function markMenuItem() {

        // * выделяем последний пункт при прокрутке вниз страницы
        let lastSection = menuLinks[menuLinks.length - 1];

        //if((window.innerHeight + Math.round(window.scrollY)) >= document.body.offsetHeight) { // то же самое
        //if ((Math.round(window.scrollY) + document.documentElement.clientHeight) >= document.body.scrollHeight) {
        if (document.body.scrollHeight <= Math.ceil(window.scrollY) + document.documentElement.clientHeight ) {    
            lastSection.classList.add("chosen-last-item");
        } else {
            if(lastSection.classList.contains("chosen-last-item")) {
                lastSection.classList.remove("chosen-last-item");
            }  
        }

        sections.forEach((section) => {

            let menuLink;  // соответствующий пункт меню
            let secTopOffset; // смещение с учетом/без учета шапки

            if(displayedStyle === "none") { 
                // для бургер меню 
                menuLink = document.querySelector(`.burger-menu-nav a[href="#${section.id}"]`); 
                secTopOffset = section.offsetTop - 80;

            } else {
                // для основного меню 
                menuLink = document.querySelector(`.nav a[href="#${section.id}"]`);
            
                // * определение смещения с учетом закрепленной шапки
                let headerMenu = document.querySelector("header"); 
                let headerHeight = parseFloat(window.getComputedStyle(headerMenu).height); // высота шапки
                secTopOffset = section.offsetTop - headerHeight - 25; // с учетом половины значения margin-bottom
            }
        
            // * определение высоты элемента с учетом padding, border и margin 
            let sectionHeight;
            let styles = window.getComputedStyle(section);
            let margT = parseFloat(styles['marginTop']); // значение margin-top
            let margB = parseFloat(styles['marginBottom']); // значение margin -bottom

            if(margT == 0 && margB == 0) {
                sectionHeight = section.offsetHeight;
            } else {
                sectionHeight = section.offsetHeight + margT + margB - 25; // с учетом половины значения margin-bottom
            }

                //console.log(`Скролл сверху = window.scrollY: ${window.scrollY}`);
                //console.log(`Смещение секции сверху с уч. шапки = section.offsetTop: ${secTopOffset}`);
                //console.log(`Высота элемента: ${sectionHeight}`);

            // проверяется что, 1) страница прокручена на значение больше или равное величине смещения элемента,
            // и 2)  страница прокручена на значение меньше чем величина смещения + высота элемента (элемент виден в окне) 
            if (window.scrollY >= secTopOffset && window.scrollY < secTopOffset + sectionHeight) {

                // проверяем, отмечен ли последний элемент (если да, у текущей ссылки убираем класс)
                if(lastSection.classList.contains("chosen-last-item")) {
                    menuLink.classList.remove('chosen'); 
                } else {
                    menuLink.classList.add('chosen'); 
                }

            } else {
                menuLink.classList.remove('chosen');
            }

        });
    }

    // * ---- Открытие / закрытие бургер-меню
    let bmOpenBtn = document.querySelector(".burgermenu-btn-open img");
    let bmCloseBtn = document.querySelector(".burgermenu-btn-close img");

    bmOpenBtn.addEventListener("click", showHideMenu);

    // * функция переключения между показать / скрыть бургер-меню
    function showHideMenu() {
        let bm = document.querySelector(".burger-menu-nav");

        if(bm.classList.contains("show-burger-menu")) {
            // Закрыть меню
            bm.classList.remove("show-burger-menu");
            bmOpenBtn.parentElement.style.display = "block";
            bmCloseBtn.parentElement.style.display = "none";

            bmOpenBtn.addEventListener("click", showHideMenu)

        } else {
            // Открыть меню
            bm.classList.add("show-burger-menu");
            bmOpenBtn.parentElement.style.display = "none";
            bmCloseBtn.parentElement.style.display = "block";

            bmCloseBtn.addEventListener("click", showHideMenu);
        }

        // Скрытие меню, когда пользователь кликает в любом месте страницы
        document.addEventListener('click', hideMenu);
    }

    // * функция скрытия меню при клике вне его
    function hideMenu(e) {
        let bmBlock = document.querySelector(".burger-menu-block"); 

        // есть ли внутри того, по чему кликнули, бургер-меню и кнопка
        let clickTarget = bmBlock.contains(e.target); // false - если клик вне кнопки и блока 
        //console.log(e.target); // объект клика
        
        // Если нет, то прячем меню
        if (!clickTarget) {
            document.querySelector(".burger-menu-nav").classList.remove("show-burger-menu");
            bmOpenBtn.parentElement.style.display = "block";
            bmCloseBtn.parentElement.style.display = "none";
        }	
    }

    // * ---- Открытие/скрытие всей информации обо всех проектах ("Показать всё")

    let moreBtnAll = document.querySelectorAll(".show-more-btn"); // кнопки "Показать подробнее"
    let hideBtnAll = document.querySelectorAll(".hide-more-btn"); // кнопки "Скрыть"
    let moreBlocks = document.querySelectorAll(".more-block"); // все скрытые блоки подробнее

    let switchBtn = document.querySelector(".switch-displaying-btn"); 
    switchBtn.addEventListener("click", showHideAllInfo);

    function showHideAllInfo() { 

        if(this.classList.contains("show-all-btn")) {
            //console.log("ПОКАЗАТЬ!");

            for(let i = 0; i < moreBlocks.length; i++) {
                moreBlocks[i].style.display = "block";
            }

            // перебор кнопок "Показать подробнее"
            for(let i = 0; i < moreBtnAll.length; i++) {
                moreBtnAll[i].style.display = "none";
            }

            // перебор кнопок "Скрыть"
            for(let i = 0; i < hideBtnAll.length; i++) {
                hideBtnAll[i].style.display = "none";
            }

            this.innerHTML = "Скрыть всё";
            this.classList.remove("show-all-btn");
            this.classList.add("hide-all-btn");

            this.addEventListener("click", showHideAllInfo);

        } else {
            //console.log("СКРЫТЬ!");

            for(let i = 0; i < moreBlocks.length; i++) {
                moreBlocks[i].style.display = "none";
            }

            // перебор кнопок "Показать подробнее"
            for(let i = 0; i < moreBtnAll.length; i++) {
                moreBtnAll[i].style.display = "flex";
            }

            // перебор кнопок "Скрыть"
            for(let i = 0; i < hideBtnAll.length; i++) {
                hideBtnAll[i].style.display = "none";
            }

            this.innerHTML = "Показать всё";
            this.classList.add("show-all-btn");
            this.classList.remove("hide-all-btn");

            this.addEventListener("click", showHideAllInfo);
        }

    }

    // * ---- Открытие информации о проекте при клике на "Посмотреть подробнее"
    
    for(let i = 0; i < moreBtnAll.length; i++) {
        moreBtnAll[i].addEventListener("click", showMoreInfo);
    }

    // * функция отображения доп.информации, соответствующей кнопке, по которой кликнули
    function showMoreInfo() {
        let chosenProject = this.dataset.project;
        //console.log(this.dataset.project);

        for(let i = 0; i < moreBlocks.length; i++) {
           
            if(moreBlocks[i].dataset.project === chosenProject) {
                moreBlocks[i].style.display = "block";

                let hideBtn = document.querySelector('.hide-more-btn[data-project = "' + chosenProject + '"]');
                hideBtn.style.display = "flex";
                hideBtn.addEventListener("click", function() { hideMoreInfo(this,chosenProject) });

                this.style.display = "none";
            }
        }

    }

    // * функция скрытия доп.информации при клике на кнопку "Скрыть"
    // принимает кнопку, на которую кликнули, и значение атрибута data-project 
    function hideMoreInfo(btn,project) {
        btn.style.display = "none";
        document.querySelector('.more-block[data-project = "' + project + '"]').style.display = "none";
        document.querySelector('.show-more-btn[data-project = "' + project + '"]').style.display = "flex";
    }

    // * ---- Прокручивание страницы вверх при клике на кнопку вверх (стрелка)
    let upBtn = document.querySelector(".up-btn");

    upBtn.addEventListener("click", function(e) {
        e.preventDefault();

        let anchor = document.querySelector(".container");
        anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

}