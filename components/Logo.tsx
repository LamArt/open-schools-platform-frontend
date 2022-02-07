import React from 'react'
import Link from 'next/link'

const Logo = ({ size = 'sm', type = 'max' }) => {
  function _addSize() {
    if (size === 'sm') {
      return (
        <style jsx>
          {`
            .logo__main-text {
              font-size: 2rem;
            }
            .logo__small-text {
              font-size: 1.5rem;
            }
          `}
        </style>
      )
    } else {
      return (
        <style jsx>
          {`
            .logo__main-text {
              font-size: 3rem;
            }
            .logo__small-text {
              font-size: 1.7rem;
            }
          `}
        </style>
      )
    }
  }

  return (
    <Link href="/">
      <a className="logo__link">
        <span className="logo__main-text">
          {type !== 'min' ? 'IDesk' : 'ID'}
        </span>
        {_addSize()}
        <style jsx>{`
          .logo__link {
            min-width: 300px;
            color: black;
            white-space: nowrap;
          }
          .logo__link > * {
            display: inline-block;
          }
          .logo__main-text {
            font-weight: bold;
          }
          @media screen and (max-width: 300px) {
            .logo__link {
              width: 100%;
            }
          }
        `}</style>
      </a>
    </Link>
  )
}

export default Logo
