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
function isTemplateNavigationVisible() {
  if (
      localStorage.getItem('templates-navigation') == 'templates-navigation_visible'
      || localStorage.getItem('templates-navigation') == null
  ) {
    return true;
  } else if ( localStorage.getItem('templates-navigation') == 'templates-navigation_hidden' ) {
    return false;
  }
}

if ( isTemplateNavigationVisible() ) {
  templatesNavigation[0].classList.add('templates-navigation_visible');
} else {
  templatesNavigation[0].classList.add('templates-navigation_hidden');
}
