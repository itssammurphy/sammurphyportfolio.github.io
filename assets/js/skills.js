var languageSkills = {
  "html": "100%",
  "python": "90%",
  "js": "85%",
  "sql": "70%",
  "cpp": "65%",
  "git": "65%"
}

var multiply = 2;

$.each(languageSkills, (lang, percent) => {
  var delay = 600;
  setTimeout(() => {
    $('#'+lang+'-percent').hide().html(percent).fadeIn(600);
  }, delay*multiply);

  multiply++;
});
