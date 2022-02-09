import React from 'react'

const FormWraper: React.FC = ({ children }) => {
  return (
    <section style={{ position: 'relative' }}>
      <figure
        style={{
          position: 'absolute',
          bottom: '0px',
          top: '0px',
          right: '0px',
          left: '0px',
          background: '#F0F2F5',
          borderRadius: '20px',
          transform: 'rotate(-9deg) scale(1.3,1.7)  ',
          zIndex: 0,
        }}
      ></figure>
      {children}
    </section>
  )
}

export default FormWraper
