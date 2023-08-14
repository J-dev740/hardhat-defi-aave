# Hardhat DeFi 

* Please use a mainnet-fork or local network instead of a testnet.*



- [Hardhat DeFi](#hardhat-defi)
- [Getting Started](#getting-started)
  - [Requirements](#requirements)
  - [Quickstart](#quickstart)

- [Usage](#usage)
  - [Testing](#testing)
- [Running on a testnet or mainnet](#running-on-a-testnet-or-mainnet)
- [Linting](#linting)
  - [Formatting](#formatting)


# Getting Started

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - You'll know you've installed nodejs right if you can run:
    - `node --version` and get an ouput like: `vx.x.x`
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - `yarn --version` and get an output like:`x.x.x`
    - You might need to install it with npm

## Quickstart

```
git clone https://github.com/J-dev740/hardhat-defi-aave
cd hardhat-defi-aave
npm install
```



# Usage

This repo requires a mainnet rpc provider, but don't worry! You won't need to spend any real money. We are going to be `forking` mainnet, and pretend as if we are interacting with mainnet contracts. 

All you'll need, is to set a `MAINNET_RPC_URL` environment variable in a `.env` file that you create. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

Run:

```
npm hardhat run scripts/aaveBorrow.js
```

## Testing

We didn't write any tests for this, sorry!


# Running on a testnet or mainnet

1. Setup environment variabltes

You'll want to set your `GOERLI_RPC_URL` and `PRIVATE_KEY` as environment variables. You can add them to a `.env` file

- `PRIVATE_KEY`: The private key of your account (like from [metamask](https://metamask.io/)). **NOTE:** FOR DEVELOPMENT, PLEASE USE A KEY THAT DOESN'T HAVE ANY REAL FUNDS ASSOCIATED WITH IT.
  - You can [learn how to export it here](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
- `GOERLI_RPC_URL`: This is url of the goerli testnet node you're working with. You can get setup with one for free from [Alchemy](https://alchemy.com/?a=673c802981)

2. Get testnet ETH

Head over to [faucets.chain.link](https://faucets.chain.link/) and get some tesnet ETH. You should see the ETH show up in your metamask.

3. Run

```
npx hardhat run scripts/aaveBorrow.js --network goerli
```


# Linting

To check linting / code formatting:
```
npx  lint
```
or, to fix: 
```
npx lint:fix
```

## Formatting

```
npx format
```
