let isDirty = false
const input = document.querySelector('select')
input.addEventListener('change', () => {
  isDirty = true
})

window.addEventListener("beforeunload", (e) => {
  if (!isDirty) {
    return;
  }
  e.returnValue = true;
  return true
});

var presets = [
  ["#ff9f00", "#37008a", "#b63202", "#b22d02", "#af2802", "#ab2202", "#a81d02", "#a41803", "#a11303", "#9d0d03", "#9a0803", "#960303"]
]

function presetSave() {
  t = document.createElement("option");
  t.setAttribute("value", presets.length), t.appendChild(document.createTextNode(document.getElementById("pname").value != "" ? document.getElementById("pname").value : `Custom ${presets.length}`)), document.getElementById("gen").appendChild(t);
  let y = []
  for (let i = 0; i < document.querySelectorAll('[name*="colour"]').length; i += 1) y.push(document.querySelectorAll('[name*="colour"]')[i].value);
  presets.push(y)
}

function controlsChanged() {
  document.getElementById("controller").innerHTML = "", b = parseInt(document.getElementById("maincolours").value);
  for (let d = 1; d <= b; d += 1) {
    var t = document.createElement("p");
    t.style.color = "white", t.appendChild(document.createTextNode("Middle Colour " + d)), document.getElementById("controller").appendChild(t);
    t = document.createElement("input");
    t.type = "color", t.name = "colour" + (d + 1), t.setAttribute("onkeyup", "formChanged()"), t.setAttribute("onchange", "formChanged()")
    t.setAttribute("value", document.getElementById("gen").value == "Random" ? `#${Math.floor(Math.random()*16777215).toString(16)}` : presets[document.getElementById("gen").value][d + 1])
    t.style.cssText = "width:100%; border: none; padding: 0; background-color: black", document.getElementById("controller").appendChild(t);
    t = document.createElement("input");
    t.type = "range", t.min = "0", t.max = 50, t.setAttribute("value", t.max / (b + 1) * d), t.setAttribute("oninput", "formChanged()"), t.setAttribute("id", "middleLocation" + d), t.style.cssText = "width:100%; float: left; margin-right: 10px", document.getElementById("controller").appendChild(t);
    document.getElementById("top").setAttribute("value", document.getElementById("gen").value == "Random" ? `#${Math.floor(Math.random()*16777215).toString(16)}` : presets[document.getElementById("gen").value][0])
    document.getElementById("bottom").setAttribute("value", document.getElementById("gen").value == "Random" ? `#${Math.floor(Math.random()*16777215).toString(16)}` : presets[document.getElementById("gen").value][1])
    if(document.getElementById("gen").value == "Random") document.getElementById("reload").style.display = "inline"; else document.getElementById("reload").style.display = "none";
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
    let a = hexToRgb(document.getElementsByName("topColour")[0].value)
    let b = hexToRgb(document.getElementsByName("middlecolour")[0].value)
    let c = hexToRgb(document.getElementsByName("bottomColour")[0].value)
    let d = document.getElementById("middleLocation").value
    let e = colourCount - d + 1
    let rgbList = [
      [],
      [],
      [],
    ];
    for (let l = 0; l < 3; l += 1)
      for (let i = a[l], j = 0; i <= b[l], j < d; i += (b[l] - a[l]) / d, j += 1) rgbList[l].push(i);
    for (let l = 0; l < 3; l += 1)
      for (let i = b[l], j = 0; i >= c[l], j < e; i -= (b[l] - c[l]) / e, j += 1) rgbList[l].push(i);
    return `#${[rgbList[0][Math.round(n*10)],rgbList[1][Math.round(n*10)],rgbList[2][Math.round(n*10)]].map(n=>Math.round(n).toString(16).padStart(2,0)).join("")}`
  };
  let colourCount = document.getElementById("colourCount").value * 10
  document.getElementById("middleInt").innerHTML = document.getElementById("middleLocation").value / 10
  document.getElementById("colourCountInt").innerHTML = colourCount / 10
  document.getElementById("middleLocation").max = colourCount;
  for (let l = 0; l <= colourCount; l += 1) {
    const para = document.createElement("div");
    para.appendChild(document.createTextNode(l / 10));
    para.setAttribute("id", "colour" + l);
    document.getElementById("colourMap").appendChild(para);
    document.getElementById("colour" + l).style.cssText = `background-color: ${getColour(l / 10)}; margin: 0; height: ${5/(colourCount/100)}px; font-size: ${5/(colourCount/100)}px; color: white`;
  }
}
