import React from 'react'

import background from '../layout/assets/images/bg-header.png'
import flag from '../layout/assets/images/no-flag.png'

const VehicleInfo = ({ vehicle }) => {
  return (
    <div className="flex flex-row w-full h-12 space-x-20 items-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex flex-row bg-white rounded-lg w-60 h-8 p-[1px] ml-4">
        <div className='flex row items-center rounded-l-lg' style={{ backgroundColor: '#1A51A0' }}>
          <img alt="flag" className='px-2 ' src={flag} />
        </div>
        <div className='w-full text-center pt-[4px] default-text'>{vehicle?.kjennemerke}</div>
      </div>
      <div className='grid w-full p-4 grid place-items-end'>
        <div className="bg-white w-full text-center rounded-lg w-60 h-8 pt-[4px] default-text">
          {`${vehicle?.merkeNavn} ${vehicle?.modellbetegnelse} ${vehicle?.regAAr}`}
        </div>
      </div>
    </div>
  )
}

export default VehicleInfo
