import './PropertyTransferListing.css'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import PropertyTransferCard from '../../components/PropertyTransfer/PropertyTransferCard'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory, getPropertyTransferContract } from '../../ethereum/propertyContract'

const PropertyTransferListing = () => {
  const [propertyTransfers, setPropertyTransfers] = useState([])

  const provider = getProvider()

  useEffect(() => {
    fetchPropertyTransferContracts().catch(console.error)
  }, [propertyTransfers])

  const payContract = async (contractAddress, amount) => {
    try {
      const address = localStorage.getItem('walletAddress')
      const signer = provider.getSigner(address)
      const propertyTransfer = getPropertyTransferContract(contractAddress, signer)
      await propertyTransfer.signAndPay({ value: ethers.utils.parseEther(amount) })
    } catch (err) {
      console.log(err)
      if (err && err.data && err.data.message) {
        alert(err.data.message.split('revert')[1])
      } else {
        alert('Erro desconhecido')
      }
    }
  }

  const fetchPropertyTransferContracts = async () => {
    if (!propertyTransfers || !propertyTransfers.length) {
      const signer = provider.getSigner()
      const contractFactory = getContractFactory(signer)

      let contractsCount = await contractFactory.getPropertyTransfersCount()
      contractsCount = contractsCount.toNumber()

      for (let index = 0; index < contractsCount; index++) {
        const contractAddress = await contractFactory.getPropertyTransfer(index)
        const propertyTransfer = getPropertyTransferContract(contractAddress, signer)

        const [buyer, doc] = await Promise.all([propertyTransfer.getBuyer(), propertyTransfer.getDoc()])

        const contractData = {
          buyer,
          contractAddress,
          owner: doc.owner,
          url: doc.url,
          name: doc.name,
          description: doc.description,
          price: ethers.utils.formatEther(doc.price),
        }

        setPropertyTransfers([...propertyTransfers, { contractData }])
      }
    }
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
        {propertyTransfers.length ? (
          propertyTransfers.map((x, index) => (
            <div key={index} style={{ boxShadow: '0px 1px 4px #888888', borderRadius: '5px' }}>
              <PropertyTransferCard props={x.contractData} payContract={payContract} />
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default PropertyTransferListing
