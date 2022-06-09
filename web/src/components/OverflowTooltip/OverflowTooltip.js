import * as React from 'react'
import { Tooltip } from '@mui/material'

const OverflowTip = ({ children }) => {
  const [isOverflowed, setIsOverflow] = React.useState(false)
  const textElementRef = React.useRef()
  React.useEffect(() => {
    setIsOverflow(textElementRef.current.scrollWidth > textElementRef.current.clientWidth)
  }, [])
  return (
    <Tooltip title={children} disableHoverListener={!isOverflowed}>
      <div
        ref={textElementRef}
        style={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {children}
      </div>
    </Tooltip>
  )
}

export default OverflowTip;