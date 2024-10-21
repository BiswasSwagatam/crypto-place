import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext'

const Coin = () => {

  const {id} = useParams()
  const {currency} = useContext(CoinContext)
  const [coinData, setCoinData] = useState({})
  // const [loading, setLoading] = useState(true)

  const getCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-wT67BVWqbz2q8UbgsTHoqKzT'}
    };
    
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
    const data = await response.json()
    setCoinData(data)
    
    
  }

  useEffect(() => {
    getCoinData()
  }, [currency])

  
    return (
      <div>
        <div className='flex flex-col items-center mt-10 gap-5'>
          <img  src={coinData.image.large} /> 
          <p className='text-4xl font-bold'>{coinData.name} ({coinData.symbol})</p>
        </div>
      </div>
  )

  
}

export default Coin