import React, { useEffect, useState, useRef } from 'react'
import { useVehicles, getVehicle } from '../context/VehicleState'
import { BrowserView, MobileView } from 'react-device-detect';

import Alert from '../layout/Alert'
import '../layout/css/vehicle.css'
import Spinner from '../layout/Spinner'

const Vehicles = ({ workshop },) => {
  const [vehicleState, vehicleDispatch] = useVehicles()
  const { plateNo, error, loading } = vehicleState

  const [state, setInput] = useState({ regNo: '' })
  const { regNo } = state

  const topRef = useRef(null)

  useEffect(() => {
    if (plateNo)
      setInput({ regNo: plateNo })
  }, [plateNo])

  // useEffect(() => {
  //   topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  // }, [])

  const onChange = (e) => setInput({ ...state, [e.target.name]: e.target.value.toUpperCase() })

  return (
    <div ref={topRef} className="w1">
      <h2 className="title">Bestill time på 1-2-3</h2>

      {error && <Alert type="error" message={error} />}
      {loading && <Spinner />}

      <div>
        <label className='input-label'>Reg. nr.</label>
        <input type="text" maxLength={7} name="regNo" value={regNo} onChange={onChange} />
      </div>

      <BrowserView>
        <div className='flex flex-row'>
          <span className="contactinfo">
            Kontakt oss på tlf.{' '}
            <a className='text-blue-600 hover:underline' href={`tel:${workshop?.phone}`}>
              {workshop?.phone}
            </a>{' '}
            eller{' '}
            <a className='text-blue-600 hover:underline' href={`mailto:${workshop?.email}`}>
              {workshop?.email}
            </a>{' '}
            eller fyll inn bilens regnr for å starte booking.
          </span>
          <div className="">
            <input className='green-button ml-20'
              type="button"
              value="NESTE"
              onClick={() => {
                getVehicle(vehicleDispatch, regNo)
              }}
              disabled={regNo?.length === 0}
            />
          </div>
        </div>
      </BrowserView>

      <MobileView>
        <div className='grid grid-rows-2 flex-row place-items-center'>
          <span className="contactinfo text-center">
            Kontakt oss på tlf.{' '}
            <a className='text-blue-600 hover:underline' href={`tel:${workshop?.phone}`}>
              {workshop?.phone}
            </a>{' '}
            eller{' '}
            <a className='text-blue-600 hover:underline' href={`mailto:${workshop?.email}`}>
              {workshop?.email}
            </a>{' '}
            eller fyll inn bilens regnr for å starte booking.
          </span>
          <div className="">
            <input className='green-button ml-20'
              type="button"
              value="NESTE"
              onClick={() => {
                getVehicle(vehicleDispatch, regNo)
              }}
              disabled={regNo?.length === 0}
            />
          </div>
        </div>
      </MobileView>

    </div>
  )
}

export default Vehicles
