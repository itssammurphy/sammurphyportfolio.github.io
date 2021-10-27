function calcAge() {
  var birthday = new Date(2005, 11, 3);
  var diffms = Date.now() - birthday.getTime();

  var age_time_diff = new Date(diffms);
  return Math.abs(age_time_diff.getUTCFullYear() - 1970);
}

$(document).ready(() => {
  $('#age-number').text(calcAge());
});
