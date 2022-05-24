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
    let rgbList = [
      [],
      [],
      [],
    ];
    for (let l = 0; l < 3; l += 1)
      for (let i = a[l], j = 0; i <= b[l], j < d; i += (b[l] - a[l]) / d, j += 1) rgbList[l].push(i);
    for (let l = 0; l < 3; l += 1)
      for (let i = b[l], j = 0; i >= c[l], j < ((colourCount * 10 + 1) - d); i -= (b[l] - c[l]) / ((colourCount * 10 + 1) - d), j += 1) rgbList[l].push(i);
    return `#${[rgbList[0][Math.round(n*10)],rgbList[1][Math.round(n*10)],rgbList[2][Math.round(n*10)]].map(n=>Math.round(n).toString(16).padStart(2,0)).join("")}`
  };

  let colourCount = document.getElementById("colourCount").value
  document.getElementById("middleLocation").max = colourCount * 10;
  for (let l = 0; l <= colourCount * 10; l += 1) {
    const para = document.createElement("div");
    para.appendChild(document.createTextNode(l / 10));
    para.setAttribute("id", "colour" + l);
    document.getElementById("colourMap").appendChild(para);
    document.getElementById("colour" + l).style.cssText = `background-color: ${getColour(l / 10)}; margin: 0; font-size: ${5/(colourCount/10)}px; color: white`;
  }

}
