import React from 'react'

const TitleForm: React.FC<{ title: string; description?: string }> = ({
  title,
  description,
}) => {
  return (
    <>
      <h2
        style={{
          marginBottom: '0',
          fontSize: '1.5em',
        }}
      >
        {title}
      </h2>
      {description ? (
        <span style={{ fontSize: '1em', color: 'rgba(0, 0, 0, 0.5)' }}>
          {description}
        </span>
      ) : (
        ''
      )}
    </>
  )
}

export default TitleForm
