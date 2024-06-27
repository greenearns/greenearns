import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import UseGetAllProduct from '../../Hooks/UseGetAllProduct'
import LoadingSpinner from '../../components/Loader/LoadingSpinner'
import { formatUnits } from 'ethers';
import Banner from '../../components/Banner';

const MarketplaceDetails = () => {
    const { id } = useParams()
    const allProduct = UseGetAllProduct()
    const [transaction, setTransaction] = useState(null);
    
    useEffect(() => {
        if (allProduct.length > 0) {
            const foundTransaction = allProduct.find(data => String(data?.id) === id);
            setTransaction(foundTransaction);
            console.log("Transaction:", foundTransaction);
        }
    }, [allProduct, id]);

    const convertToWholeNumber = (formattedNumber) => {
        const number = parseFloat(formattedNumber);
        return Math.floor(number);
        };

    const truncateAddress = (address) => {
    if (!address) return '';
    const start = address.slice(0, 20);
    return `${start}...`;
    };



  return (
    <main>
        <Banner />
       { transaction ? ( <div className='w-[100%] mx-auto p-8'>
        <h2 className='lg:text-[28px] md:text-[28px] text-[18px] text-[#0F160F] font-bold mb-2 font-titiliumweb'>Product Details</h2>
       <section className='flex lg:flex-row md:flex-row flex-col justify-between'>
        <div className='lg:w-[45%] md:w-[45%] w-[100%]'>
            <img src={transaction.image} alt=""  className='rounded-lg w-[100%]'/>
            </div>
            <div className='text-[#0F160F] lg:w-[52%] md:w-[52%] w-[100%]'>
            <h3 className='font-bold mt-4 lg:mt-0 md:mt-0 lg:text-[24px] md:text-[24px] text-[20px] capitalise font-titiliumweb'>{transaction.name}</h3>
            <p className='font-titiliumweb mb-4 font-bold text-[#015C28] lg:text-[24px] md:text-[24px] text-[20px]'>{convertToWholeNumber(formatUnits(transaction.price))} $MTR (per unit of measure) </p>
            <p className='flex justify-between my-4'>Quantity available: <span>{Number(transaction.weight)}</span></p>
            <p className='flex justify-between my-4'>Seller's location: <span>{transaction.location}</span></p>
            <p className='flex justify-between my-4'>Seller's wallet address: <span>{truncateAddress(transaction.address)}</span></p>
            <button className='bg-[#015C28] w-[100%] py-2 text-white mb-4'>Edit information</button>
            <button className='bg-white w-[100%] py-2 text-[#015C28] border border-[#015C28] mb-4'>Add Comment</button>
            <p>Kindly drop a comment upon receipt of your products. This is crucial to ensure the seller receives their payment promptly. <a href="#" className='text-[#015C28] font-bold'>Learn More</a></p>
            </div>
            </section></div>) : (<div>
            <LoadingSpinner />
        </div>)} 
      
    </main>
  )
}

export default MarketplaceDetails