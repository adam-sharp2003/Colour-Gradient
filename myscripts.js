var b = parseInt(document.getElementById("maincolours").value)

function controlsChanged() {
  document.getElementById("controller").innerHTML = '';
  b = parseInt(document.getElementById("maincolours").value)
  for (let l = 1; l <= b; l += 1) {
    var header = document.createElement("p");
    header.style.color = "white";
    header.appendChild(document.createTextNode("Middle Colour " + l));
    document.getElementById("controller").appendChild(header);
    var colour = document.createElement("input");
    colour.type = "color";
    colour.name = "colour" + (l + 1);
    colour.setAttribute("onkeyup", "formChanged()");
    colour.setAttribute("onchange", "formChanged()");
    colour.setAttribute("value", "#BD0000");
    colour.style.cssText = "width:100%; border: none; padding: 0; background-color: black";
    document.getElementById("controller").appendChild(colour);
    var middle = document.createElement("input");
    middle.type = "range";
    middle.min = "0";
    middle.max = "50";
    middle.setAttribute("value", middle.max / (b + 1) * l);
    middle.setAttribute("oninput", "formChanged()");
    middle.setAttribute("id", "middleLocation" + l);
    middle.style.cssText = "width:95%; float: left; margin-right: 10px";
    document.getElementById("controller").appendChild(middle);
    var middlenum = document.createElement("p");
    middlenum.setAttribute("id", "middleInt" + l);
    document.getElementById("controller").appendChild(middlenum);
  }
}

function formChanged() {
  document.getElementById("colourMap").innerHTML = '';
  const getColour = (n) => {
    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ] : null;
    }
    let a = []
    let d = []
    let e = []
    for (let l = 1; l <= 1 + b; l += 1) a.push(hexToRgb(document.getElementsByName("colour" + l)[0].value))
    a.push(hexToRgb(document.getElementsByName("bottomcolour")[0].value))
    for (let l = 1; l <= b; l += 1) {
      d.push(document.getElementById("middleLocation" + l).value)
      e.push(colourCount - d[l - 1] + 1)
    }
    let rgbList = [
      [],
      [],
      [],
    ];
    for (let k = 1; k <= b; k += 1) {
      for (let l = 0; l < 3; l += 1)
        for (let i = a[2 * k - 2][l], j = 0; i <= a[2 * k - 1][l], j < d[k-1]; i += (a[2 * k - 1][l] - a[2 * k - 2][l]) / d[k-1], j += 1) rgbList[l].push(i);
      for (let l = 0; l < 3; l += 1)
        for (let i = a[2 * k - 1][l], j = 0; i >= a[2 * k - 0][l], j < e[k-1]; i -= (a[2 * k - 1][l] - a[2 * k - 0][l]) / e[k-1], j += 1) rgbList[l].push(i);
    }
    return `#${[rgbList[0][Math.round(n*10)],rgbList[1][Math.round(n*10)],rgbList[2][Math.round(n*10)]].map(n=>Math.round(n).toString(16).padStart(2,0)).join("")}`
  };
  var colourCount = document.getElementById("colourCount").value * 10
  for (let l = 1; l <= b; l += 1) {
    document.getElementById("middleInt" + l).innerHTML = document.getElementById("middleLocation" + l).value / 10
    document.getElementById("middleLocation" + l).max = colourCount;
  }
  document.getElementById("colourCountInt").innerHTML = colourCount / 10
  for (let l = 0; l <= colourCount; l += 1) {
    const para = document.createElement("div");
    para.appendChild(document.createTextNode(l / 10));
    para.setAttribute("id", "colour" + l);
    document.getElementById("colourMap").appendChild(para);
    document.getElementById("colour" + l).style.cssText = `background-color: ${getColour(l / 10)}; margin: 0; height: ${5/(colourCount/100)}px; font-size: ${5/(colourCount/100)}px; color: white`;
  }
}
