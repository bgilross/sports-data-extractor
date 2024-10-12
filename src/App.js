/* global chrome */

import React, { useEffect, useState } from 'react'

function App() {
  const [highlights, setHighlights] = useState([])

  useEffect(() => {
    // Fetch highlights from chrome storage
    chrome.storage.local.get({ highlights: [] }, (result) => {
      setHighlights(result.highlights)
    })
  }, [])

  const handleDeleteHighlight = (index) => {
    const updatedHighlights = highlights.filter((_, i) => i !== index)
    chrome.storage.local.set({ highlights: updatedHighlights }, () => {
      setHighlights(updatedHighlights)
    })
  }

  return (
    <div className="App">
      <h1>Sports Highlights</h1>
      <ul>
        {highlights.length === 0 ? (
          <li>No highlights saved yet.</li>
        ) : (
          highlights.map((highlight, index) => (
            <li key={index}>
              <p>
                <strong>Text:</strong> {highlight.text}
              </p>
              <p>
                <strong>Page:</strong>{' '}
                <a href={highlight.page} target="_blank" rel="noreferrer">
                  {highlight.page}
                </a>
              </p>
              <p>
                <strong>Saved on:</strong>{' '}
                {new Date(highlight.timestamp).toLocaleString()}
              </p>
              <button onClick={() => handleDeleteHighlight(index)}>
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default App
