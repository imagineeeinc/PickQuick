var slide = document.getElementsByClassName("slider");
var red = document.getElementById("red");
var green = document.getElementById("green");
var blue = document.getElementById("blue");
var pre = document.getElementById("pre");
var rednum = document.getElementById("rednum");
var greennum = document.getElementById("greennum");
var bluenum = document.getElementById("bluenum");
var invert = true
if (localStorage.getItem("colour_invert") == undefined) {
  localStorage.setItem("colour_invert", "true")
}
window.onload = function() {
  if (localStorage.getItem("colour_invert") == "true") {
    document.getElementById("invert_colour").checked = true
  } else if (localStorage.getItem("colour_invert") == "false") {
    document.getElementById("invert_colour").checked = false
  }
  checked()
}
set()
rednum.value = red.value
greennum.value = green.value
bluenum.value = blue.value

red.onchange = function () {
  set()
  rednum.value = red.value
}
green.onchange = function () {
  set()
  greennum.value = green.value
}
blue.onchange = function () {
  set()
  bluenum.value = blue.value
}

rednum.onchange = function () {
  red.value = rednum.value
  set()
}
greennum.onchange = function () {
  green.value = greennum.value
  set()
}
bluenum.onchange = function () {
  blue.value = bluenum.value
  set()
}
function set() {
  //preview
  pre.style.background = "rgba(" + red.value + ", " + green.value + "," + blue.value + ")";
  pre.style.boxShadow = "5px 5px 8px rgba(" + red.value + ", " + green.value + "," + blue.value + ", 0.3), -5px -5px 8px #ffffff";
  //copy
  document.getElementById("rgb").value = red.value + ", " + green.value + ", " + blue.value;
  document.getElementById("hex").value = rgbTohex(parseInt(red.value), parseInt(green.value), parseInt(blue.value))
  document.getElementById("hsl").value = rgbtohsl(parseInt(red.value), parseInt(green.value), parseInt(blue.value))
  //knobs
  if (localStorage.getItem("colour_invert") == "false") {
    document.getElementById("knobs").innerHTML = "#red::-webkit-slider-thumb { background-color: " + rgbTohex(parseInt(red.value), 0, 0) + ";}\n#green::-webkit-slider-thumb{ background-color: " + rgbTohex(0, parseInt(green.value),0) + ";}\n#blue::-webkit-slider-thumb { background-color: " + rgbTohex(0, 0, parseInt(blue.value)) + ";}"
  } else if (localStorage.getItem("colour_invert") == "true") {
    document.getElementById("knobs").innerHTML = "#red::-webkit-slider-thumb { background-color: " + rgbTohex((255 - parseInt(red.value)), 0, 0) + ";}\n#green::-webkit-slider-thumb{ background-color: " + rgbTohex(0, (255 - parseInt(green.value)),0) + ";}\n#blue::-webkit-slider-thumb { background-color: " + rgbTohex(0, 0, (255 - parseInt(blue.value))) + ";}"
  }
  //document.getElementById("knobs").innerHTML = "#red::-webkit-slider-thumb { background-color: " + rgbTohex(parseInt(red.value), 0, 0) + ";}\n#green::-webkit-slider-thumb{ background-color: " + rgbTohex(0, parseInt(green.value),0) + ";}\n#blue::-webkit-slider-thumb { background-color: " + rgbTohex(0, 0, parseInt(blue.value)) + ";}"
  //document.getElementById("knobs").innerHTML = "#red::-webkit-slider-thumb { background-color: " + rgbTohex((255 - parseInt(red.value)), 0, 0) + ";}\n#green::-webkit-slider-thumb{ background-color: " + rgbTohex(0, (255 - parseInt(green.value)),0) + ";}\n#blue::-webkit-slider-thumb { background-color: " + rgbTohex(0, 0, (255 - parseInt(blue.value))) + ";}"
}
function checked() {
  setInterval(function() {
    if (document.getElementById("invert_colour").checked == true) {
      localStorage.setItem("colour_invert", "true")
    } else if (document.getElementById("invert_colour").checked == false) {
      localStorage.setItem("colour_invert", "false")
    }
    set()
  }, 1)
}
function rgbTohex(r, g, b) {
  r = r.toString(16);
  g = g.toString(16);
  b = b.toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}
function rgbtohsl(r,g,b) {
  // Make r, g, and b fractions of 1
  r /= 255;
  g /= 255;
  b /= 255;

  // Find greatest and smallest channel values
  let cmin = Math.min(r,g,b),
      cmax = Math.max(r,g,b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;
  // Calculate hue
  // No difference
  if (delta == 0)
    h = 0;
  // Red is max
  else if (cmax == r)
    h = ((g - b) / delta) % 6;
  // Green is max
  else if (cmax == g)
    h = (b - r) / delta + 2;
  // Blue is max
  else
    h = (r - g) / delta + 4;

  h = Math.round(h * 60);
    
  // Make negative hues positive behind 360°
  if (h < 0)
      h += 360;
  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    
  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return h + "," + s + "%," + l + "%";
}

function copy(ele) {
  //alert("copy not supported")
  var copyText = document.getElementById(ele).value
  navigator.clipboard.writeText(copyText).then(function() {
  /* clipboard successfully set */
}, function() {
  /* clipboard write failed */
  console.log("fail to copy")
  alert("looks like copy doesn't work on your device")
});
}