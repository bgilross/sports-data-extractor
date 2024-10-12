// Function to get highlighted text and send it to the background script
function handleHighlight() {
  const selection = window.getSelection()
  const selectedText = selection.toString().trim()

  if (selectedText) {
    const highlight = {
      text: selectedText,
      page: document.title, // Use the page title instead of the full URL
      domain: window.location.hostname, // Optionally store the domain for clarity
      path: window.location.pathname, // Optionally store the path for reference
      timestamp: new Date().toISOString(),
    }

    chrome.runtime.sendMessage(
      { action: 'saveHighlight', highlight },
      (response) => {
        if (response.status === 'saved') {
          console.log('Highlight saved!')
        }
      }
    )
  }
}

// Attach double-click listener to highlight text
document.addEventListener('dblclick', handleHighlight)
