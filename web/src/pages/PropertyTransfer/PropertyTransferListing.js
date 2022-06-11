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
      const address = sessionStorage.getItem('walletAddress')
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
    const contracts = []
    const signer = provider.getSigner()
    const contractFactory = getContractFactory(signer)
    const contractsCount = (await contractFactory.getPropertyTransfersCount()).toNumber()

    for (let index = 0; index < contractsCount; index++) {
      const contractAddress = await contractFactory.getPropertyTransfer(index)
      const propertyTransfer = getPropertyTransferContract(contractAddress, signer)
      const [owner, buyer, doc] = await Promise.all([propertyTransfer.getOwner(), propertyTransfer.getBuyer(), propertyTransfer.getDoc()])

      contracts.push({
        buyer,
        owner,
        contractAddress,
        url: doc.url,
        name: doc.name,
        description: doc.description,
        price: ethers.utils.formatEther(doc.price),
        status: owner === buyer ? PropertyTransferStatus.COMPLETED : PropertyTransferStatus.AWAITING_PAYMENT,
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
            margin: 'auto',
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
