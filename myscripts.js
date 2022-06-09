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
    let b = 1
    for (let l = 1; l <= 2 + b; l += 1) a.push(hexToRgb(document.getElementsByName("colour" + l)[0].value))
    let d = document.getElementById("middleLocation").value
    let e = colourCount - d + 1
    let rgbList = [
      [],
      [],
      [],
    ];
    for (let k = 1; k <= b; k += 1) {
      for (let l = 0; l < 3; l += 1)
        for (let i = a[0][l], j = 0; i <= a[1][l], j < d; i += (a[1][l] - a[0][l]) / d, j += 1) rgbList[l].push(i);
      for (let l = 0; l < 3; l += 1)
        for (let i = a[1][l], j = 0; i >= a[2][l], j < e; i -= (a[1][l] - a[2][l]) / e, j += 1) rgbList[l].push(i);
    }
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
