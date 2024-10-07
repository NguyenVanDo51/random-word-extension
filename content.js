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

  // Thêm nội dung từ mới
  word.textContent = `${wordObj.word} - ${wordObj.meaning}`

  // Thêm phần tử vào body
  document.body.appendChild(car)
  document.body.appendChild(word)

  // Định nghĩa CSS
  const style = document.createElement('style')
  style.textContent = `
.car {
  width: 100px;
  height: 50px;
  background: url('https://cdn-icons-png.flaticon.com/512/2844/2844843.png') no-repeat center;
  background-size: contain;
  position: fixed;
  bottom: 20px;
  left: -150px;
  z-index: 1000;
}
.word {
  position: fixed;
  bottom: 30px;
  left: -150px;
  font-size: 24px;
  font-weight: bold;
  color: red;
  z-index: 1000;
}
`
  document.head.appendChild(style)

  // Animation với GSAP
  gsap.to('.car', {
    duration: 15,
    x: window.innerWidth + 150,
    ease: 'power1.inOut',
  })

  gsap.to('.word', {
    duration: 15,
    x: window.innerWidth + 150,
    ease: 'power1.inOut',
    onComplete: () => {
      document.body.removeChild(car)
      document.body.removeChild(word)
    },
  })
}

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
