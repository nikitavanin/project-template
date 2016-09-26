var templatesNavigation = document.querySelectorAll('.templates-navigation');
var templatesNavigationLink = document.querySelectorAll('.templates-navigation__link');
var currentUrlPath = window.location.pathname;

// проверка на текущий шаблон
Array.prototype.forEach.call(templatesNavigationLink, function(el, i) {
  if (el.getAttribute('href') == currentUrlPath) {
    el.classList.add('templates-navigation__link_current');
    el.parentElement.classList.add('templates-navigation__item_current');
    return;
  }
});

// проверка состояния панели навигации
if (
    localStorage.getItem('templates-navigation') == 'templates-navigation_visible'
    || localStorage.getItem('templates-navigation') == null
  ) {
  templatesNavigation[0].classList.add('templates-navigation_visible');
} else if (localStorage.getItem('templates-navigation') == 'templates-navigation_hidden') {
  templatesNavigation[0].classList.add('templates-navigation_hidden');
}
