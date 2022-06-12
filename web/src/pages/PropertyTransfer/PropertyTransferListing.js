import './PropertyTransferListing.css'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'

import PropertyTransferCard from '../../components/PropertyTransfer/PropertyTransferCard'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory, getPropertyTransferContract } from '../../ethereum/propertyContract'

import { Box } from '@mui/system'
import ToastAlert from '../../components/ToastAlert/ToastAlert'

export const PropertyTransferStatus = {
  AWAITING_PAYMENT: 'AWAITING_PAYMENT',
  COMPLETED: 'COMPLETED',
}

const PropertyTransferListing = () => {
  const provider = getProvider()

  const [propertyTransfers, setPropertyTransfers] = useState([])
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openErrorMessage, setOpenErrorMessage] = useState(false)
  const [errorMessageContent, setErrorMessageContent] = useState('')

  useEffect(() => {
    if (!propertyTransfers.length) {
      fetchPropertyTransferContracts().catch(console.error)
    }
  }, [propertyTransfers])

  const handleCloseToast = (_event, reason) => {
    if (reason === 'clickaway') return
    setOpenSuccessMessage(false)
    setOpenErrorMessage(false)
  }

  const payContract = async (contractAddress, amount) => {
    try {
      const address = sessionStorage.getItem('walletAddress')
      const signer = provider.getSigner(address)
      const propertyTransfer = getPropertyTransferContract(contractAddress, signer)
      await propertyTransfer.signAndPay({ value: ethers.utils.parseEther(amount) })
      setTimeout(async () => {
        await fetchPropertyTransferContracts()
        setOpenSuccessMessage(true)
      }, 3000)
    } catch (err) {
      if (err && err.data && err.data.message) {
        setErrorMessageContent(err.data.message.split('revert')[1])
      } else {
        console.log(err)
        setErrorMessageContent('Erro desconhecido')
      }
      setOpenErrorMessage(true)
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
        <ToastAlert
          openMessage={openSuccessMessage}
          onClose={handleCloseToast}
          content="Contrato de transferência pago e assinado com sucesso!"
          type="success"
        />
        <ToastAlert openMessage={openErrorMessage} onClose={handleCloseToast} content={errorMessageContent} type="error" />
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
