---
sidebar_position: 1
---

# Introduction to developing on RChain

RChain is a Proof Of Stake (POS) smart contract platform. It parallelizes the proposal and execution of blocks to achieve higher throughput, and shorter finality times without sacrificing decentralization.

## Quick development setup

**Note :** This guide will only work on rnode 0.12.0+

**on ubuntu/debian**

```bash
apt install ./rnode_0.x.x_all.deb
```

**on macOS**

Prerequisites:
- Java - We recommend Open JDK 11, [openjdk.java.net/projects/jdk/11/](https://openjdk.java.net/projects/jdk/11/)
- Libsodium - https://download.libsodium.org/doc/ installed in a standard prefix (/user or /user/local)

```bash
tar -xvf rnode-0.x.x.tgz
cd rnode-0.x.x
./macos_install.sh
```

If you have another operating system or want to use docker please consult [full documentation](https://rchain.atlassian.net/wiki/spaces/CORE/pages/428376065/User+guide+for+running+RNode)

### Configuration files

Two configuration files are necessary, ~/.rnode/genesis/bonds.txt file and ~/.rnode/genesis/wallets.txt file. We will use the following key pair.

**Warning :** Do not use this private key for any other purpose than development !

```bash
private key 28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36
public key  04be064356846e36e485408df50b877dd99ba406d87208add4c92b3c7d4e4c663c2fbc6a1e6534c7e5c0aec00b26486fad1daf20079423b7c8ebffbbdff3682b58
```

```bash
mkdir ~/.rnode && mkdir ~/.rnode/genesis
echo "04be064356846e36e485408df50b877dd99ba406d87208add4c92b3c7d4e4c663c2fbc6a1e6534c7e5c0aec00b26486fad1daf20079423b7c8ebffbbdff3682b58 100000000000" > ~/.rnode/genesis/bonds.txt
echo "1111Wbd8KLeWBVsxByF9iksJ4QRRjEF3nq1ScgAw7bMbtomxHsqqd,1000000000000000,0"
```

### Running the blockchain

Now the configuration files are set up, there is one validator allowed to deploy, and only one address that has REV. We can run the node.

```bash
rnode run -s --validator-private-key  28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36  --dev-mode
```

This node is standalone, it is a one node blockchain network, therefore it does not download any block and starts at block height 0. It is executed with the `--dev-mode` option, so the API is an extended API with explore deploy available.

### Do a first deploy and propose block

Now in another shell (we don't want to stop the node) let's create our first rholang code, deploy it and propose the block.

```bash
# create the rholang file
echo "new stdout(\`rho:io:stdout\`) in { stdout!(\"hello world\") }" > hello.rho
```

```bash
# deploy rholang
rnode deploy --valid-after-block-number 0 --phlo-price 1 --phlo-limit 10000000 --private-key 28a5c9ac133b4449ca38e9bdf7cacdce31079ef6b3ac2f0a080af83ecff98b36 hello.rho
```

```bash
# propose the block
rnode --grpc-port 40402 propose
```

You should see `"hello world"` pop up in the logs, it means that your deploy has been included into a block, and the transaction has been executed.

### Going further

[RChain toolkit](https://github.com/fabcotech/rchain-toolkit) is the main javascript library to automate RChain related operations.

