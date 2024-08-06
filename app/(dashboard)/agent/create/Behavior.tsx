import React from 'react'

const Behavior = ({ behavior, setBehavior }) => {
  const behaviors = ["Support Agent", "Sales Representative", "Lead Generation", "Appointment", "Custom"]

  return (
    <div className='w-full flex  flex-wrap '>
      {behaviors.map((b, index) => (
        <button
          key={index}
          onClick={() => setBehavior(b)}
          type='button'
          className={`p-2 rounded-lg text-xl w-full md:w-1/2 lg:w-1/3  `}
        >
            <div className={` flex justify-center items-center rounded h-[200px] ${behavior === b ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-200 text-gray-600'}`}>{b}</div>
          
        </button>
      ))}
    </div>
  )
}

export default Behavior
