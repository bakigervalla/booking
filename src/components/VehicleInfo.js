import React from 'react'

import background from '../layout/assets/images/bg-header.png'
import flag from '../layout/assets/images/no-flag.png'

const VehicleInfo = ({ vehicle }) => {
  return (
    <div className="flex flex-row w-full h-12 items-center"
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div className="flex flex-row w-44 bg-white rounded-lg h-8 p-[1px] ml-4 md:ml-0">
        <div className='flex row pl-1 w-[40px] items-center rounded-l-lg' style={{ backgroundColor: '#1A51A0', width: '60px;' }}>
          <img alt="flag" className='px-1 w-28' src={flag} />
        </div>
        <div className='w-28 text-center pt-[4px] default-text'>{vehicle?.kjennemerke}</div>
      </div>
      <div className='grid w-4/5 p-4 md:p-0 grid place-items-end'>
        <div className="bg-white w-60 md:w-48 px-4 text-center rounded-lg h-8 pt-[4px] default-text">
          {`${vehicle?.merkeNavn} ${vehicle?.modellbetegnelse} ${vehicle?.regAAr}`}
        </div>
      </div>
    </div>
  )
}

export default VehicleInfo
