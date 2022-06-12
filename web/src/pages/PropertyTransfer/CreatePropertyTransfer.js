import './CreatePropertyTransfer.css'

import React, { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { ethers } from 'ethers'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory } from '../../ethereum/propertyContract'
import { getWalletList } from '../../ethereum/wallet'

import { Box, Button } from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'

import ToastAlert from '../../components/ToastAlert/ToastAlert'

const CreatePropertyTransfer = () => {
  const [propertyTransfer, setPropertyTransfer] = useState({
    price: '',
    docUrl: '',
    docName: '',
    buyersAddress: '',
    docDescription: '',
  })

  const [loading, setLoading] = useState(false)
  const [openSuccessMessage, setOpenSuccessMessage] = useState(false)
  const [openWarningMessage, setOpenWarningMessage] = useState(false)
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

  const validateSubmit = () => {
    if (
      propertyTransfer.docDescription ||
      propertyTransfer.docName ||
      propertyTransfer.docUrl ||
      propertyTransfer.buyersAddress ||
      propertyTransfer.price
    ) {
      return true
    }

    setOpenWarningMessage(true)
  }

  const handleSubmit = async (event) => {
    setLoading(true)
    event.preventDefault()
    if (!validateSubmit()) {
      setLoading(false)
      return
    }

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

      setPropertyTransfer({
        price: '',
        docUrl: '',
        docName: '',
        buyersAddress: '',
        docDescription: '',
      })

      setOpenSuccessMessage(true)
    } catch (err) {
      setOpenWarningMessage(true)
      console.log(err)
    }

    setLoading(false)
  }

  const handleCloseToast = (_event, reason) => {
    if (reason === 'clickaway') return
    setOpenSuccessMessage(false)
    setOpenWarningMessage(false)
  }

  const onChangeForm = (val) => {
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
        <ToastAlert openMessage={openSuccessMessage} onClose={handleCloseToast} content="Contrato criado com sucesso!" type="success" />
        <ToastAlert
          openMessage={openWarningMessage}
          onClose={handleCloseToast}
          content="Verifique os campos e tente novamente!"
          type="warning"
        />
        <h1>TRANSFERÊNCIA DE PROPRIEDADE</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="docName">Nome do documento:</label>
          <input type="text" id="docName" value={propertyTransfer.docName} onChange={(e) => onChangeForm({ docName: e.target.value })} />
          <label htmlFor="docDescription">Descrição:</label>
          <input
            type="text"
            id="docDescription"
            value={propertyTransfer.docDescription}
            onChange={(e) => onChangeForm({ docDescription: e.target.value })}
          />
          <label htmlFor="docUrl">Link para PDF:</label>
          <input type="text" id="docUrl" value={propertyTransfer.docUrl} onChange={(e) => onChangeForm({ docUrl: e.target.value })} />
          <label htmlFor="price">Preço (ETH):</label>
          <input type="number" id="price" value={propertyTransfer.price} onChange={(e) => onChangeForm({ price: e.target.value })} />
          <label htmlFor="buyersAddress">Wallet do comprador:</label>
          <CreatableSelect
            isLoading={loadingAddressList}
            options={availableAddressList}
            placeholder="Selecione ou insira..."
            noOptionsMessage={() => 'Não há opções disponíveis'}
            onChange={(e) => onChangeForm({ buyersAddress: e.value })}
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
