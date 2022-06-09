import './PropertyTransferListing.css'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import PropertyTransferCard from '../../components/PropertyTransfer/PropertyTransferCard'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory, getPropertyTransferContract } from '../../ethereum/propertyContract'
import { Box } from '@mui/system'

export const PropertyTransferStatus = {
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  COMPLETED: 'COMPLETED',
}

const PropertyTransferListing = () => {
  const [propertyTransfers, setPropertyTransfers] = useState([])

  const provider = getProvider()

  useEffect(() => {
    if (!propertyTransfers || !propertyTransfers.length) {
      fetchPropertyTransferContracts().catch(console.error)
    }
  }, [propertyTransfers])

  const payContract = async (contractAddress, amount) => {
    try {
      const address = localStorage.getItem('walletAddress')
      const signer = provider.getSigner(address)
      const propertyTransfer = getPropertyTransferContract(contractAddress, signer)
      await propertyTransfer.signAndPay({ value: ethers.utils.parseEther(amount) })
      await fetchPropertyTransferContracts()
    } catch (err) {
      if (err && err.data && err.data.message) {
        alert(err.data.message.split('revert')[1])
      } else {
        console.log(err)
        alert('Erro desconhecido')
      }
    }
  }

  const fetchPropertyTransferContracts = async () => {
    const signer = provider.getSigner()
    const contractFactory = getContractFactory(signer)

    let contractsCount = await contractFactory.getPropertyTransfersCount()
    contractsCount = contractsCount.toNumber()

    let contracts = []

    for (let index = 1; index < contractsCount; index++) {
      const contractAddress = await contractFactory.getPropertyTransfer(index)
      const propertyTransfer = getPropertyTransferContract(contractAddress, signer)
      const [buyer, doc] = await Promise.all([propertyTransfer.getBuyer(), propertyTransfer.getDoc()])
      contracts.push({
        buyer,
        contractAddress,
        owner: doc.owner,
        url: doc.url,
        name: doc.name,
        description: doc.description,
        price: ethers.utils.formatEther(doc.price),
        status: doc.owner === buyer ? PropertyTransferStatus.COMPLETED : PropertyTransferStatus.AWAITING_PAYMENT,
      })
    }

    setPropertyTransfers(contracts)
  }

  return (
    <div
      className="property-listing-transfer-page"
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'left',
        height: `calc(100vh - 50px)`,
      }}
    >
      <div>
        <h1>CONTRATOS</h1>
        <Box
          sx={{
            m: 2,
            maxWidth: 400,
            display: 'grid',
            alignItems: 'center',
            gridTemplateColumns: 'repeat(3, 1fr)',
          }}
        >
          {propertyTransfers.length ? (
            propertyTransfers.map((x, index) => <PropertyTransferCard key={index} props={x} payContract={payContract} />)
          ) : (
            <></>
          )}
        </Box>
      </div>
    </div>
  )
}

export default PropertyTransferListing
