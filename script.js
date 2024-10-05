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
                //! добавить обработчик события закрытия блока при клике на кнопку Скрыть

                this.style.display = "none";
            }
        }

    }




}