
let colors = [[0, 0, 100], [0, 0, 0]]
let colorQuantity = 2

function openSettings(event) {
    document.getElementById('settings').classList.toggle("hidden");
}

function hexToCssHsl(hex, valuesOnly = false) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(result[1], 16);
  var g = parseInt(result[2], 16);
  var b = parseInt(result[3], 16);
  var cssString = '';
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;
  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  
  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);
  
  cssString = h + ',' + s + '%,' + l + '%';
  let hslArr = [h,s,l]
  cssString = !valuesOnly ? 'hsl(' + cssString + ')' : hslArr;
  
  return cssString;
}

/*
function watchColorPicker(event) {
  document.body.style.backgroundColor = `${event.target.value}`;
}
*/

function changeValue(event) {
  let hslValue = hexToCssHsl(event.target.value);
  colors[parseInt(event.target.getAttribute('number'))] = hexToCssHsl(event.target.value, valuesOnly = true);
   document.getElementById(`colorValue${event.target.getAttribute('number')}`).innerHTML = hslValue;
  change()
}

function changeBlur(event) {
    document.getElementById('blurValue').innerHTML = this.value;
    document.body.style.backdropFilter = `blur(${document.getElementById('blurValue').innerHTML}px)`;
    document.body.style.webkitBackdropFilter = `blur(${document.getElementById('blurValue').innerHTML}px)`;

}

function changeAngle(event) {
    document.getElementById('angleValue').innerHTML = event.target.value;
    change()

}

function changeSpeed(event) {
    document.getElementById('speedValue').innerHTML = event.target.value;
    change()

}

function changeSatur(event) {
    document.getElementById('saturValue').innerHTML = event.target.value;
    change()

}

function changeLight(event) {
    document.getElementById('lightValue').innerHTML = event.target.value;
    change()

}

function addColor(event) {
    let p = document.createElement('p')
    p.setAttribute("id", `p${colorQuantity}`)
    p.innerHTML = `<button number="${colorQuantity}" class="deleteBtn">Delete</button>
                   <input number="${colorQuantity}" type="color" id="picker${colorQuantity}" name="head" value="#FF0000" />
                   <span id="colorValue${colorQuantity}"> hsl(2, 100%, 50%)</span>`
    document.getElementById("colorPalette").insertAdjacentElement("beforeend", p)
    p.addEventListener("change", changeValue, false);
    p.querySelector('.deleteBtn').addEventListener("click", deleteColor, false);
    colors.push([2, 100, 50])
    colorQuantity++
    change()
}

function deleteColor(event) {
    const number = parseInt(event.target.getAttribute('number'));
    event.target.parentElement.remove();
    colorQuantity--;
    colors.splice(number, 1);
    let i = 0;
    for (let p of document.getElementById("colorPalette").children) {
        p.querySelector('input').setAttribute("number", i);
        p.querySelector('input').setAttribute("id", `picker${i}`);
        p.querySelector('button').setAttribute("number", i);
        p.querySelector('span').setAttribute("id", `colorValue${i}`);
        p.setAttribute("id", `p${i}`);
        i++;
    }
    change();
}

//document.getElementById('picker1').addEventListener("change", watchColorPicker, false);

document.getElementById('settingsBtn').addEventListener("click", openSettings, false);

document.getElementById('picker0').addEventListener("change", changeValue, false);

document.getElementById('picker1').addEventListener("change", changeValue, false);

document.getElementById('startBtn').addEventListener("click", colorQuantity > 2 ? newStart : start, false);

document.getElementById('stopBtn').addEventListener("click", stop, false);

document.getElementById('blur').addEventListener("input", changeBlur, false);

document.getElementById('angle').addEventListener("input", changeAngle, false);

document.getElementById('speed').addEventListener("input", changeSpeed, false);

document.getElementById('satur').addEventListener("change", changeSatur, false);

document.getElementById('light').addEventListener("change", changeLight, false);

document.getElementById('style').addEventListener("change", change, false);

