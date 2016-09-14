ready(function(){
  (function(){
    let templatesNavigation = document.querySelectorAll('.templates-navigation');
    let templatesNavigationToggle = document.querySelectorAll('.templates-navigation__toggle');
    let templatesNavigationLink = document.querySelectorAll('.templates-navigation__link');
    let currentUrlPath = window.location.pathname;

    // проверка на текущий шаблон
    Array.prototype.forEach.call(templatesNavigationLink, function(el, i) {
      if (el.getAttribute('href') == currentUrlPath) {
        el.classList.add('templates-navigation__link_current')
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

    // переключение состояния панели навигации
    templatesNavigationToggle[0].addEventListener('click', function() {

      templatesNavigation[0].classList.add('templates-navigation_transition');

      if (templatesNavigation[0].classList.contains('templates-navigation_visible')) {
        templatesNavigation[0].classList.remove('templates-navigation_visible');
        templatesNavigation[0].classList.add('templates-navigation_hidden');
        localStorage.setItem('templates-navigation', 'templates-navigation_hidden');
      } else {
        templatesNavigation[0].classList.add('templates-navigation_visible');
        templatesNavigation[0].classList.remove('templates-navigation_hidden');
        localStorage.setItem('templates-navigation', 'templates-navigation_visible');
      }

    });

  }());
});
