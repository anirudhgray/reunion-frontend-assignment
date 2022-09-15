
import React from 'react'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import { Menubar } from 'primereact/menubar';
import './Navbar.css'

const properties = [
  { name: 'Bungalows', code: 'B' },
  { name: 'Appartments', code: 'A' },
  { name: 'Condos', code: 'C' }
];

const resources = [
  { name: 'Future Plans', code: 'FP' },
  { name: 'Legalese', code: 'L' }
];
 
export default function Navbar() {
  return (
    <div className="flex flex-row justify-content-between align-items-center py-4 px-6">
      <div className='flex flex-row gap-7 align-items-center'>
        <img alt='logo'></img>
        <nav className='flex flex-row xl:gap-4 lg:gap-3 md:gap-2 gap-1'>
          <Button label='Rent' className='text-sm menu-button-selected menu-button p-button-text' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Buy' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Sell' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Manage properties' />
          <Button className='text-sm menu-button p-button-text p-button-secondary' label='Resources' />
        </nav>
      </div>
      <div className='flex flex-row gap-3'>
        <Button label='Login' className='text-sm p-button-outlined' />
        <Button label='Sign Up' className='text-sm ' />
      </div>
    </div>
  )
}
