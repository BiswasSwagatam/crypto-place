import React, { useContext, useEffect, useState } from 'react'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {

  const {allCoin, currency} = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([])
  const [input, setInput] = useState('')

  const handleInput = (e) => {
    setInput(e.target.value)
    if(e.target.value === '') {
      setDisplayCoin(allCoin)
    }
  }

  const handleSearch = async (e) => {
    e.preventDefault()
    const coin = await allCoin.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
    setDisplayCoin(coin)
  }

  useEffect(() => {
    setDisplayCoin(allCoin)
  }, [allCoin])


  return (
    <div>
      <div className='flex flex-col my-[80px] gap-5 text-center'>
        <p className='text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400'>Largest <br /> Crypto Marketplace</p>
        <p className='p-5 text-sm'>Welcome to the world's largest cryptocurrency marketplace.<br/> Sign up to explore more about cryptos.</p>
        <form onSubmit={handleSearch} className='flex gap-4 justify-center'>
          <input onChange={handleInput} list='coin-list' value={input} type="text" placeholder='Search crypto...' className=' border-2 border-gray-400 rounded-md p-2 text-black' required/>
          <datalist id='coin-list'>
            {allCoin.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>
          <button className='border-2 border-gray-400 rounded-md p-2'>Search</button>
        </form>
      </div>
      <div className='max-w-[800px] mx-auto bg-gray-800 bg-opacity-50 rounded-lg'>
        <div className='grid grid-cols-[0.5fr,2fr,1fr,1fr,1.5fr] p-5  border-b-2'>
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className='text-center'>24H Change</p>
          <p className='text-right'>Market Cap</p>
        </div>
        <div >
          {
            displayCoin.slice(0,10).map((item,index)=>(
              <Link to={`/coin/${item.id}`} key={index} className='grid grid-cols-[0.5fr,2fr,1fr,1fr,1.5fr] p-5 border-b-[1px] border-gray-700 last-of-type:border-0'>
                <p>{item.market_cap_rank}</p>
                <div className='flex gap-5 items-center'>
                  <img src={item.image} className='w-[35px] h-[35px]' />
                  <p>{item.name + " - " + item.symbol}</p>
                </div>
                <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
                <p className={item.price_change_percentage_24h < 0 ? 'text-red-600 text-center' : 'text-green-600 text-center'}>
                  {item.price_change_percentage_24h.toFixed(2)}
                </p>
                <p className='text-right'>{currency.symbol} {item.market_cap.toLocaleString()}</p>
              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Home