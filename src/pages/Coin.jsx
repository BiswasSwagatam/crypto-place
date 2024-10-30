import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../context/CoinContext'

const Coin = () => {

  const {id} = useParams()
  const {currency} = useContext(CoinContext)
  const [coinData, setCoinData] = useState({})
  const [loading, setLoading] = useState(true)
  const [curr, setCurr] = useState(currency.name)
  // console.log(currency)
  console.log(curr)

  const getCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-wT67BVWqbz2q8UbgsTHoqKzT'}
    };
    
    try {
      setLoading(true)
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`, options)
      const data = await response.json()
      setCoinData(data)
      setLoading(false)
      console.log(data)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    
  }

  useEffect(() => {
    getCoinData()
    setCurr(currency.name)
  }, [currency])

  
    return (
      <div>
        { loading ? <p>Loading...</p> :
          <div className='flex flex-col h-screen items-center mt-10 gap-7 '>
            { coinData?.image &&
              <img  src={coinData?.image.large} className='w-24 mt-10'/> }
            <p className='text-4xl font-bold'>{coinData.name} ({coinData.symbol})</p>
            <div className='w-3/4'>
              <gecko-coin-price-chart-widget coin-id={coinData.name} dark-mode="true" transparent-background="true" locale="en" outlined="true" initial-currency={curr}></gecko-coin-price-chart-widget>
            </div>  
            <div className='flex flex-col gap-5 w-3/4
            bg-gray-800/50 shadow-md p-5 rounded-xl
            '>
              <p className='text-md flex justify-between'><span>Market Cap Rank:</span> <span>{coinData.market_cap_rank}</span></p>
              <p className='text-md flex justify-between'><span>Current Price: </span> <span>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString('en-US')}</span></p>
              <p className='text-md flex justify-between'><span>Market Cap: </span> <span>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString('en-US').slice(0, -6)} M</span></p>
              <p className='text-md flex justify-between'><span>24 Hour High: </span> <span>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString('en-US')}</span></p>
              <p className='text-md flex justify-between'><span>24 Hour Low: </span> <span>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString('en-US')}</span></p>
          </div>
        </div>
        }
      </div>
  )

  
}

export default Coin