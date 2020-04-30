window.onload = function () {
    let sliderConteiner = document.querySelector(".slider_conteiner");
    let sliderItem = Array.from(document.querySelectorAll(".slider_item"));
    let images = []; //массив из url картинок
    let count = sliderItem.length;
    let image = 0;
    let rightButton = document.querySelector(".right_button");
    let leftButton = document.querySelector(".left_button");

    scaleImage();

    /* формирование url картинки и добавление в массив images */
    for (let i = 1; i <= 11; i++) {
        let urlNumber = `url(images/desert${i}.jpg)`;
        images.push(urlNumber);
    };

    /*заполнение элементов изображением*/
    sliderItem.forEach(element => {
        element.style.backgroundImage = images[image];
        image += 1;

    });

    leftButton.addEventListener("click", () => {
        let deleteItem = sliderItem.shift().remove();
        let newItem = document.createElement('div');
          newItem.classList.add("slider_item");
          newItem.classList.add("notTarget");
          newItem.style.backgroundImage = images[count];
          sliderConteiner.append(newItem);
          sliderItem.push(newItem);
          count ++;

        if (count == images.length-1) {
            count = 0;
        }
        scaleImage();

    });

/*поведение элементов слайдера при наведении курсора и ухода курсора*/ 
function scaleImage(){
    let sliderItem = Array.from(document.querySelectorAll(".slider_item"));
    sliderItem.forEach((image, index) => {
        let currentImageIndex = index;
        image.addEventListener("mouseover", (e) => {
          
            e.target.style.transform = 'scale(1.5)';
            e.target.style.zIndex = '1';
            e.target.classList.remove('notTarget');
            filtersliderItem(currentImageIndex, "-25%", "25%");
        });

        image.addEventListener("mouseout", (e) => {
            e.target.style.transform = "scale(1)";
            e.target.style.zIndex = "0";
            e.target.classList.add("notTarget");
            filtersliderItem(currentImageIndex, '0', '0')
        });
    });
}

    

/*функция возвращающая массивы с элементами до и после элемента, на котором произошл event */
    function filtersliderItem(currentImageIndex, percentLeft, percentRight){
        let imageRight = sliderItem.filter((item, index) => {
            if (item.classList.contains("notTarget") && index > currentImageIndex) {
                return item;
            }
        });

        let imageLeft = sliderItem.filter((item, index) => {
            if (item.classList.contains("notTarget") && index < currentImageIndex) {
                return item;
            }
        });
        imageRight.forEach(element => element.style.transform = `translateX(${percentRight})`);
        imageLeft.forEach(element=> element.style.transform = `translateX(${percentLeft})`);

    }

};