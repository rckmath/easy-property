import './CreatePropertyTransfer.css'

import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { ethers } from 'ethers'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory } from '../../ethereum/propertyContract'
import { getWalletList } from '../../ethereum/wallet'

import { Box, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

const CreatePropertyTransfer = () => {
  const [propertyTransfer, setPropertyTransfer] = useState({
    price: '',
    docUrl: '',
    docName: '',
    buyersAddress: '',
    docDescription: '',
  })

  const [loading, setLoading] = useState(false)
  const [loadingAddressList, setLoadingAddressList] = useState(false)
  const [availableAddressList, setAddressAvailableList] = useState([])

  const provider = getProvider()

  useEffect(() => {
    if (!availableAddressList.length) {
      loadAvailableWalletList().catch(console.error)
    }
  }, [])

  // Mocks the own running blockchain addresses just for testing
  const loadAvailableWalletList = async () => {
    setLoadingAddressList(true)
    const loggedWallet = sessionStorage.getItem('walletAddress')
    const wallets = await getWalletList()
    const availableAddresses = []

    wallets.forEach((address) => {
      if (address.toLowerCase() !== loggedWallet) {
        availableAddresses.push({
          value: address,
          label: address,
        })
      }
    })

    setAddressAvailableList(availableAddresses)
    setLoadingAddressList(false)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)

    const ownerAddress = sessionStorage.getItem('walletAddress')
    const signer = provider.getSigner(ownerAddress)
    const contractFactory = getContractFactory(signer)

    try {
      const priceInWei = ethers.utils.parseEther(propertyTransfer.price)
      await contractFactory.createPropertyTransfer(
        priceInWei,
        propertyTransfer.docName,
        propertyTransfer.docUrl,
        propertyTransfer.docDescription,
        ownerAddress,
        propertyTransfer.buyersAddress,
      )
      alert('Contrato criado com sucesso!')
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
  }

  const onChange = (val) => {
    setPropertyTransfer({
      ...propertyTransfer,
      ...val,
    })
  }

  return (
    <div
      className="create-property-transfer-page"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: `calc(100vh - 50px)`,
      }}
    >
      <div>
        <h1>TRANSFERÊNCIA DE PROPRIEDADE</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="docName">Nome do documento:</label>
          <input type="text" id="docName" value={propertyTransfer.docName} onChange={(e) => onChange({ docName: e.target.value })} />
          <label htmlFor="docDescription">Descrição:</label>
          <input
            type="text"
            id="docDescription"
            value={propertyTransfer.docDescription}
            onChange={(e) => onChange({ docDescription: e.target.value })}
          />
          <label htmlFor="docUrl">Link para PDF:</label>
          <input type="text" id="docUrl" value={propertyTransfer.docUrl} onChange={(e) => onChange({ docUrl: e.target.value })} />
          <label htmlFor="price">Preço (ETH):</label>
          <input type="number" id="price" value={propertyTransfer.price} onChange={(e) => onChange({ price: e.target.value })} />
          <label htmlFor="buyersAddress">Wallet do comprador:</label>
          <CreatableSelect
            isLoading={loadingAddressList}
            options={availableAddressList}
            placeholder="Selecione ou insira..."
            noOptionsMessage={() => 'Não há opções disponíveis'}
            onChange={(e) => onChange({ buyersAddress: e.value })}
          />
          <Box className="enter">
            <Button type="submit" size="small" variant="contained" disabled={loading}>
              CRIAR CONTRATO DE TRANSFERÊNCIA
            </Button>
            {loading && (
              <CircularProgress
                size={20}
                sx={{
                  color: '#202e4b',
                  position: 'absolute',
                  left: '50%',
                  marginLeft: '-12px',
                }}
              />
            )}
          </Box>
        </form>
      </div>
    </div>
  )
}

export default CreatePropertyTransfer
