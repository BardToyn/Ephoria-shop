/*header fixed - start*/

const header = document.querySelector('.header-fixed');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  
  if (currentScroll > 100 && currentScroll > lastScroll) {
    // Прокрутили более 100px вниз и движемся вниз
    header.style.top = '0';
  } else if (currentScroll < lastScroll || currentScroll <= 100) {
    // Движемся вверх или находимся ближе к верху страницы
    header.style.top = '-100px';
  }
  
  lastScroll = currentScroll;
});

/*header fixed - end*/

/*Burger menu - start */

const burgerBtn = document.getElementById('burgerBtn');
const menu = document.getElementById('menu');
const closeBtn = document.getElementById('closeBtn');

burgerBtn.addEventListener('click', () => {
  menu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  menu.classList.remove('active');
});

let touchStartX = null;

menu.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

menu.addEventListener('touchmove', (e) => {
  if (touchStartX !== null) {
    const touchMoveX = e.touches[0].clientX;
    const deltaX = touchMoveX - touchStartX;

    // Допустимый порог для определения свайпа
    const threshold = 50;

    if (deltaX > threshold) {
      // Пользователь свайпнул вправо, закрываем меню
      menu.classList.remove('active');
    }

    touchStartX = null;
  }
});

menu.addEventListener('touchend', () => {
  touchStartX = null;
});


/*Burger menu - end */

/* mobile search - start */

document.addEventListener("DOMContentLoaded", function () {
const searchBtn = document.getElementById("searchBtn");
const mobileSearchWrap = document.querySelector(".mobile-search-wrap");

let isOpen = false;

    searchBtn.addEventListener("click", function () {
        if (isOpen) {
        mobileSearchWrap.style.top = "-85px";
        } else {
        mobileSearchWrap.style.top = "85px";
        }
        isOpen = !isOpen;
    });
});  

/* mobile search end */

/*accordion start*/

const footerAccordionItems = document.querySelectorAll('.footer-accordion-item');

footerAccordionItems.forEach(item => {
    const header = item.querySelector('.footer-accordion-header');
    const arrow = header.querySelector('.footer-accordion-arrow');
    const content = item.querySelector('.footer-accordion-content');

    header.addEventListener('click', () => {
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
            arrow.style.transform = 'rotate(90deg)'; // Поворачиваем иконку обратно
        } else {
            content.style.maxHeight = content.scrollHeight + 'px';
            arrow.style.transform = 'rotate(270deg)'; // Поворачиваем иконку на 270 градусов
        }
    });
});

/*accordion end*/

/*hero slider start*/

const sliderList = document.querySelector('.hero-slider-list');
const prevBtn = document.querySelector('.hero-slider-btn-prev');
const nextBtn = document.querySelector('.hero-slider-btn-next');
const paginationWrap = document.querySelector('.hero-slider-pagination-wrap');
const slides = document.querySelectorAll('.hero-slider-item');
const paginationDots = [];

let currentIndex = 0;

// Создаем точки пагинации на основе количества слайдов
slides.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('hero-slider-pagination-dot');
    paginationWrap.appendChild(dot);
    dot.addEventListener('click', () => {
        currentIndex = index;
        goToSlide(currentIndex);
    });
    paginationDots.push(dot);
});

function goToSlide(index) {
    sliderList.style.transform = `translateX(-${index * 100}%)`;
    paginationDots.forEach((dot, i) => {
        dot.classList.toggle('active-pagination-dot', i === index);
    });
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    goToSlide(currentIndex);
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
});

// Функция для автоматической смены слайдов
function autoSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    goToSlide(currentIndex);
}

const interval = setInterval(autoSlide, 5000);

// Начнем с первого слайда
goToSlide(currentIndex);

/*hero slider end*/

/*slider in home */

document.addEventListener("DOMContentLoaded", function () {
  const list = document.querySelector(".section-arrival-list");
  const prevBtn = document.querySelector(".section-arrival-btn-prev");
  const nextBtn = document.querySelector(".section-arrival-btn-next");

  prevBtn.addEventListener("click", function () {
      list.scrollBy({ left: -list.clientWidth, behavior: "smooth" });
  });

  nextBtn.addEventListener("click", function () {
      list.scrollBy({ left: list.clientWidth, behavior: "smooth" });
  });
});

/*slider in home */

/*feedback slider*/

document.addEventListener("DOMContentLoaded", function () {
  const slider = document.querySelector(".section-feedback-list");
  const slides = slider.querySelectorAll(".section-feedback-item");
  const pagination = document.querySelector(".section-feedback-pagination");
  let currentIndex = 0;

  function showSlide(index) {
      const screenWidth = window.innerWidth;
      let slideWidth = 460; // Ширина слайда по умолчанию

      if (screenWidth <= 1280) {
          slideWidth = 306; // Если ширина экрана меньше или равна 1280px, используем ширину 425px
      }

      slides.forEach((slide) => {
          slide.style.transform = `translateX(-${index * slideWidth}px)`;
      });
  }

  function updatePagination() {
      pagination.innerHTML = ""; // Очистить пагинацию
      slides.forEach((_, index) => {
          const dot = document.createElement("span");
          dot.classList.add("pagination-dot");
          dot.addEventListener("click", () => {
              currentIndex = index;
              showSlide(currentIndex);
          });
          pagination.appendChild(dot);
      });
      const dots = pagination.querySelectorAll(".pagination-dot");
      dots[currentIndex].classList.add("active");
  }

  function autoSlide() {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
      updatePagination();
  }

  // Инициализация слайдера
  showSlide(currentIndex);
  updatePagination();

  // Запуск автоматической смены слайдов каждые 3 секунды
  setInterval(autoSlide, 3000);
});


/*feedback slider*/