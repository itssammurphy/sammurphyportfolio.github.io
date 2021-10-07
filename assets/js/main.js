

// ABOUT TABS

(() => {
  const abtSection = document.querySelector(".about-section");
  const tabsContainer = document.querySelector(".abt-tabs");

  tabsContainer.addEventListener("click", (event) => {
    let e = event;

    if (e.target.classList.contains("tab-item") && !e.target.classList.contains("active")) {
      // IF USER CLICKS ON NON-ACTIVE TAB
      const targetTab = e.target.getAttribute("data-target");
      // REMOVE ACTIVE CLASS FROM CURRENT TAB
      tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      abtSection.querySelector(".tab-content.active").classList.remove("active");

      //ACTIVATE TARGET TAB
      e.target.classList.add("active", "outer-shadow");
      abtSection.querySelector(targetTab).classList.add("active");
    }
  });
})();


// PORTFOLIO FILTERS AND POPUP MANAGEMENT
(() => {
  const portfolioInfo = {'fitbit-page': {'title':'Fitbit Product Page',
                                          'category': 'Websites',
                                          'description': `I made this website as a demonstration of my responsive design skills. It incorporates my knowledge of
                                          CSS animations, as well as JS and HTML to make an elegant product showcase page. Feel free to check it out for yourself.`,
                                          'date': 2021,
                                          'client': 'Myself',
                                          'tools': 'HTML, CSS, JavaScript',
                                          'url': 'project-demos/product-page/product-landing.html'},
                        'outplan-it': {'title': 'OutPlan.it',
                                        'category': 'Websites',
                                        'description': `In this project I used my knowledge of algorithms, combined with web design to create a platform which helps students manage their homework. By automatically scheduling when they do their homework and what work they do, it aims to reduce student stress and improve wellbeing and academic results.
<br><br>
This project is still under development and in the testing phase, so watch this space for updates regarding its publication.`,
                                        'date': 2021,
                                        'client': 'Myself',
                                        'tools': 'HTML, CSS, JavaScript, PHP, MySQL',
                                        'url': 'under-dev'},
                        'astar-implement': {'title': 'Astar Pathfinding Implementation',
                                            'category': 'Algorithms',
                                            'description': `Asides from being among possibly the most commonly cited programming examples ever, A* is a highly efficient pathfinding algorithm which many programmers turn to due to it\'s incredible efficiency (caused by its best-first approach rather than brute force).<br><br>
                                            This project is only dependent on PyGame, and a Python 3.8+ install.<br><br>
                                            To take a look at the code for yourself, go check out the GitHub Repository for this project.`}}

  const filterContainer = document.querySelector(".portfolio-filter");
  const portfolioItemsContainer = document.querySelector(".portfolio-items");
  const portfolioItems = document.querySelectorAll(".portfolio-item");
  const popup = document.querySelector(".portfolio-popup");
  const previousButton = popup.querySelector(".pp-prev");
  const nextButton = popup.querySelector(".pp-next");
  const closeButton = popup.querySelector(".pp-close");
  const projectDetailsCont = popup.querySelector(".pp-details");
  const projectDetailsButton = popup.querySelector(".pp-proj-details-btn");

  let itemIndex, slideIndex, ss;

  // FILTER THE PORTFOLIO
  filterContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains('filter-item') && !event.target.classList.contains("active")) {
      // DEACTIVATE THE ACTIVE FILTER
      filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      // ACTIVATE THE CHOSEN FILTER
      event.target.classList.add("active", "outer-shadow");
      const targetFilter = event.target.getAttribute("data-target");
      portfolioItems.forEach((item) => {
        if (targetFilter === item.getAttribute("data-category") || targetFilter === 'all') {
          item.childNodes[1].classList.remove("hide");
          item.childNodes[1].classList.add("show");
        } else {
          item.childNodes[1].classList.remove("show");
          item.childNodes[1].classList.add("hide");
        }
      });
    } else {
    }
  });

  portfolioItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".portfolio-item-inner")) {
      const portItem = event.target.closest(".portfolio-item-inner").parentElement;
      // GET INDEX OF PORTFOLIO ITEM
      itemIndex = Array.from(portItem.parentElement.children).indexOf(portItem);
      ss = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
      // CONVERT SS TO ARRAY FOR DISPLAY
      ss = ss.split(',');
      if (ss.length === 1) {
        previousButton.display = "none";
        nextButton.display = "none";
      } else {
        previousButton.display = "block";
        nextButton.display = "block";
      }
      slideIndex = 0;
      togglePortfolioPopup(event);
      popupSlideshow();

    }
  });

  closeButton.addEventListener("click", (event) => {
    togglePortfolioPopup(event);
  });

  function togglePortfolioPopup(e) {
    popup.classList.toggle("open");
    let projectName = e.target.closest(".portfolio-item").getAttribute('data-name');
    const popupTitle = document.querySelector(".pp-title");
    const ppH2 = popupTitle.querySelector("h2");
    const ppCategory = popupTitle.querySelector("p span");
    const ppDescription = document.getElementById("desc-text");
    const ppDate = document.getElementById("info-date");
    const ppClient = document.getElementById("info-client");
    const ppTools = document.getElementById("info-tools");
    const ppURL = document.getElementById("info-url");

    ppH2.innerHTML = portfolioInfo[projectName].title;
    ppDescription.innerHTML = portfolioInfo[projectName].description;
    ppCategory.innerHTML = portfolioInfo[projectName].category;
    ppDate.innerHTML = portfolioInfo[projectName].date;
    ppClient.innerHTML = portfolioInfo[projectName].client;
    ppTools.innerHTML = portfolioInfo[projectName].tools;
    if (portfolioInfo[projectName].url != 'under-dev') {
      ppURL.innerHTML = "<a href='"+portfolioInfo[projectName].url+"'>Click Here</a>";
    } else {
      ppURL.innerHTML = "Still under development";
    }


    toggleBodyScroll();
  }

  function popupSlideshow() {
    const imSrc = ss[slideIndex];
    const popIm = popup.querySelector(".pp-img");
    popIm.animate([
      {opacity: 1},
      {opacity: 0},
    ], {
      duration: 250,
    });
    setTimeout(function() {
      popIm.src = imSrc;
    }, 250);
    popIm.onload = () => {
      popIm.animate([
        {opacity: 0},
        {opacity: 1},
      ], {
        duration: 250,
      });
    };
    popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + ss.length;
  }

  //SHOW NEXT SCREENSHOT
  nextButton.addEventListener("click", () => {
    if (slideIndex === ss.length-1) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    popupSlideshow();
  });

  //SHOW PREVIOUS SCREENSHOT
  previousButton.addEventListener("click", () => {
    if (slideIndex === 0) {
      slideIndex = ss.length-1;
    } else {
      slideIndex += -1;
    }
    popupSlideshow();
  });

  //RENDER PROJECT DETAILS IN POPUP
  function popupDetailsToggle() {
    if (projectDetailsCont.classList.contains("active")) {
      projectDetailsCont.classList.remove("active");
      projectDetailsCont.style.maxHeight = 0 + "px";
    } else {
      projectDetailsCont.classList.add("active");
      projectDetailsCont.style.maxHeight = projectDetailsCont.scrollHeight + "px";
    }
  }

})();

function toggleBodyScroll() {
  document.body.classList.toggle("stop-scrolling");
}
