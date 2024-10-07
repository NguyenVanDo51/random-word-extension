const words = [
  { word: "elucidate", meaning: "make something clear; explain" },
  { word: "cogent", meaning: "clear, logical, and convincing" },
  { word: "efficacy", meaning: "the ability to produce a desired or intended result" },
];

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}


function createNotification(wordObj) {
  console.clear()
  console.log('wordObj', wordObj)
  // Tạo một thẻ div cho thông báo
  const notification = document.createElement('div');
  notification.className = 'vocab-notification';
  notification.innerHTML = `
    <strong>${wordObj.word}</strong>: ${wordObj.meaning}
  `;

  // Thêm thông báo vào trang
  document.body.appendChild(notification);

  // Sau 10 giây, ẩn thông báo
  setTimeout(() => {
    notification.remove();
  }, 10000);
}

function startVocabularyNotifications() {
  setInterval(() => {
    const randomWord = getRandomWord();
    console.log('randomWord', randomWord)
    createNotification(randomWord);
  }, Math.random() * (30000 - 15000) + 15000); // Ngẫu nhiên 15-30 giây
}
console.log('startVocabularyNotifications')

startVocabularyNotifications()

// Khởi động khi trang web tải
window.addEventListener('load', startVocabularyNotifications);
