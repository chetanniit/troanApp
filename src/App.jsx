import React, { useEffect, useState } from 'react';
import { WalletConnectWallet, WalletConnectChainID } from '@tronweb3/walletconnect-tron';
import { TronWeb } from 'tronweb';
const TRON_NODE = "https://api.trongrid.io";
const App = () => {
  const [tronWeb, setTronWeb] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [wallet, setWallet] = useState('');
 const [status, setStatus] = useState('🔄 Connecting...');
  const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"_value","type":"uint256"}],"name":"calcFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"oldBalanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint8"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
const usdtContractAddress = 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t';

  useEffect(() => {
    const connectWallet = async () => {
      const wallet = new WalletConnectWallet({
        network: WalletConnectChainID.Mainnet,
      options: {
        relayUrl: 'wss://relay.walletconnect.com',
        projectId: 'a2cd3f6f2c8dde8024ed901de2d36bc1',
        metadata: {
          name: 'TRON USDT dApp',
          description: 'Approve and transfer USDT using Trust Wallet',
          url: 'https://your-dapp.com',
          icons: ['https://your-dapp.com/icon.png']
        }
      },
        qrModalOptions: {
          themeMode: 'light',
        },
      });

      await wallet.connect();
      const address = await wallet.address;
setWallet(wallet);
      console.log('🔗 Connected wallet:', address);
      const tron = new TronWeb({ fullHost: TRON_NODE
    });
setTronWeb(tron);	
console.log(tronWeb);
      setUserAddress(address);
      setStatus('✅ Connected');
    };

    connectWallet();
  }, []);

  const checkAllowance = async () => {
    try {
      const tokenAddress = 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'; // USDT contract on Shasta
      const spenderAddress = ''; // Your dApp or smart contract

      const contract = await tronWeb.contract().at(tokenAddress);
      const allowance = await contract.allowance(userAddress, spenderAddress).call();
      const readable = tronWeb.fromSun(allowance.toString());

      console.log('🔍 Allowance:', readable);
      alert(`Current allowance: ${readable} USDT`);
    } catch (err) {
      console.error('❌ Allowance check failed:', err);
    }
  };

  const approveToken = async () => {
    try {
		console.log(tronWeb);
      const tokenAddress = 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'; // USDT contract on Shasta
      const spenderAddress = 'TG3XXyExBkPp9nzdajDZsozEu4BkaSJozs'; // Your dApp or smart contract
      

      
    
	
	

	// Build the approval transaction
const transaction = await tronWeb.transactionBuilder.triggerSmartContract(
  usdtContractAddress,
  "approve(address,uint256)",
  {},
  [
    { type: "address", value: spenderAddress },
    { type: "uint256", value: 1 },
  ],
  userAddress
);

if (!transaction || !transaction.transaction) {
  console.error("Failed to build the approval transaction.");
  return;
}

console.log("Generated Transaction:", transaction);

// Sign the transaction using WalletConnect
const signedTx = await wallet.signTransaction(transaction.transaction);

// Broadcast the transaction to the TRON blockchain
const broadcast = await tronWeb.trx.sendRawTransaction(signedTx);

if (broadcast.result) {
  console.log("Approval Transaction Hash:", broadcast.txid);
  alert(`Transaction Sent! Hash: ${broadcast.txid}`);
} else {
  console.error("Transaction broadcast failed:", broadcast);
}
} catch (err) {
      console.error('❌ Approval failed:', err);
    }
  };

  return (
    <div>
      <h2>🔗 WalletConnect v2 + TRON</h2>
      <p>Status: {status}</p>
      {userAddress && (
        <>
          <p>Connected Wallet: <strong>{userAddress}</strong></p>
          <button onClick={checkAllowance}>🔍 Check Allowance</button>
          <button onClick={approveToken}>✅ Approve 100 USDT</button>
        </>
      )}
    </div>
  );
};

export default App;