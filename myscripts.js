var b = parseInt(document.getElementById("maincolours").value)

function controlsChanged() {
  document.getElementById("controller").innerHTML = "", b = parseInt(document.getElementById("maincolours").value);
  for (let d = 1; d <= b; d += 1) {
    var t = document.createElement("p");
    t.style.color = "white", t.appendChild(document.createTextNode("Middle Colour " + d)), document.getElementById("controller").appendChild(t);
    t = document.createElement("input");
    t.type = "color", t.name = "colour" + (d + 1), t.setAttribute("onkeyup", "formChanged()"), t.setAttribute("onchange", "formChanged()"), t.setAttribute("value", `#${Math.floor(Math.random()*16777215).toString(16)}`), t.style.cssText = "width:100%; border: none; padding: 0; background-color: black", document.getElementById("controller").appendChild(t);
    t = document.createElement("input");
    t.type = "range", t.min = "0", t.max = "50", t.setAttribute("value", t.max / (b + 1) * d), t.setAttribute("oninput", "formChanged()"), t.setAttribute("id", "middleLocation" + d), t.style.cssText = "width:95%; float: left; margin-right: 10px", document.getElementById("controller").appendChild(t);
    t = document.createElement("p");
    t.setAttribute("id", "middleInt" + d), document.getElementById("controller").appendChild(t)
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
    let c = []
    let d = []
    for (let l = 1; l <= 1 + b; l += 1) a.push(hexToRgb(document.getElementsByName("colour" + l)[0].value))
    a.push(hexToRgb(document.getElementsByName("bottomcolour")[0].value))
    for (let l = 1; l <= b; l += 1) {
      c.push(Math.round(document.getElementById("middleLocation" + l).value / l))
      d.push(Math.round((colourCount - c[l - 1] / b + 1)))
    }
    let rgbList = [
      [],
      [],
      [],
    ];
    for (let k = 0; k < b; k += 1)
      for (let l = 0; l < 3; l += 1)
        for (let i = a[k][l], j = 0; i <= a[k + 1][l], j < c[k]; i += (a[k + 1][l] - a[k][l]) / c[k], j += 1) rgbList[l].push(i);
    for (let l = 0; l < 3; l += 1)
      for (let i = a[b][l], j = 0; i >= a[b + 1][l], j < d[b - 1]; i -= (a[b][l] - a[b + 1][l]) / d[b - 1], j += 1) rgbList[l].push(i);
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
