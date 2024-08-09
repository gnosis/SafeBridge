import { task } from 'hardhat/config'

import { writeMastercopyArtifact } from "zodiac-core";

import packageJson from '../../package.json'

const AddressOne = '0x0000000000000000000000000000000000000001'

task(
  'mastercopy:extract',
  'Extracts and persists current mastercopy build artifacts'
).setAction(async (_, hre) => {
  const contractVersion = packageJson.version
  const contractName = 'AMBModule'
  const contractSource = 'contracts/AMBModule.sol'
  const compilerInput = await hre.run('verify:etherscan-get-minimal-input', {
    sourceName: contractSource,
  })

  writeMastercopyArtifact({
    contractVersion,
    contractName,
    compilerInput,
    constructorArgs: {
      types: ['address', 'address', 'address', 'uint256', 'uint256'],
      values: [AddressOne, AddressOne, AddressOne, 0, 0],
    },
    salt: '0x0000000000000000000000000000000000000000000000000000000000000000',
  })
})
