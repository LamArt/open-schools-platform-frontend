//сделать шаблон 

import type { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import LayoutAuth from '../components/LayoutAuth'
import ResetPassword from '../components/AuthForms/ResetPassword'

const Reset: NextPage = () => {
  return (
      <>
          <LayoutAuth>
              <ResetPassword />
          </LayoutAuth>
      </>
  )
}

export default Reset
