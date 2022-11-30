// dropdown menu
const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled",
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();

// hero-slider

const swiper = new Swiper(".js-hero-swiper", {
  // Optional parameters
  direction: "vertical",
  loop: true,
  allowTouchMove: false,
  effect: "fade",
  speed: 10000,
  autoplay: {
    delay: 10000,
  },
});

// gallery slider

document.addEventListener("DOMContentLoaded", () => {
  let gallerySlider = new Swiper(".gallery__swiper-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row",
    },
    spaceBetween: 20,
    pagination: {
      el: ".gallery__swiper-section .gallery__swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".btn-next",
      prevEl: ".btn-prev",
    },

    breakpoints: {
      441: {
        slidesPerView: 2,
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
    },

    a11y: false,
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    }, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    watchSlidesVisibility: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
    },

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });
});

// Choices

const defaultSelect = () => {
  const element = document.querySelector(".gallery__select");
  const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: "",
    allowHTML: true,
    shouldSort: false,
  });
};

defaultSelect();

//Accordion

(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0],
  });
})();

// Табы
const parameters = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active",
};

function setTabs(parameters) {
  const tabBtns = document.querySelectorAll(`.${parameters.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${parameters.wrap}`);
    const currentContent = wrap.querySelector(
      `.${parameters.content}[data-target="${path}"]`
    );
    const contents = wrap.querySelectorAll(`.${parameters.content}`);

    contents.forEach((el) => {
      el.classList.remove(parameters.active);
    });

    currentContent.classList.add(parameters.active);

    tabBtns.forEach((el) => {
      el.classList.remove(parameters.active);
    });

    this.classList.add(parameters.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(parameters);

const doingsSwiper = new Swiper(".doings__swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  slidesPerView: 3,
  spaceBetween: 50,

  // Navigation arrows
  navigation: {
    nextEl: ".doings__swiper-btn-next",
    prevEl: ".doings__swiper-btn-prev",
  },
});

// TOOLTIPS

tippy("#tooltip1", {
  content: "Пример современных тенденций - современная методология разработки",
  theme: "myTheme",
});

tippy("#tooltip2", {
  content:
    "Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции",
  theme: "myTheme",
});

tippy("#tooltip3", {
  content: "В стремлении повысить качество",
  theme: "myTheme",
});

const projectsSwiper = new Swiper(".projects__swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: false,
  slidesPerView: 3,
  spaceBetween: 50,

  // Navigation arrows
  navigation: {
    nextEl: ".projects-button-next",
    prevEl: ".projects-button-prev",
  },
});

// MAP

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init() {
  // Создание карты.
  var myMap = new ymaps.Map("map", {
    // Координаты центра карты.
    // Порядок по умолчанию: «широта, долгота».
    // Чтобы не определять координаты центра карты вручную,
    // воспользуйтесь инструментом Определение координат.
    center: [55.75847411879586,37.60108849999989],
    // Уровень масштабирования. Допустимые значения:
    // от 0 (весь мир) до 19.
    zoom: 16,


  });


	//myMap.controls.remove('geolocationControl'); // удаляем геолокацию
  myMap.controls.remove('searchControl'); // удаляем поиск
  myMap.controls.remove('trafficControl'); // удаляем контроль трафика
  myMap.controls.remove('typeSelector'); // удаляем тип
  myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
 // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
  myMap.controls.remove('rulerControl'); // удаляем контрол правил
  myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

  var myPlacemark = new ymaps.Placemark(
    [55.75847411879586,37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./images/map-point.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );

  // Размещение геообъекта на карте.

  myMap.geoObjects.add(myPlacemark);


}