document.getElementById('addBtn').addEventListener("click", addColor, false);



//document.getElementById('deleteBtn').addEventListener("click", deleteColor, false);

for(let btn of document.getElementsByClassName('deleteBtn')){
    btn.addEventListener("click", deleteColor, false);
}

function start(style = document.getElementById('style').value, 
               angle = parseInt(document.getElementById('angleValue').innerHTML), 
               speed = parseInt(document.getElementById('speedValue').innerHTML),
               satur = parseInt(document.getElementById('saturValue').innerHTML),
               light = parseInt(document.getElementById('lightValue').innerHTML)){
    
    speed = (typeof(speed) !== "number") ? 500 : speed
    angle = (typeof(angle) !== "number") ? 0 : angle
    satur = (typeof(satur) !== "number") ? 100 : satur
    light = (typeof(light) !== "number") ? 50 : light
    style = (typeof(style) !== "string") ? 'linear' : style

    let ended = false;
    
    //let hslString = colors.map(color => `hsl(${color[0]},${color[1]}%,${color[2]}%)`)

    
    if (style == 'linear') {
        if (colors[0][0] == 0 && colors[0][1] == 0 && colors[1][0] == 0 && colors[1][1] == 0) {
            let maxi = i = colors[0][2] < colors[1][2] ? colors[1][2] : colors[0][2]
            let maxz = z = colors[0][2] < colors[1][2] ? colors[0][2] : colors[1][2] 
            timerID = setInterval(function(){
                document.body.style.background = `linear-gradient(${angle}deg, hsl(0,0%,${i}%),hsl(0,0%,${z}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed);
                }, speed);
        }
        else {
            let maxi = i = colors[0][0] < colors[1][0] ? colors[1][0] : colors[0][0]
            let maxz = z = colors[0][0] < colors[1][0] ? colors[0][0] : colors[1][0] 
            timerID = setInterval(function(){
                document.body.style.background = `linear-gradient(${angle}deg, hsl(${i},${satur}%,${light}%),hsl(${z},${satur}%,${light}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed, satur, light);
                }, speed);
        }
    }
    else if (style == 'radial'){
        if (colors[0][0] == 0 && colors[0][1] == 0 && colors[1][0] == 0 && colors[1][1] == 0) {
            let maxi = i = colors[0][2] < colors[1][2] ? colors[1][2] : colors[0][2]
            let maxz = z = colors[0][2] < colors[1][2] ? colors[0][2] : colors[1][2] 
            timerID = setInterval(function(){
                document.body.style.background = `radial-gradient(hsl(0,0%,${i}%), hsl(0,0%,${z}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed);
                }, speed);
        }
        else {
            let maxi = i = colors[0][0] < colors[1][0] ? colors[1][0] : colors[0][0]
            let maxz = z = colors[0][0] < colors[1][0] ? colors[0][0] : colors[1][0] 
            timerID = setInterval(function(){
                document.body.style.background = `radial-gradient(hsl(${i},${satur}%,${light}%), hsl(${z},${satur}%,${light}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed, satur, light);
                }, speed);
        }
    }
    else if (style == 'conic'){
        if (colors[0][0] == 0 && colors[0][1] == 0 && colors[1][0] == 0 && colors[1][1] == 0) {
            let maxi = i = colors[0][2] < colors[1][2] ? colors[1][2] : colors[0][2]
            let maxz = z = colors[0][2] < colors[1][2] ? colors[0][2] : colors[1][2] 
            timerID = setInterval(function(){
                document.body.style.background = `conic-gradient(from ${angle}deg, hsl(0,0%,${i}%), hsl(0,0%,${z}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed);
                }, speed);
        }
        else {
            let maxi = i = colors[0][0] < colors[1][0] ? colors[1][0] : colors[0][0]
            let maxz = z = colors[0][0] < colors[1][0] ? colors[0][0] : colors[1][0] 
            timerID = setInterval(function(){
                document.body.style.background = `conic-gradient(from ${angle}deg, hsl(${i},${satur}%,${light}%), hsl(${z},${satur}%,${light}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed, satur, light);
                }, speed);
        }
    }
    else if (style == 'repeating-linear'){
        if (colors[0][0] == 0 && colors[0][1] == 0 && colors[1][0] == 0 && colors[1][1] == 0) {
            let maxi = i = colors[0][2] < colors[1][2] ? colors[1][2] : colors[0][2]
            let maxz = z = colors[0][2] < colors[1][2] ? colors[0][2] : colors[1][2] 
            timerID = setInterval(function(){
                document.body.style.background = `repeating-linear-gradient(${angle}deg, hsl(0,0%,${i}%), hsl(0,0%,${z}%), hsl(0,0%,${i}%), hsl(0,0%,${z}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed);
                }, speed);
        }
        else {
            let maxi = i = colors[0][0] < colors[1][0] ? colors[1][0] : colors[0][0]
            let maxz = z = colors[0][0] < colors[1][0] ? colors[0][0] : colors[1][0] 
            timerID = setInterval(function(){
                document.body.style.background = `repeating-linear-gradient(${angle}deg, hsl(${i},${satur}%,${light}%), hsl(${z},${satur}%,${light}%), hsl(${i},${satur}%,${light}%), hsl(${z},${satur}%,${light}%)) fixed`
                if (!ended){
                    i--;
                    z++;
                } else {
                    i++;
                    z--;
                    }
                if(i == maxz && z == maxi){
                    ended = true
                    console.log('ended')
                    }
                if(i == maxi && z == maxz){
                    ended = false
                    console.log('ended')
                    }
                        
                    console.log(maxi, maxz, i, z, angle, speed, satur, light);
                }, speed);
        }
    }
    
}

function stop(){
    clearInterval(timerID);
}

function change(){
    stop();
    colorQuantity > 2 ? newStart() : start();
}

function newStart(style = document.getElementById('style').value, 
                    angle = parseInt(document.getElementById('angleValue').innerHTML), 
                    speed = parseInt(document.getElementById('speedValue').innerHTML),
                    satur = parseInt(document.getElementById('saturValue').innerHTML),
                    light = parseInt(document.getElementById('lightValue').innerHTML)) {
    

    speed = (typeof(speed) !== "number") ? 500 : speed
    angle = (typeof(angle) !== "number") ? 0 : angle
    satur = (typeof(satur) !== "number") ? 100 : satur
    light = (typeof(light) !== "number") ? 50 : light
    style = (typeof(style) !== "string") ? 'linear' : style

    let ended = false;
    
    // Создаем массивы для значений i и z
    let values = colors.map(color => color[0]);
    let minValues = [...values];
    let maxValues = colors.map(color => color[0]);

    // Определяем начальные и максимальные значения
    for (let i = 0; i < colors.length; i++) {
        if (i > 0) {
            maxValues[i] = Math.max(maxValues[i], maxValues[i - 1]);
            minValues[i] = Math.min(minValues[i], minValues[i - 1]);
        }
    }

    timerID = setInterval(function() {
        // Создаем строку градиента на основе текущих значений
        let gradientColors = values.map(value => `hsl(${value},${satur}%,${light}%)`).join(', ');
        document.body.style.background = `${style}-gradient(${style === 'conic' ? `from ${angle}deg,` : style === 'radial' ? '' : `${angle}deg,`} ${gradientColors}) fixed`;

        // Обновляем значения для каждого цвета
        for (let i = 0; i < values.length; i++) {
            if (!ended) {
                values[i]--;
            } else {
                values[i]++;
            }
        }

        // Проверяем условия переключения направления
        if (values.every((value, index) => value === minValues[index])) {
            ended = true;
            console.log('ended');
        }
        if (values.every((value, index) => value === maxValues[index])) {
            ended = false;
            console.log('ended');
        }

        console.log(maxValues, minValues, values, satur, light);
    }, speed);
}


start()