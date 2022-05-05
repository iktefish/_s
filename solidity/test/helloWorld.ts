import "@nomiclabs/hardhat-waffle"
import "@nomiclabs/hardhat-ethers"
import { ethers } from "hardhat"
import { expect } from "chai"

describe("hello world", () => {
    it("Should say hi", async () => {
        // 1. DONE Setup environment
        // 2. TODO Deploy our contract
        // 3. TODO Call our functions to test

        // %% Doing 2
        // The arg string should be the name of the contract
        const helloWorld = await ethers.getContractFactory("helloWorld")

        // This will will make the transaction that puts the contract onto an Ethereum network
        const hello = await helloWorld.deploy()
        // %% END

        // Ensures that my contract has been confirmed by the network enough times
        // that its considered to be on the network
        await hello.deployed()

        expect(await hello.hello()).to.equal("Hello, World!")
    })
})
