export async function requestAccount() {
  console.log('Requesting account...')

  if (typeof window.ethereum !== 'undefined' && window.ethereum) {
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      localStorage.setItem('walletAddress', accounts[0])

      return accounts[0]
    } catch (error) {
      console.log('Error connecting...')
    }
  } else {
    alert('Metamask not detected')
  }
}
