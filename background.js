const MIN_INTERVAL = 30 * 1000

function getRandomWord(callback) {
  try {
    chrome.storage?.sync?.get(['vocabWords', 'balloonEnabled'], function (result) {
      if (result.balloonEnabled !== undefined && !result.balloonEnabled) {
        return
      }

      const words = result.vocabWords || [] // Kiểm tra nếu không có từ nào đã lưu
      if (words.length > 0) {
        const randomIndex = Math.floor(Math.random() * words.length) // Chọn từ ngẫu nhiên
        callback(words[randomIndex]) // Truyền từ ngẫu nhiên cho callback
      } else {
        callback(null) // Nếu không có từ nào, callback sẽ là null
      }
    })
  } catch (e) {
    callback(null)
  }
}

function sendMessageToActiveTab() {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let activeTab = tabs[0]
    console.log('activeTab', activeTab)
    if (activeTab) {
      getRandomWord((w) => {
        console.log('w', w)
        chrome.tabs.sendMessage(activeTab.id, { type: 'randomWord', word: w })
      })
    }
  })
}
console.log("BẮT ĐẦU BACKGROUND")
setInterval(sendMessageToActiveTab, MIN_INTERVAL)
