window.onload = function() {

    // Открытие информации о проекте при клике на "Посмотреть подробнее"
    let moreBtnAll = document.querySelectorAll(".show-more-btn");
    let moreButtons = Array.from(moreBtnAll);
    
    for(let i = 0; i < moreButtons.length; i++) {
        moreButtons[i].addEventListener("click", showMoreInfo);
    }

    // * функция отображения доп.информации, соответствующей кнопке, по которой кликнули
    function showMoreInfo() {
        let chosenProject = this.dataset.project;
        //console.log(this.dataset.project);

        let moreBlocks = document.querySelectorAll(".more-block");
        //console.log(moreBlocks);

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
    // принимает кнопку, на которую кликнули и значение атрибута data-project 
    function hideMoreInfo(btn,project) {
        btn.style.display = "none";
        document.querySelector('.more-block[data-project = "' + project + '"]').style.display = "none";
        document.querySelector('.show-more-btn[data-project = "' + project + '"]').style.display = "block";
    }


    // TODO сделать кнопки показать подробнее все (вверху) скрыть подробнее все - внизу (блок Опыт)



}