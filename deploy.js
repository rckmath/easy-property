let fs = require('fs')
let solc = require('solc')
let Web3 = require('web3')

let contract = compileContract()
let web3 = createWeb3()
let sender = 'xxxxx'

deployContract(web3, contract, sender)
  .then(function () {
    console.log('Deployment finished')
  })
  .catch(function (error) {
    console.log(`Contract deployment failed: ${error}`)
  })

function compileContract() {
  let compilerInput = {
    language: 'Solidity',
    sources: {
      'Property.sol': {
        content: fs.readFileSync('Property.sol', 'utf8'),
      },
    },
    settings: {
      outputSelection: {
        '*': {
          '*': ['*'],
        },
      },
    },
  }

  console.log('Compiling the contract')

  // Compila o contrato
  let output = JSON.parse(solc.compile(JSON.stringify(compilerInput)))

  // Obtém o contrato compilado
  let contract = output.contracts['Property.sol']['Property']

  // Salva o ABI do contrato
  let abi = contract.abi
  fs.writeFileSync('abi.json', JSON.stringify(abi))

  return contract
}

function createWeb3() {
  let web3 = new Web3()
  web3.setProvider(new web3.providers.HttpProvider('http://127.0.0.1:8545'))
  return web3
}

async function deployContract(web3, contract, sender) {
  let Property = new web3.eth.Contract(contract.abi)
  let bytecode = '0x' + contract.evm.bytecode.object
  let gasEstimate = await web3.eth.estimateGas({ data: bytecode })

  console.log('Deploying the contract')
  const contractInstance = await Property.deploy({
    data: bytecode,
  })
    .send({
      from: sender,
      gas: gasEstimate,
    })
    .on('transactionHash', function (transactionHash) {
      console.log(`Transaction hash: ${transactionHash}`)
    })
    .on('confirmation', function (confirmationNumber, receipt) {
      console.log(`Confirmation number: ${confirmationNumber}`)
    })

  console.log(`Contract address: ${contractInstance.options.address}`)
}
