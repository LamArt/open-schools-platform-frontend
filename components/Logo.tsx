import React from 'react'
import Link from 'next/link'
import logoPic from '../assets/common/pictures/Schools.ai.svg'
import logoPicMin from '../assets/common/pictures/Schools.ai.min.svg'
import Image from 'next/image'

const Logo = ({ min = false }) => {
  return (
    <Link href="/">
      <a>
        {min ? (
          <Image width="40px" height="40px" src={logoPicMin.src} alt="logo" />
        ) : (
          <Image width="300px" height="100px" src={logoPic.src} alt="logo" />
        )}
      </a>
    </Link>
  )
}

export default Logo
