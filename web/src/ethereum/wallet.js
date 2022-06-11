import { ethers } from 'ethers'
import { getProvider } from './provider'

const METAMASK_NOT_DETECT = 'Metamask not detected'
const LOCALHOST = 'http://127.0.0.1:7545'

const checkMetamask = () => {
  if (typeof window.ethereum !== 'undefined' && window.ethereum) return
  throw METAMASK_NOT_DETECT
}

export async function setToStorage(accounts) {
  const provider = getProvider()
  const balance = await provider.getBalance(accounts[0])
  const formattedBalance = parseFloat(ethers.utils.formatEther(balance)).toFixed(2)

  sessionStorage.setItem('walletAddress', accounts[0])
  sessionStorage.setItem('walletBalance', formattedBalance)
  localStorage.setItem('isAuthenticated', true)

  return {
    address: accounts[0],
    balance: formattedBalance,
  }
}

export async function getCurrentAccount() {
  console.log('Requesting account...')

  try {
    checkMetamask()

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })

    const wallet = await setToStorage(accounts)

    return wallet
  } catch (err) {
    if (err === METAMASK_NOT_DETECT) alert(err)
    console.log('Error connecting...')
  }
}

export async function getWalletList() {
  console.log('Requesting wallets...')

  try {
    checkMetamask()
    const provider = new ethers.providers.JsonRpcProvider(LOCALHOST);
    const accounts = await provider.listAccounts()
    return accounts
  } catch (err) {
    if (err === METAMASK_NOT_DETECT) alert(err)
    console.log('Error connecting...')
  }
}
