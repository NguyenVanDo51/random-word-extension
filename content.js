const words = [
  { word: 'elucidate', meaning: 'make something clear; explain' },
  { word: 'cogent', meaning: 'clear, logical, and convincing' },
  { word: 'efficacy', meaning: 'the ability to produce a desired or intended result' },
]

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

function createBalloon(wordObj) {
  // Tạo thẻ div cho bóng bay
  const balloon = document.createElement('div');
  balloon.className = 'vocab-balloon';

  // Thêm nội dung từ vựng vào bóng bay
  balloon.innerHTML = `
    <div class="balloon-content">
      <strong>${wordObj.word}</strong>: ${wordObj.meaning}
    </div>
    <div class="balloon-tail"></div>
  `;

  // Tạo vị trí ngẫu nhiên theo chiều ngang màn hình
  const randomLeft = Math.random() * (window.innerWidth - 100); // Trừ đi 100 để không ra ngoài màn hình
  balloon.style.left = `${randomLeft}px`;

  // Thêm bóng bay vào trang
  document.body.appendChild(balloon);

  // Bóng bay từ dưới lên trên rồi biến mất
  setTimeout(() => {
    balloon.style.bottom = `${window.innerHeight}px`;  // Bóng bay lên trên
  }, 100);  // Bắt đầu di chuyển sau 0.1 giây

  // Xóa bóng bay sau khi hoàn thành hiệu ứng
  setTimeout(() => {
    balloon.remove();
  }, 10000); // Bóng bay tồn tại trong 10 giây
}

function startVocabularyBalloons() {
  const randomWord = getRandomWord()
  createBalloon(randomWord)

  setInterval(() => {
    const randomWord = getRandomWord()
    createBalloon(randomWord)
  }, Math.random() * (30000 - 15000) + 15000) // Ngẫu nhiên từ 15-30 giây
}

startVocabularyBalloons()

// Khởi động khi trang web tải
// window.addEventListener('load', startVocabularyBalloons)
