import React from 'react'
import {Card} from 'primereact/card'
import './PropertyCard.css'

export default function PropertyCard({img = 'house1', price=1800, name="Green Heritage", address = '123 St, Middle of Nowhere, New York', beds = 2, bathrooms = 2,area = {x:5,y:7}, popular = true}) {

  const header = (
    <div className='relative overflow-hidden border-round-top-md'>
    <img width={320} alt="Card" src={require(`../assets/${img}.png`)} onError={(e) => e.target.src=require('../assets/bed.png')} />
    </div>
  );

  const footer = (
    <div className='card-footer flex flex-row justify-content-between align-items-center'>
      <span className='flex flex-row sm:gap-2 gap-1 align-items-center'>
        <img height={23} src={require('../assets/bed.png')} alt='bed'></img>
        <p className='text-xs'>{beds} Beds</p>
      </span>
      <span className='flex flex-row sm:gap-2 gap-1 align-items-center'>
        <img height={21} src={require('../assets/bathtub.png')} alt='bed'></img>
        <p className='text-xs'>{bathrooms} Bathrooms</p>
      </span>
      <span className='flex flex-row sm:gap-2 gap-1 align-items-center'>
        <img height={21} src={require('../assets/area.png')} alt='bed'></img>
        <p className='text-xs'>{area.x}x{area.y} m<sup>2</sup></p>
      </span>
    </div>
  )

  const hover = (heart) => {
    console.log("hover")
    heart.height = 26.5
    heart.style.marginTop = '0.10rem'
    heart.style.marginRight = '0.65rem'
    heart.src = require('../assets/heart-full.png')
  }
  const remove = (heart) => {
    heart.height = 22
    heart.style.marginTop = '0.19rem'
    heart.style.marginRight = '0.78rem'
    heart.src = require('../assets/heart.png')
  }

  return (
    <Card className='relative' footer={footer} header={header}>
      <span className='relative text-xs flex align-items-center'>
        {popular ?
        <span className='popular flex flex-row align-items-center absolute bottom-50 left-0 text-xs p-2 px-3 gap-2 font-semibold'><img height={12} alt='sparkled' src={require('../assets/sparkles.png')}></img>POPULAR</span>
        :null}
        <img height={65} alt='circle' className='absolute top-0 right-0' style={{'marginTop':'-1.2rem', 'marginRight':'-0.5rem'}} src={require('../assets/circle.png')}></img>
        <img onMouseEnter={(e) => hover(e.currentTarget)} onMouseLeave={(e) => remove(e.currentTarget)} height={22} alt='circle' className='absolute top-0 right-0' style={{'marginTop':'0.19rem','marginRight':'0.78rem'}} src={require('../assets/heart.png')}></img>
        <p className='text-2xl font-bold indigo'>${price}</p>
        <p className='mt-1'>/month</p>
      </span>
      <h2 style={{'color':'black'}} className='mt-2 text-2xl'>{name}</h2>
      <p className='mt-3 grey text-sm'>{address}</p>
    </Card>
  )
}
