
import React from 'react'
import {Button} from 'primereact/button'
import './Navbar.css'

// const properties = [
//   { name: 'Bungalows', code: 'B' },
//   { name: 'Appartments', code: 'A' },
//   { name: 'Condos', code: 'C' }
// ];

// const resources = [
//   { name: 'Future Plans', code: 'FP' },
//   { name: 'Legalese', code: 'L' }
// ];
 
export default function Navbar() {
  return (
    <div className="flex flex-row justify-content-between align-items-center lg:py-4 py-3 lg:px-6 px-3">
      <div className='flex flex-row xl:gap-7 lg:gap-6 gap-4 align-items-center'>
        <span style={{'color':'var(--indigo-900'}} className='flex text-xl font-bold flex-row gap-2 align-items-center'>
          <img height={28} alt='logo' src={require('../assets/logo.png')}></img>
          Estatery
        </span>
        <nav className='md:flex hidden flex-row xl:gap-4 lg:gap-3 gap-1'>
          <Button label='Rent' className='text-sm menu-button-selected menu-button p-button-text' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Buy' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Sell' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Manage properties &#8595;' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Resources &#8595;' />
        </nav>
      </div>
      <div className='flex flex-row gap-3'>
        <Button label='Login' className='text-sm p-button-outlined auth-buttons' />
        <Button label='Sign Up' className='text-sm auth-buttons' />
      </div>
    </div>
  )
}
