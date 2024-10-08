;(() => {
  console.clear()
  console.log('========= START ==========')

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'randomWord') {
      console.clear()
      console.log('Received message from background:', request.word)
      createAnimation(request.word)
      console.log('Timestamp:', new Date(request.timestamp))
    }
  })

  function createAnimation(wordObj) {
    if (!wordObj) return // Nếu không có từ, không làm gì

    createBallon(wordObj)
    createCar(wordObj)
  }
})()

const createCar = (wordObj) => {
  // Tạo phần tử ô tô và từ mới
  let car = document.createElement('div')
  let word = document.createElement('div')
  car.classList.add('car')
  word.classList.add('word')
  const extensionId = chrome.runtime.id

  // Thêm nội dung từ mới
  word.innerHTML = `<span>${wordObj.word}</span>${wordObj.meaning}`

  // Thêm phần tử vào body
  document.body.appendChild(car)
  document.body.appendChild(word)

  // Định nghĩa CSS
  const style = document.createElement('style')
  const imageUrl = `chrome-extension://${extensionId}/images/car.gif`

  style.textContent = `
.car {
  width: 200px;
  height: 200px;
  background: url(${imageUrl}) no-repeat center;
  background-size: contain;
  position: fixed;
  bottom: 0px;
  left: -134px;
  z-index: 1000;
}
.word {
  position: fixed;
  bottom: 122px;
  height: 40px;
  color: #ff5252;
  z-index: 1000;
  width: 100px;
  left: -100px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
`
  document.head.appendChild(style)

  gsap.to('.car', {
    duration: 15,
    x: window.innerWidth + 150,
  })

  gsap.to('.word', {
    duration: 15,
    x: window.innerWidth + 150,
    onComplete: () => {
      document.body.removeChild(car)
      document.body.removeChild(word)
    },
  })

  setTimeout(() => {
    document.body.removeChild(car)
    document.body.removeChild(word)
  }, 15000)
}

// createCar({ meaning: "Xin chao", word: "Hello" })

const createBallon = (wordObj) => {
  function random(num) {
    return Math.floor(Math.random() * num)
  }

  function getRandomStyles() {
    var r = random(255)
    var g = random(255)
    var b = random(255)
    var ml = random(window.innerWidth - 105)
    var dur = random(5) + 10

    return `
  background-color: rgba(${r},${g},${b},0.7);
  box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
  margin: 0 0 0 ${ml}px;
  color: rgba(${r},${g},${b},0.7); 
  animation: float ${dur}s ease-in infinite, leftright 4s ease-in-out infinite
  `
  }

  var balloon = document.createElement('div')
  balloon.className = 'balloon'
  balloon.style.cssText = getRandomStyles()

  balloon.innerHTML = `
    <span class="balloon-text">
      <strong>${wordObj.word}</strong>
      ${wordObj.meaning}
    </span>
`
  document.body.appendChild(balloon)

  setTimeout(() => {
    balloon.remove()
  }, 10000)
}
