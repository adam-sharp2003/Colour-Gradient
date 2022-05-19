var a, c;

function formChanged() {
  document.getElementById("colourMap").innerHTML = '';
  const getColor = (n) => {
    function hexToRgb(hex) {
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    }
    var a = hexToRgb(document.getElementsByName("firstcolour")[0].value) //lower colour (i.e Orange)
    var c = hexToRgb(document.getElementsByName("secondcolour")[0].value) //higher colour (i.e Blue)
    var rgbList = [
      [],
      [],
      [],
      [a.r, a.g, a.b],
      [c.r, c.g, c.b]
    ];
    for (let l = 0; l < 3; l += 1)
      for (let i = rgbList[3][l], j = 0; i <= 255, j < 50; i += (255 - rgbList[3][l]) / 50, j += 1) rgbList[l].push(i);
    for (let l = 0; l < 3; l += 1)
      for (let i = 255, j = 0; i >= rgbList[4][l], j < 51; i -= (255 - rgbList[4][l]) / 51, j += 1) rgbList[l].push(i);
    return `#${[rgbList[0][Math.round(n*10)],rgbList[1][Math.round(n*10)],rgbList[2][Math.round(n*10)]].map(n=>Math.round(n).toString(16).padStart(2,0)).join("")}`
  };

  var textBoxes = []
  for (let l = 0; l <= 100; l += 1) {
    const para = document.createElement("div");
    const node = document.createTextNode(l / 10);
    const element = document.getElementById("colourMap");
    para.appendChild(node);
    para.setAttribute("id", "colour" + l);
    element.appendChild(para);
    textBoxes.push("colour" + l)
    document.getElementById(textBoxes[l]).style.backgroundColor = getColor(l / 10);
    document.getElementById(textBoxes[l]).style.margin = 0;
    document.getElementById(textBoxes[l]).style.fontSize = "7px";

  }
}
