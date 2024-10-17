window.onload = function() {

    // * ----- Прокручивание страницы до соответствующего пункта меню (при клике на него)
    let menuLinks = document.querySelectorAll(".nav a");

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

            /*let lastSectionId = menuLinks[menuLinks.length - 1].getAttribute('href').replace('#', '');

            if( id == lastSectionId ) {
                console.log("Bottom!");

                for(let i = 0; i < menuLinks.length; i++) {
                    if(menuLinks[i].classList.contains("chosen")) {
                        menuLinks[i].classList.remove("chosen");
                    }
                    //console.log(menuLinks[menuLinks.length - 1]);
                    menuLinks[menuLinks.length - 1].classList.add("chosen");
                }

            }*/

        });
    });

    let moreBtnAll = document.querySelectorAll(".show-more-btn"); // кнопки "Показать подробнее"
    let hideBtnAll = document.querySelectorAll(".hide-more-btn"); // кнопки "Скрыть"
    let moreBlocks = document.querySelectorAll(".more-block"); // все скрытые блоки подробнее

    // * ---- Открытие/скрытие всей информации обо всех проектах

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

    // * ---- Выделение пункта меню при прокручивании страницы до соответствующего блока
    let sections = document.querySelectorAll("section");

    window.addEventListener('scroll', markMenuItem);

    function markMenuItem() {

        // * выделяем последний пункт при прокрутке вниз страницы
        let lastSection = menuLinks[menuLinks.length - 1];

        if (document.body.scrollHeight == Math.ceil(window.scrollY) + document.documentElement.clientHeight) {
            lastSection.classList.add("chosen-last-item");
        } else {
            if(lastSection.classList.contains("chosen-last-item")) {
                lastSection.classList.remove("chosen-last-item");
            }  
        }

        sections.forEach((section) => {
            let menuLink = document.querySelector(`.nav a[href="#${section.id}"]`); // соответств. пункт меню

            // * определение смещения с учетом закрепленной шапки
            let headerMenu = document.querySelector("header"); 
            let headerHeight = parseFloat(window.getComputedStyle(headerMenu).height); // высота шапки
            let secTopOffset = section.offsetTop - headerHeight - 25; // с учетом половины значения margin-bottom
        
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

            // проверяется что, 1) страница прокручена на значение больше величины смещения элемента,
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

}