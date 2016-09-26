var templatesNavigationBtn = document.querySelectorAll('.templates-navigation-btn');

// переключение состояния панели навигации
templatesNavigationBtn[0].addEventListener('click', function(e) {
  e.preventDefault();

  templatesNavigation[0].classList.add('templates-navigation_transition');

  if (templatesNavigation[0].classList.contains('templates-navigation_visible')) {
    // спрятать
    // кнопкау
    this.classList.remove('templates-navigation-btn_arrow');
    this.classList.add('templates-navigation-btn_hamburger');
    // панель навигации
    templatesNavigation[0].classList.remove('templates-navigation_visible');
    templatesNavigation[0].classList.add('templates-navigation_hidden');
    localStorage.setItem('templates-navigation', 'templates-navigation_hidden');
  } else {
    //показать
    // кнопку
    this.classList.remove('templates-navigation-btn_hamburger');
    this.classList.add('templates-navigation-btn_arrow');
    // панель навигации
    templatesNavigation[0].classList.add('templates-navigation_visible');
    templatesNavigation[0].classList.remove('templates-navigation_hidden');
    localStorage.setItem('templates-navigation', 'templates-navigation_visible');
  }

});
