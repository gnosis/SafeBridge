import { task } from 'hardhat/config'
import { verifyMastercopiesFromArtifact } from 'zodiac-core'

const { ETHERSCAN_API_KEY } = process.env

task(
  'mastercopy:verify',
  'Verifies all mastercopies from the artifacts file, in the block explorer corresponding to the current network'
).setAction(async (_, hre) => {
  await verifyMastercopiesFromArtifact({
    apiUrlOrChainId: String((await hre.ethers.provider.getNetwork()).chainId),
    apiKey: ETHERSCAN_API_KEY as string,
  })
})
