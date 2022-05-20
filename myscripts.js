function formChanged() {
  document.getElementById("colourMap").innerHTML = '';
  const getColour = (n) => {
    function hexToRgb(hex) {
      let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    let a = hexToRgb(document.getElementsByName("firstcolour")[0].value) //lower colour (i.e Orange)
    let d = hexToRgb(document.getElementsByName("middlecolour")[0].value)
    let c = hexToRgb(document.getElementsByName("secondcolour")[0].value) //higher colour (i.e Blue)
    let slider = document.getElementById("myRange").value
    let rgbList = [
      [],
      [],
      [],
      [a.r, a.g, a.b],
      [c.r, c.g, c.b],
      [d.r, d.g, d.b],
    ];
    for (let l = 0; l < 3; l += 1)
      for (let i = rgbList[3][l], j = 0; i <= rgbList[5][l], j < slider; i += (rgbList[5][l] - rgbList[3][l]) / slider, j += 1) rgbList[l].push(i);
    for (let l = 0; l < 3; l += 1)
      for (let i = rgbList[5][l], j = 0; i >= rgbList[4][l], j < ((colourCount * 10 + 1) - slider); i -= (rgbList[5][l] - rgbList[4][l]) / ((colourCount * 10 + 1) - slider), j += 1) rgbList[l].push(i);
    return `#${[rgbList[0][Math.round(n*10)],rgbList[1][Math.round(n*10)],rgbList[2][Math.round(n*10)]].map(n=>Math.round(n).toString(16).padStart(2,0)).join("")}`
  };

  let textBoxes = []
  let colourCount = document.getElementById("colourCount").value
  document.getElementById("myRange").max = colourCount * 10;
  for (let l = 0; l <= colourCount * 10; l += 1) {
    const para = document.createElement("div");
    const node = document.createTextNode(l / 10);
    const element = document.getElementById("colourMap");
    para.appendChild(node);
    para.setAttribute("id", "colour" + l);
    element.appendChild(para);
    textBoxes.push("colour" + l)
    document.getElementById(textBoxes[l]).style.backgroundColor = getColour(l / 10);
    document.getElementById(textBoxes[l]).style.margin = 0;
    document.getElementById(textBoxes[l]).style.fontSize = `${5/(colourCount/10)}px`;
    document.getElementById(textBoxes[l]).style.color = "white";

  }

}
