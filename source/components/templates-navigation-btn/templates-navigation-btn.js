var templatesNavigationBtn = document.querySelectorAll('.templates-navigation-btn');
var templatesNavigationBtnElem = templatesNavigationBtn[0].querySelectorAll('.templates-navigation-btn__elem');

if ( isTemplateNavigationVisible() ) {
  templatesNavigationBtn[0].classList.add('templates-navigation-btn_arrow');
} else {
  templatesNavigationBtn[0].classList.add('templates-navigation-btn_hamburger');
}

// переключение состояния панели навигации
templatesNavigationBtn[0].addEventListener('click', function(e) {
  e.preventDefault();

  templatesNavigation[0].classList.add('templates-navigation_transition');
  for (var i = 0; i < templatesNavigationBtnElem.length; i++) {
    templatesNavigationBtnElem[i].classList.add('templates-navigation-btn__elem_transition');
  }

  if (templatesNavigation[0].classList.contains('templates-navigation_visible')) {
    // спрятать панель навигации
    templatesNavigation[0].classList.remove('templates-navigation_visible');
    templatesNavigation[0].classList.add('templates-navigation_hidden');
    localStorage.setItem('templates-navigation', 'templates-navigation_hidden');
    // вид кнопки - гамбургер
    this.classList.remove('templates-navigation-btn_arrow');
    this.classList.add('templates-navigation-btn_hamburger');
  } else {
    // показать панель навигации
    templatesNavigation[0].classList.remove('templates-navigation_hidden');
    templatesNavigation[0].classList.add('templates-navigation_visible');
    localStorage.setItem('templates-navigation', 'templates-navigation_visible');
    // вид кнопки - стрелка
    this.classList.remove('templates-navigation-btn_hamburger');
    this.classList.add('templates-navigation-btn_arrow');
  }

});
