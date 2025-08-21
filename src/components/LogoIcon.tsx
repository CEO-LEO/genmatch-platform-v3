import React from 'react'

interface LogoIconProps {
  className?: string
}

const LogoIcon: React.FC<LogoIconProps> = ({ className = '' }) => {
  return (
    <div className={className}>
      {/* Logo removed */}
    </div>
  )
}

export default LogoIcon
