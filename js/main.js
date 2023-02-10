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
      580: {
        slidesPerGroup: 3,
        slidesPerView: 2,
        spaceBetween: 38,
      },

      1000: {
        slidesPerGroup: 2,
        slidesPerView: 2,
        spaceBetween: 34,
      },

      1200: {
        slidesPerGroup: 3,
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

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    type: "bullets",
  },

  breakpoints: {
    320: {
      slidesPerView: 1,

      slidesPerGroup: 1,
    },

    700: {
      slidesPerView: 2,
      spaceBetween: 34,
      slidesPerGroup: 2,
    },

    998: {
      slidesPerView: 3,
      spaceBetween: 27,
      slidesPerGroup: 3,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
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
  theme: "myTheme2",
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

  breakpoints: {
    100: {
      slidesPerView: 1,
      spaceBetween: 10,
    },

    485: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    767: {
      slidesPerView: 2,
      spaceBetween: 35,
    },

    1200: {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

// MAP

ymaps.ready(init);
function init() {
  const mapElem = document.querySelector("#map");
  const myMap = new ymaps.Map(
    "map",
    {
      center: [55.75847411879586, 37.60108849999989],
      zoom: 14,
      controls: ["geolocationControl", "zoomControl"],
    },
    {
      suppressMapOpenBlock: true,
      geolocationControlSize: "large",
      geolocationControlPosition: { top: "300px", right: "20px" },
      geolocationControlFloat: "none",
      zoomControlSize: "small",
      zoomControlFloat: "none",
      zoomControlPosition: { top: "200px", right: "20px" },
    }
  );

  if (window.matchMedia("(max-width: 1024px)").matches) {
    if (Object.keys(myMap.controls._controlKeys).length) {
      myMap.controls.remove("zoomControl");
      myMap.controls.remove("geolocationControl");
    }
  }

  myMap.behaviors.disable("scrollZoom");

  myMap.events.add("sizechange", function (e) {
    if (window.matchMedia("(max-width: 1024px)").matches) {
      if (Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.remove("zoomControl");
        myMap.controls.remove("geolocationControl");
      }
    } else {
      if (!Object.keys(myMap.controls._controlKeys).length) {
        myMap.controls.add("zoomControl");
        myMap.controls.add("geolocationControl");
      }
    }
  });

  var myPlacemark = new ymaps.Placemark(
    [55.75847411879586, 37.60108849999989],
    {},
    {
      iconLayout: "default#image",
      iconImageHref: "./images/map-point.svg",
      iconImageSize: [20, 20],
      iconImageOffset: [0, 0],
    }
  );

  myMap.geoObjects.add(myPlacemark);
  myMap.container.fitToViewport();
}

// Validate

var selector = document.querySelector("input[type='tel']");

var im = new Inputmask("+7(999) 999-99-99");
im.mask(selector);



let validation = new JustValidate("#form", {
  errorLabelStyle: {
    color: "#D11616",
  },
});

validation.addField("#name", [
  {
    rule: "required",
    errorMessage: "Вы не ввели имя",
  },
  {
    rule: "minLength",
    value: 3,
    errorMessage: "Минимум 3 символа",
  },
  {
    rule: "maxLength",
    value: 30,
    errorMessage: "Максимум 30 символов",
  },
]);

validation.addField("#tel", [
  {
    rule: "required",
    errorMessage: "Вы не ввели телефон",
  },
  {
    validator: (value) => {
      const tel = selector.inputmask.unmaskedvalue();
      return Boolean(Number(tel) && tel.length > 0);
    },
    errorMessage: "Вы не ввели телефон",
  },
  {
    validator: (value) => {
      const tel = selector.inputmask.unmaskedvalue();
      return Boolean(Number(tel) && tel.length === 10);
    },
    errorMessage: "Введите телефон полностью",
  },
]);

// Search Form

let search = document.querySelector(".form-search");
let close = document.querySelector(".form-search-close");

document.getElementById("open").addEventListener("click", () => {
  search.classList.add("form-search-show");
  search.removeAttribute("inert");
  document.getElementById("open").classList.add("header__search-close");
});

close.addEventListener("click", () => {
  search.classList.remove("form-search-show");
  document.getElementById("open").classList.remove("header__search-close");
});

document.getElementById("open").addEventListener("submit", (e) => {
  e.preventDefault();
});

// Burger

let burgerBtn = document.querySelector(".burger");
let burgerMenu = document.querySelector(".burger__nav");
let burgerLinks = document.querySelectorAll(".burger__nav");
burgerMenu.inert = true;

burgerBtn.addEventListener("click", () => {
  burgerMenu.classList.add("burger__nav-active");
  burgerMenu.removeAttribute("inert");
  burgerMenu.inert = false;
  document.body.classList.toggle("stop-scroll");
});

burgerLinks.forEach(function (el) {
  el.addEventListener("click", function () {
    burgerMenu.classList.remove("burger__nav-active");
    document.body.classList.remove("stop-scroll");
  });
});

// Smooth scroll

const anchors = document.querySelectorAll('a[href*="#painter-"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const media = window.matchMedia("(max-width: 1000px)");
    const blockID = anchor.getAttribute("href").substr(1);
    if (media.matches) {
      document.getElementById(blockID).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
}

// Modal windows

const modalBtn = document.querySelectorAll(".gallery__swiper-slide");
const modalOverlay = document.querySelector(".modal__overlay");
const modal = document.querySelectorAll(".modal");
const closeBtn = document.querySelectorAll(".modal__btn-close");
modalBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    let path = e.currentTarget.getAttribute("data-path");

    modal.forEach((el) => {
      el.classList.remove(".modal__window-visible");
    });

    document
      .querySelector(`[data-target = "${path}"]`)
      .classList.add("modal__window-visible");

    modalOverlay.classList.add("modal__overlay-visible");
    document.querySelector(`[data-target = ${path}]`).removeAttribute("inert");

    document.body.classList.toggle("stop-scroll");
  });
});

modalOverlay.addEventListener("click", (e) => {
  if (e.target == modalOverlay) {
    modal.forEach((el) => {
      el.classList.remove(".modal__window-visible");
    });

    modalOverlay.classList.remove("modal__overlay-visible");
  }
});

closeBtn.forEach((el) => {
  el.addEventListener("click", (e) => {
    modal.forEach((el) => {
      el.classList.remove(".modal__window-visible");
    });
    modalOverlay.classList.remove("modal__overlay-visible");
    document.body.classList.remove("stop-scroll");
  });
});
