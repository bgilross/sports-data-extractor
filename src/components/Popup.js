import React, { useState, useEffect } from 'react'

const Popup = () => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    // Fetch saved data from Chrome's local storage
    chrome.storage.local.get({ sportsEntries: [] }, (result) => {
      setEntries(result.sportsEntries)
    })
  }, [])

  const exportToCSV = () => {
    if (entries.length === 0) return

    let csvContent = 'data:text/csv;charset=utf-8,Sentence,URL\n'
    entries.forEach((entry) => {
      const row = `${entry.sentence.replace(/,/g, '')},${entry.url}\n`
      csvContent += row
    })

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', 'sports_data.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div>
      <h1>Collected Sports Data</h1>
      <table>
        <thead>
          <tr>
            <th>Snip</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{entry.sentence}</td>
              <td>
                <a href={entry.url} target="_blank" rel="noopener noreferrer">
                  {entry.url}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={exportToCSV}>Export to CSV</button>
    </div>
  )
}

export default Popup
