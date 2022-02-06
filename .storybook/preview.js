import React from 'react'

export const parameters = {
  controls: { expanded: true },
}
export const decorators = [
  (storyFn) => <div style={{ padding: '16px' }}>{storyFn()}</div>,
]
