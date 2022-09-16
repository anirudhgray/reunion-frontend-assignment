import React, {useEffect, useState} from 'react'
import './Rent.css'
import Layout from '../components/Layout'
import { InputText } from 'primereact/inputtext'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {Calendar} from 'primereact/calendar'
import CustomSkeleton from '../components/CustomSkeleton'
import PropertyCard from '../components/PropertyCard'

export default function Rent() {

  const [search, setSearch] = useState("")
  const [selectedGroupedCity, setSelectedGroupedCity] = useState(null)
  const [selectedPriceRange, setSelectedPriceRange] = useState(null)
  const [selectedPropertyType, setSelectedPropertyType] = useState(null)
  const [moveInDate, setMoveInDate] = useState(null)
  const [rentData, setRentData] = useState([])
  const [loading, setLoading] = useState(false)

  const groupedCities = [
    {
        label: 'Germany', code: 'DE',
        items: [
            { label: 'Berlin', value: 'Berlin' },
            { label: 'Hamburg', value: 'Hamburg' },
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
            { label: 'Osaka', value: 'Osaka' },
            { label: 'Tokyo', value: 'Tokyo' },
            { label: 'Yokohama', value: 'Yokohama' }
        ]
    }
  ];

  const priceRanges = [
    { label: '$500 - $2,500', value: '$500 - $2500' },
    { label: '$2,500 - $5,000', value: '$2500 - $5000' },
    { label: '$5,000 - $10,000', value: '$5000 - $10000' },
    { label: '$10,000 +', value: '$10000 - ' },
  ];

  const propertyTypes = [
    { label: 'Bungalow', value:'Bungalow' },
    { label: 'Apartment', value: 'Apartment' },
    { label: 'Unconventional', value: 'Unconventional'}
  ];
  
  const onGroupedCityChange = (e) => {
    setSelectedGroupedCity(e.value);
  }
  const onPriceRangeChange = (e) => {
    setSelectedPriceRange(e.value)
  }
  const onPropertyTypeChange = (e) => {
    setSelectedPropertyType(e.value)
  }

  useEffect(() => {
    setLoading(true)
    fetch('data.json')
    .then(res => res.json())
    .then(data => {
      setRentData(data)
      setTimeout(() => {
        setLoading(false)
      }, 400);
    })
    .catch(e => console.log(e))
  }, [])

  const fetchSearch = () => {
    setLoading(true)
    fetch('data.json')
    .then(res => res.json())
    .then(data => {
      let result = data
      if (selectedGroupedCity) {
        result = result.filter(data => data.location === selectedGroupedCity)
      }
      if (selectedPriceRange) {
        result = result.filter(data => ((selectedPriceRange.split(' - ')[1] ? data.price < selectedPriceRange.split(' - ')[1].slice(1) : true) && data.price >= selectedPriceRange.split(' - ')[0].slice(1)))
      }
      if (selectedPropertyType) {
        result = result.filter(data => data.propertyType === selectedPropertyType)
      }
      if (moveInDate) {
        result = result.filter(data => (data.freeFrom <= moveInDate))
      }
      if (search) {
        result = result.filter(data => (data.name.toLowerCase().includes(search.toLowerCase())))
      }
      setRentData(result)
      setTimeout(() => {
        setLoading(false)
      }, 400);
    })
    .catch(e => console.log(e))
  }

  return (
    <Layout>
      <div className='flex flex-wrap flex-row justify-content-between gap-4'>
        <h1 className='md:text-4xl sm:text-3xl text-2xl'>Search properties to rent</h1>
        <span className="ml-auto p-input-icon-left">
            <i className="pi pi-search" />
            <InputText onKeyUp={fetchSearch} className='text-sm' value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search with Search Bar" />
        </span>
      </div>
      <div className='flex-wrap mt-5 p-4 px-5 flex flex-row align-items-center justify-content-between bg-white border-round-sm lg:gap-4 gap-3'>
        <div className='flex-grow-1'>
          <p className='grey xl:text-sm text-xs font-medium'>Location</p>
          <Dropdown filter showClear className='mt-2' value={selectedGroupedCity} options={groupedCities} onChange={onGroupedCityChange} optionLabel="label" optionGroupLabel="label" optionGroupChildren="items" placeholder='City'
          />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey xl:text-sm text-xs font-medium'>When</p>
          <Calendar showButtonBar className='mt-2' id="icon" value={moveInDate} onChange={(e) => setMoveInDate(new Date(e.value).getTime()/1000)} showIcon placeholder='Select Move-in Date' />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey xl:text-sm text-xs font-medium'>Price</p>
          <Dropdown showClear className='mt-2' value={selectedPriceRange} options={priceRanges} onChange={onPriceRangeChange} placeholder="Select"
          />
        </div>
        <div className='filter flex-grow-1'>
          <p className='grey xl:text-sm text-xs font-medium'>Property Type</p>
          <Dropdown showClear className='mt-2' value={selectedPropertyType} options={propertyTypes} onChange={onPropertyTypeChange} placeholder="Select"
          />
        </div>
        <div className='ml-auto filter '>
          <Button onClick={fetchSearch} label="Search"></Button>
        </div>
      </div>
      <div className='mt-6 gap-4 property-cards-container'>
        {!loading ? rentData.map((house, id) => {
          return (<PropertyCard key={id} name={house.name} price={house.price} location={house.location} address={house.address} beds={house.beds} bathrooms={house.bathrooms} popular={house.popular} area={house.area} img={house.img} />)
        }):
        [...Array(10)].map((house, id) => {
          return (<CustomSkeleton key={id} />)
        }) 
        }
        {!loading && !rentData.length ? <p className='indigo'>No listings matching your search :(</p> :null}
      </div>
    </Layout>
  )
}
