import { ethers } from 'ethers'

const { transferPropertyAbi, transferPropertyFactoryAbi, transferPropertyFactoryAddress } = require('./contractsMetadata.json')

export function getContractFactory(signer) {
  return new ethers.Contract(transferPropertyFactoryAddress, transferPropertyFactoryAbi, signer)
}

export function getPropertyTransferContract(contractAddress, signer) {
  return new ethers.Contract(contractAddress, transferPropertyAbi, signer)
}
