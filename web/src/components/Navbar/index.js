import React, { useEffect, useState } from 'react'
import { requestAccount } from '../../ethereum/wallet'
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink } from './NavbarElements'

const Navbar = () => {
  const [walletAddress, setWalletAddress] = useState('')

  useEffect(() => {
    const wallet = localStorage.getItem('walletAddress')

    if (wallet !== null) {
      setWalletAddress(wallet)
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
          <NavLink to="/" activeStyle>
            Criar contrato
          </NavLink>
          <NavLink to="/property-transfers" activeStyle>
            Visualizar contratos
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="#" onClick={connectToWallet}>
            {walletAddress ? walletAddress : 'Connect wallet'}
          </NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  )
}

export default Navbar
