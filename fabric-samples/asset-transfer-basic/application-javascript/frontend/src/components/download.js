import React, { useState } from 'react'

function FileDownload({ fileId }) {
  const [fileUrl, setFileUrl] = useState(null)

  const handleDownload = async (event) => {
    event.preventDefault()

    try {
      const response = await fetch(`/api/download/${fileId}`)
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`)
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setFileUrl(url)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
      {fileUrl && (
        <a href={fileUrl} download>
          Click here to download the file
        </a>
      )}
    </div>
  )
}

export default FileDownload
