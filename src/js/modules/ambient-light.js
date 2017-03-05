window.addEventListener("devicelight", function (event) {
  var luminosity = event.value;
  var bodyClasses = 'ambient';
  var newClass,
      combinedClasses;

  // Show luminosity in the console for debugging purposes
  // console.log(luminosity);

  if (luminosity <= 10) {
    newClass = "dark--0";
  } else if (luminosity <= 20) {
    newClass = "dark--1";
  } else if (luminosity <= 30) {
    newClass = "dark--2";
  } else if (luminosity <= 40) {
    newClass = "dark--3";
  } else if (luminosity <= 50) {
    newClass = "dark--4";
  } else if (luminosity <= 60) {
    newClass = "dark--5";
  } else if (luminosity <= 70) {
    newClass = "dark--6";
  } else if (luminosity <= 80) {
    newClass = "dark--7";
  } else if (luminosity <= 90) {
    newClass = "dark--8";
  } else if (luminosity <= 100) {
    newClass = "dark--9";
  } else if (luminosity > 100) {
    newClass = "dark--10";
  }

  combinedClasses = bodyClasses + ' ' + newClass;

  document.body.className = combinedClasses;
});
