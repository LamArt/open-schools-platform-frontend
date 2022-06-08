import React, { useState, useEffect } from 'react'

const Timer: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [time, setTime] = useState(60)
  const calcTime = (time: number) => {
    let timeStr = time.toString()
    if (time <= 0) {
      return `00:00`
    }
    switch (timeStr.length) {
      case 1:
        return time <= 0 ? '00:00' : `00:0${timeStr}`
      case 2:
        return time < 60 ? `00:${timeStr}` : `01:00`
      default:
        return `00:00`
    }
  }
  useEffect(() => {
    const tick = () => {
      setTime((el) => --el)
      if (time >= 0) {
        setTimeout(tick, 1000)
      } else onFinish()
    }
    setTimeout(tick, 1000)
  }, [time])

  return <>{calcTime(time)}</>
}

export default Timer
