document.addEventListener("DOMContentLoaded", function () {
  const vocabInput = document.getElementById("vocabInput");
  const saveButton = document.getElementById("saveButton");
  const statusMessage = document.getElementById("statusMessage");
  const toggleBalloon = document.getElementById("toggleBalloon");

  // Tải danh sách từ vựng đã lưu khi mở popup
  chrome.storage.sync.get(["vocabWords", "balloonEnabled"], function (result) {
    console.log("result.vocabWords", result);
    if (result.vocabWords) {
      const wordsList = result.vocabWords
        .map((wordObj) => `${wordObj.word}: ${wordObj.meaning}`)
        .join("\n");

      vocabInput.value = wordsList;
    }

    // Đặt trạng thái nút bật/tắt
    if (result.balloonEnabled !== undefined) {
      toggleBalloon.checked = result.balloonEnabled;
    }
  });

  // Lưu danh sách từ vựng mới vào storage
  saveButton.addEventListener("click", function () {
    const inputText = vocabInput.value.trim();
    if (inputText) {
      const vocabWords = inputText.split("\n").map((line) => {
        const [word, meaning] = line.split(":");
        return { word: word.trim(), meaning: meaning ? meaning.trim() : "" };
      });

      // Lưu vào Chrome Sync Storage
      chrome.storage.sync.set({ vocabWords: vocabWords }, function () {
        statusMessage.textContent = "Vocabulary saved!";
        setTimeout(() => (statusMessage.textContent = ""), 2000);
      });
    }
  });

  // Lưu trạng thái bật/tắt bóng bay vào storage
  toggleBalloon.addEventListener("change", function () {
    console.log("toggleBalloon.checked", toggleBalloon.checked);
    chrome.storage.sync.set({ balloonEnabled: toggleBalloon.checked });
  });
});
