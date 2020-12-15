import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Collapsible = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='collapsible'>
      <div className='parent'>
        {props.title}
        <button className='collapse__button' onClick={() => setIsOpen(!isOpen)}>
          <FontAwesomeIcon className='fa-angle-down' icon={faAngleRight} />
        </button>
      </div>
      {isOpen && <div className='content'>{props.content}</div>}
    </div>
  )
}

export default Collapsible
