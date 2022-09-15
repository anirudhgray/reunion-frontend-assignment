import React, {useEffect, useState} from 'react'
import './Rent.css'
import Layout from '../components/Layout'
import { InputText } from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {Calendar} from 'primereact/calendar'
import PropertyCard from '../components/PropertyCard'

export default function Rent() {

  const [search, setSearch] = useState("")
  const [selectedGroupedCity, setSelectedGroupedCity] = useState(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [moveInDate, setMoveInDate] = useState(null)
  const [rentData, setRentData] = useState([])

  const groupedCities = [
    {
        label: 'Germany', code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Frankfurt', value: 'Frankfurt' },
            { label: 'Hamburg', value: 'Hamburg' },
            { label: 'Munich', value: 'Munich' }
        ]
    },
    {
        label: 'USA', code: 'US',
        items: [
            { label: 'Chicago', value: 'Chicago' },
            { label: 'Los Angeles', value: 'Los Angeles' },
            { label: 'New York', value: 'New York' },
            { label: 'San Francisco', value: 'San Francisco' }
        ]
    },
    {
        label: 'Japan', code: 'JP',
        items: [
            { label: 'Kyoto', value: 'Kyoto' },
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
        ]
    }
  ];

  const priceRanges = [
    { label: '$500 - $2,500', value: 0 },
    { label: '$2,500 - $5,000', value: 1 },
    { label: '$5,000 - $10,000', value: 2 },
    { label: '$10,000 +', value: 3 },
  ];
  
  const onGroupedCityChange = (e) => {
    setSelectedGroupedCity(e.value);
  }
  const onPriceRangeChange = (e) => {
    setSelectedPriceRange(e.value)
  }

  const fetchData = () => {
    fetch('data.json')
    .then(res => res.json())
    .then(data => {
      setRentData(data)
      console.log(data)
    })
    .catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
  }, [])
  

  return (
    <Layout>
      <div className='flex flex-row justify-content-between'>
        <h1>Search properties to rent</h1>
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className='text-sm' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with Search Bar" />
        </span>
      </div>
      <div className='flex-wrap mt-5 p-4 px-5 flex flex-row align-items-center justify-content-between bg-white border-round-sm gap-4'>
        <div className='flex-grow-1'>
          <p className='grey text-sm font-medium'>Location</p>
          <Dropdown className='mt-2' value={selectedGroupedCity} options={groupedCities} onChange={onGroupedCityChange} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder='Select a city'
          />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey text-sm font-medium'>When</p>
          <Calendar className='mt-2' id="icon" value={moveInDate} onChange={(e) => setMoveInDate(e.value)} showIcon placeholder='Select move-in date' />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey text-sm font-medium'>Price</p>
          <Dropdown className='mt-2' value={selectedPriceRange} options={priceRanges} onChange={onPriceRangeChange} placeholder="Select a price range"
          />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey text-sm font-medium'>Property Type</p>
          <Dropdown className='mt-2' value={selectedPriceRange} options={priceRanges} onChange={onPriceRangeChange} placeholder="Select a property type"
          />
        </div>
        <div className='filter '>
          <Button label="Search"></Button>
        </div>
      </div>
      <div className='mt-6 gap-4 property-cards-container'>
        {rentData.map(house => {
          return (<PropertyCard name={house.name} price={house.price} location={house.location} address={house.address} beds={house.beds} bathrooms={house.bathrooms} popular={house.popular} area={house.area} img={house.img} />)
        })}
      </div>
    </Layout>
  )
}
