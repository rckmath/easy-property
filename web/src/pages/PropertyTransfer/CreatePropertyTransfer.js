import './CreatePropertyTransfer.css'

import React, { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useNavigate } from 'react-router-dom'

import { getProvider } from '../../ethereum/provider'
import { getContractFactory } from '../../ethereum/propertyContract'

const CreatePropertyTransfer = () => {
  const [loading, setLoading] = useState(false)
  const [docName, setDocName] = React.useState('')
  const [docDescription, setDocDescription] = React.useState('')
  const [docUrl, setDocUrl] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [buyersAddress, setBuyersAddress] = React.useState('')

  const navigate = useNavigate()
  const provider = getProvider()

  useEffect(() => {
    if (!loading && localStorage.getItem('walletAddress') === null) {
      navigate('/')
    }
  }, [loading, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()

    setLoading(true)

    const signer = provider.getSigner()
    const contractFactory = getContractFactory(signer)

    try {
      const priceInWei = ethers.utils.parseEther(price)
      await contractFactory.createPropertyTransfer(priceInWei, docName, docUrl, docDescription, buyersAddress)
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
        height: `calc(100vh - 85px)`,
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
            <button type="submit">Criar contrato de transferência</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreatePropertyTransfer
