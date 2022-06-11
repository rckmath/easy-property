import React, { useEffect, useState } from 'react'
import { getCurrentAccount, setToStorage } from '../../ethereum/wallet'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
  window.ethereum.on('accountsChanged', function(accounts) {
    setToStorage(accounts)
      .then((wallet) => {
        setWallet(wallet)
      })
      .catch(console.error)
  })

  const [loading, setLoading] = useState(false)
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalance, setWalletBalance] = useState('')

  useEffect(() => {
    const wallet = sessionStorage.getItem('walletAddress')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (isAuthenticated === 'true' && (wallet === null || wallet !== walletAddress)) {
      connectToWallet().catch(console.error)
    }
  }, [])

  const connectToWallet = async () => {
    if (!loading) {
      setLoading(true)
      const wallet = await getCurrentAccount()
      if (wallet) setWallet(wallet)
      setLoading(false)
    }
  }

  const setWallet = (wallet) => {
    if (wallet) {
      setWalletAddress(wallet.address)
      setWalletBalance(wallet.balance)
    }
  }

  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/">Criar contrato</NavLink>
          <NavLink to="/property-transfers">Visualizar contratos</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="#" onClick={connectToWallet}>
            {walletBalance ? `${walletAddress + ' • ' + walletBalance} ETH` : 'Connect wallet'}
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
