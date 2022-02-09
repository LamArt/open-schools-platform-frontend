import React from 'react'

export type typeFormAuth = 'auth' | 'registration'

const FormWraper: React.FC<{ type: typeFormAuth }> = ({
  children,
  type = 'auth',
}) => {
  let styleFigure = {
    position: 'absolute',
    bottom: '0px',
    top: '0px',
    right: '0px',
    left: '0px',
    background: '#F0F2F5',
    borderRadius: '20px',
    transform: 'rotate(-9deg) scale(1.3,1.7)  ',
    zIndex: 0,
  }
  if (type === 'registration') {
    styleFigure = { ...styleFigure, minWidth: '430px' }
  }

  return (
    <section style={{ position: 'relative' }}>
      <figure style={styleFigure}></figure>
      {children}
    </section>
  )
}

export default FormWraper
