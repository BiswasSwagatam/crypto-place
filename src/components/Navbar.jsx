import React, { useContext } from 'react'
import logo from '../assets/logo.png'
import arrow_icon from '../assets/arrow_icon.png'
import { CoinContext } from '../context/CoinContext'
import { Link } from 'react-router-dom'

const Navbar = () => {

  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case 'usd':
        setCurrency({
          name: 'usd',
          symbol: '$'
        })
        break;
      case 'eur':
        setCurrency({
          name: 'eur',
          symbol: '€'
        })
        break;
      case 'inr':
        setCurrency({
          name: 'inr',
          symbol: '₹'
        })
        break;
      default: setCurrency({
        name: 'usd',
        symbol: '$'
      })
      break;
    }
  }

  return (
    <nav className='flex justify-between items-center p-4 border-b-2'>
        <Link to='/'><img src={logo} className='max-w-[120px]' /></Link>
        <ul className='flex gap-4 cursor-pointer '>
            <li className='text-gray-400 hover:text-white'>Home</li>
            <li className='text-gray-400 hover:text-white'>Features</li>
            <li className='text-gray-400 hover:text-white'>Pricing</li>
            <li className='text-gray-400 hover:text-white'>blog</li>
        </ul>
        <div className='flex gap-3 '>
            <select onChange={currencyHandler} className='text-white rounded-lg bg-transparent'>
                <option value="usd" className='bg-gray-500'>USD</option>
                <option value="eur" className='bg-gray-500'>EUR</option>
                <option value="inr" className='bg-gray-500'>INR</option>
            </select>
            <button className='flex items-center text-black bg-white px-3 py-1 rounded-[15px] gap-2'>
                Sign up <img src={arrow_icon} className='max-w-[13px]'/>
            </button>
        </div>
    </nav>
  )
}

export default Navbar