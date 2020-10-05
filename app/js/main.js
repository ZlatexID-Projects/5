  var swiper = new Swiper('.swiper-container', {
    cssMode: false,
    slidesPerView: 1,
    spaceBetween: 10,
    updateOnWindowResize: true,
    centeredSlides: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    //   dynamicBullets: true
    },
    mousewheel: true,
    keyboard: true,
    breakpoints: {
      1200:{
        cssMode: true,
        spaceBetween: 50,
        slidesPerColumn: 2,
        slidesPerView: 2,
      },
      990:{
        cssMode: true,
        spaceBetween: 0,
        slidesPerColumn: 2,
        slidesPerView: 2,
      },
      768:{
        cssMode: true,
        spaceBetween: 100,
        slidesPerColumn: 2,
        slidesPerView: 1,
      }

    }
  });