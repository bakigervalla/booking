import React from "react";
import { useNavigate } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

export const Box = () => {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row w-1/2 space-x-20">
            <div className="box">
                <h4>Bestill time</h4>
                <HashLink className="btn-blue pt-1" smooth to="/#booking">Sjekk og bestill time</HashLink>
            </div>
            <div className="box">
                <h4>Når er neste EU-kontroll?</h4>
                <div className="rounded-full w-full h-12 px-3 border py-1.5">
                    <label className="text-xs">REGNR.</label>
                    <input type="text" className="w-5/12 h-full p-2 focus:outline-0" />
                    <input type="button" className="btn-blue" value="Sjekk og bestill time" />
                </div>
            </div>
        </div>
    )
}

export default Box;