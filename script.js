window.onload = function() {

    let moreBtnAll = document.querySelectorAll(".show-more-btn"); // кнопки "Показать подробнее"
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

            for(let i = 0; i < moreBtnAll.length; i++) {
                moreBtnAll[i].style.display = "none";
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

            for(let i = 0; i < moreBtnAll.length; i++) {
                moreBtnAll[i].style.display = "block";
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
                hideBtn.style.display = "block";
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
        document.querySelector('.show-more-btn[data-project = "' + project + '"]').style.display = "block";
    }

    // TODO сделать кнопки показать подробнее все (вверху) скрыть подробнее все - внизу (блок Опыт)



}