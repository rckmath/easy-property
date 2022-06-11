import './CreatePropertyTransfer.css'

import React, { useState } from 'react'
import { ethers } from 'ethers'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory } from '../../ethereum/propertyContract'

const CreatePropertyTransfer = () => {
  const [loading, setLoading] = useState(false)
  const [docName, setDocName] = React.useState('')
  const [docDescription, setDocDescription] = React.useState('')
  const [docUrl, setDocUrl] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [buyersAddress, setBuyersAddress] = React.useState('')

  const provider = getProvider()

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)

    const ownerAddress = localStorage.getItem('walletAddress')
    const signer = provider.getSigner(ownerAddress)
    const contractFactory = getContractFactory(signer)

    try {
      const priceInWei = ethers.utils.parseEther(price)
      await contractFactory.createPropertyTransfer(priceInWei, docName, docUrl, docDescription, ownerAddress, buyersAddress)
      alert('Contrato criado com sucesso!')
    } catch (err) {
      console.log(err)
    }

    setLoading(false)
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
          <input type="text" id="docName" value={docName} onChange={(e) => setDocName(e.target.value)} />
          <label htmlFor="docDescription">Descrição:</label>
          <input type="text" id="docDescription" value={docDescription} onChange={(e) => setDocDescription(e.target.value)} />
          <label htmlFor="docUrl">Link para PDF:</label>
          <input type="text" id="docUrl" value={docUrl} onChange={(e) => setDocUrl(e.target.value)} />
          <label htmlFor="price">Preço (ETH):</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
          <label htmlFor="buyersAddress">Endereço de carteira do comprador:</label>
          <input type="text" id="buyersAddress" value={buyersAddress} onChange={(e) => setBuyersAddress(e.target.value)} />
          <div className="enter">
            {loading && <div className="loader"></div>}
            <button type="submit" st>
              CRIAR CONTRATO DE TRANSFERÊNCIA
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePropertyTransfer
