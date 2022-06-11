import React, { useEffect, useState } from 'react'
import { requestAccount } from '../../ethereum/wallet'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalance, setWalletBalance] = useState('')

  useEffect(() => {
    const wallet = localStorage.getItem('walletAddress')
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated && (wallet !== null || wallet !== walletAddress)) {
      requestAccount().then((wallet) => {
        setWalletAddress(wallet.address)
        setWalletBalance(wallet.balance)
      })
    }
  }, [walletAddress])

  const connectToWallet = async () => {
    const wallet = await requestAccount()
    setWalletAddress(wallet)
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
            {walletBalance ? `${walletBalance} ETH` : 'Connect wallet'}
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
