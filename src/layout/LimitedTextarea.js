import React, { useState, useCallback } from 'react'

const LimitedTextarea = ({ rows, cols, value, limit, action, args, labelArgs }) => {
  const [content, setContent] = useState(value.slice(0, limit))

  const setFormattedContent = useCallback(
    (text) => {
      setContent(text.slice(0, limit))
    },
    [limit, setContent]
  )

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        {...args}
        onChange={(event) => {
          setFormattedContent(event.target.value)
          action(event)
        }}
        value={content}
      />
      <br />
      <p className="length-counter" style={labelArgs}>
        {content.length}/{limit}
      </p>
    </>
  )
}

export default LimitedTextarea
