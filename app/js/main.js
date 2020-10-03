  var swiper = new Swiper('.swiper-container', {
    cssMode: true,
    slidesPerView: 1,
    spaceBetween: 50,
    slidesPerColumn: 2,
    slidesPerView: 2,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    //   dynamicBullets: true
    },
    mousewheel: true,
    keyboard: true,
  });