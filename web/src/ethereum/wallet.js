import { ethers } from 'ethers'
import { getProvider } from './provider'

export async function requestAccount() {
  console.log('Requesting account...')

  if (typeof window.ethereum !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      const provider = getProvider()
      const balance = await provider.getBalance(accounts[0])
      const formattedBalance = parseFloat(ethers.utils.formatEther(balance)).toFixed(2)

      localStorage.setItem('walletAddress', accounts[0])
      localStorage.setItem('walletBalance', formattedBalance)
      localStorage.setItem('isAuthenticated', true)

      return {
        address: accounts[0],
        balance: formattedBalance,
      }
    } catch (error) {
      console.log('Error connecting...')
    }
  } else {
    alert('Metamask not detected')
  }
}
