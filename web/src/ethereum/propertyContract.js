import { ethers } from 'ethers'
import { contractFactoryAddress, propertyTransferContractAbi, propertyTransferFactoryContractAbi } from './contract'

export function getContractFactory(signer) {
  return new ethers.Contract(contractFactoryAddress, propertyTransferFactoryContractAbi, signer)
}

export function getPropertyTransferContract(contractAddress, signer) {
  return new ethers.Contract(contractAddress, propertyTransferContractAbi, signer)
}
