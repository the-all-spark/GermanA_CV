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
        } );
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

    // * Прокручивание страницы вверх при клике на кнопку вверх (стрелка)
    let upBtn = document.querySelector(".up-btn");

    upBtn.addEventListener("click", function(e) {
        e.preventDefault();

        let anchor = document.querySelector(".container");
        anchor.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // TODO Выделение пункта меню при прокручивании страницы до этого пункта
    

}