// background.js

chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: 'saveHighlight',
    title: 'Save Highlight',
    contexts: ['selection'],
  })
})

// Listener for context menu click
chrome.contextMenus.onClicked.addListener((info) => {
  if (info.menuItemId === 'saveHighlight') {
    const highlight = {
      text: info.selectionText,
      page: info.pageUrl,
      timestamp: new Date().toISOString(),
    }

    chrome.storage.local.get({ highlights: [] }, (result) => {
      const highlights = result.highlights
      highlights.push(highlight)
      chrome.storage.local.set({ highlights })
      console.log('Highlight saved:', highlight)
    })
  }
})
