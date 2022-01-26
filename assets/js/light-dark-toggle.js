$('#light-dark-toggle').change(() => {
  toggleDark();
});

function toggleDark() {
  if ($('#light-dark-toggle').is(':checked')) {
    //CHECKED = DARK MODE
    darkMode();
  } else {
    //NOT CHECKED = LIGHT MODE
    lightMode();
  }
}

function darkMode() {
  document.documentElement.style.setProperty('--background-color', '#202020');
  document.documentElement.style.setProperty('--text-color', '#fff');
  document.documentElement.style.setProperty('--second-text-color', '#9c9c9c');
  document.documentElement.style.setProperty('--accent-color', '#ffd09e');
  document.documentElement.style.setProperty('--selected-color', '#525252');
  document.documentElement.style.setProperty('--section-even-color', '#2b2b2b');
  document.documentElement.style.setProperty('--tile-bg', '#383838');
  document.documentElement.style.setProperty('--tile-shadow', '#333333');
  document.documentElement.style.setProperty('--tile-icon-shadow', '#525252');
  document.documentElement.style.setProperty('--project-tile-bg', '#2b2b2bbf');
  localStorage.setItem("light-dark", 1);
}
function lightMode() {
  document.documentElement.style.setProperty('--background-color', '#fff');
  document.documentElement.style.setProperty('--text-color', '#000');
  document.documentElement.style.setProperty('--second-text-color', '#5d5d5d');
  document.documentElement.style.setProperty('--accent-color', '#ff784f');
  document.documentElement.style.setProperty('--selected-color', '#9e9e9e');
  document.documentElement.style.setProperty('--section-even-color', '#f2f2f2');
  document.documentElement.style.setProperty('--tile-bg', '#d7d7d7');
  document.documentElement.style.setProperty('--tile-shadow', '#b9b9b9');
  document.documentElement.style.setProperty('--tile-icon-shadow', '#7d7d7d');
  document.documentElement.style.setProperty('--project-tile-bg', '#f2f2f2bf');
  localStorage.setItem("light-dark", 0);
}
