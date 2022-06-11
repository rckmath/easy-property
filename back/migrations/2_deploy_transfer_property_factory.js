const fs = require('fs')
const TransferPropertyFactory = artifacts.require('TransferPropertyFactory')
const TransferProperty = artifacts.require('TransferProperty')
const Helper = artifacts.require('Helper')

async function execDeploy(deployer, _network) {
  await deployer.deploy(Helper)
  await deployer.link(Helper, TransferPropertyFactory)

  const transferPropertyFactoryDeploy = await deployer.deploy(TransferPropertyFactory)

  try {
    const contract = {
      transferPropertyFactoryAddress: transferPropertyFactoryDeploy.address,
      transferPropertyFactoryAbi: transferPropertyFactoryDeploy.abi,
      transferPropertyAbi: TransferProperty._json.abi,
    }
    fs.writeFileSync('../web/src/ethereum/contractsMetadata.json', JSON.stringify(contract), 'utf8')
    console.log('JSON file has been saved.')
  } catch (err) {
    console.error(err)
  }
}

module.exports = (deployer, network) => {
  deployer.then(async () => {
    await execDeploy(deployer, network)
  })
}
