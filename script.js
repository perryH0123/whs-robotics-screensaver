const main = document.querySelector('main')
const logo = document.querySelector('#logo')
main.style.height = window.innerHeight+"px";
main.style.width = window.innerWidth+"px";
const FPS = 60;
const qrCode = document.querySelector("#code")
const clock = document.querySelector("#clock")
const time = clock.querySelector("h1")
const date = clock.querySelector("h2")

let xPos = 50
let yPos = 50
let xVel = 3
let yVel = 3


const tick = () => {
    if(xPos + logo.clientWidth >= window.innerWidth || xPos <= 0 || 
        ((logo.bottom >= qrCode.top && logo.top <= qrCode.bottom) && ((logo.centerX <= qrCode.centerX && logo.right >= qrCode.left && xVel > 0) || (logo.centerX >= qrCode.centerX && logo.left <= qrCode.right && xVel <= 0)))){
        xVel *= -1
        randomHue()
    }
    if(yPos + logo.clientHeight >= window.innerHeight || yPos <= 0 ||
        ((logo.right >= qrCode.left && logo.left <= qrCode.right) && ((logo.centerY <= qrCode.centerY && logo.bottom >= qrCode.top && yVel > 0) || (logo.centerY >= qrCode.centerY && logo.top <= qrCode.bottom && yVel <= 0)))){
        yVel *= -1
        randomHue()
    }
    logo.style.left = xPos + "px"
    logo.style.top = yPos + "px"
    attachPositionHelpers(logo)
    //console.log((yPos >= qrCode.offsetTop && yPos <= qrCode.offsetTop + qrCode.clientHeight))
}

const attachPositionHelpers = node => {
    const{left, right, top, bottom} = node.getBoundingClientRect();
    node.left = left
    node.top = top
    node.right = right
    node.bottom = bottom
    node.centerX = (node.left + node.right)/2
    node.centerY = (node.top + node.bottom)/2
}

const attachAllPositionHelpers = () => {
    attachPositionHelpers(logo)
    attachPositionHelpers(qrCode)
}

console.log(setInterval(()=>{
    xPos += xVel
    yPos += yVel
    tick()
},1000/FPS))

const randomHue = () => {
    logo.style.filter = `hue-rotate(${Math.floor(Math.random()*361)}deg)`
}
const randomPosition = () => {
    xPos = Math.floor(Math.random() * (window.innerWidth-logo.clientWidth))
    yPos = Math.floor(Math.random() * (window.innerHeight-logo.clientHeight))
}

onresize = () => {
    console.log("resize")
    //randomPosition()
    attachAllPositionHelpers()
    main.style.height = window.innerHeight+"px";
    main.style.width = window.innerWidth+"px";  
}

(function(){
    attachAllPositionHelpers()
    //randomPosition()
    tick()
})()

const refreshDate = () => {
    let now = new Date()
    now.toLocaleDateString()
    time.innerText = now.toLocaleTimeString("en-us",{hour: "2-digit", minute: "2-digit"})
    date.innerText = now.toLocaleDateString("en-us", {weekday: "long", month: "long", day: "numeric"})
}
refreshDate()

setInterval(refreshDate,60000)
