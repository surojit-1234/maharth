import React, {useState} from "react"
const TruncateText = ({ text, maxLength = 4 }) => {
  const [expanded, setExpanded] = useState(false)

  if (text === undefined || text === null) return null

  const safeText = text.toString()

  const toggle = () => setExpanded((prev) => !prev)

  if (safeText.length <= maxLength) {
    return <span>{safeText}</span>
  }

  return (
    <span
      onClick={toggle}
      title={safeText}
      style={{ cursor: 'pointer', color: '#0d6efd' }}
    >
      {expanded ? safeText : `${safeText.slice(0, maxLength)}...`}
    </span>
  )
}

export default TruncateText;