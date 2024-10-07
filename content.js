const MIN_INTERVAL = 15 * 1000;
const MAX_INTERVAL = 20 * 1000

function getRandomWord(callback) {
  chrome.storage?.sync?.get(
    ["vocabWords", "balloonEnabled"],
    function (result) {
      console.log("result", result);
      if (result.balloonEnabled !== undefined && !result.balloonEnabled) {
        return;
      }

      const words = result.vocabWords || []; // Kiểm tra nếu không có từ nào đã lưu
      console.log("words", words);
      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length); // Chọn từ ngẫu nhiên
        callback(words[randomIndex]); // Truyền từ ngẫu nhiên cho callback
      } else {
        callback(null); // Nếu không có từ nào, callback sẽ là null
      }
    }
  );
}



const createBallon = () => {
  function random(num) {
    return Math.floor(Math.random() * num);
  }

  function getRandomStyles() {
    var r = random(255);
    var g = random(255);
    var b = random(255);
    var ml = random(window.innerWidth - 105);
    var dur = random(5) + 10;

    return `
    background-color: rgba(${r},${g},${b},0.7);
    box-shadow: inset -7px -3px 10px rgba(${r - 10},${g - 10},${b - 10},0.7);
    margin: 0 0 0 ${ml}px;
    color: rgba(${r},${g},${b},0.7); 
    animation: float ${dur}s ease-in infinite, leftright 4s ease-in-out infinite
    `;
  }

  var balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.cssText = getRandomStyles();

  balloon.innerHTML = `
      <span class="balloon-text">
        <strong>${wordObj.word}</strong>
        ${wordObj.meaning}
      </span>
  `;
  return balloon;
};

function createAnimation(wordObj) {
  if (!wordObj) return; // Nếu không có từ, không làm gì

  const balloon = createBallon(wordObj);

  document.body.appendChild(balloon);
  setTimeout(() => {
    balloon.remove();
  }, 10000);
}

function startVocabularyBalloons() {
  getRandomWord((randomWord) => {
    createAnimation(randomWord);
  });

  setInterval(() => {
    getRandomWord((randomWord) => {
      createAnimation(randomWord);
    });
  }, Math.random() * (MAX_INTERVAL - MIN_INTERVAL) + MIN_INTERVAL); // Ngẫu nhiên từ 15-30 giây
}

startVocabularyBalloons();

// Khởi động khi trang web tải
// window.addEventListener('load', startVocabularyBalloons)
