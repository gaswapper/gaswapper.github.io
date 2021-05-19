"use strict";

/**
 * Example JavaScript code that interacts with the page and Web3 wallets
 */
document.querySelector('#goodbye').style.display='none';
 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider.default;
const Fortmatic = window.Fortmatic;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;


// Get contrract and ABI and address
let contractaddress = '0x49AD5Ae0b902360029b222CB6516521afA8e1141';
let contractaddress2 = '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82';
let abi = [{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Collect","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Fee","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":false,"internalType":"uint256","name":"tokens","type":"uint256"}],"name":"Unstake","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"user","type":"address"},{"indexed":false,"internalType":"bool","name":"status","type":"bool"}],"name":"Whitelist","type":"event"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"allInfoFor","outputs":[{"internalType":"uint256","name":"totalTokenSupply","type":"uint256"},{"internalType":"uint256","name":"totalTokensStaked","type":"uint256"},{"internalType":"uint256","name":"userBalance","type":"uint256"},{"internalType":"uint256","name":"userStaked","type":"uint256"},{"internalType":"uint256","name":"userDividends","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"address","name":"_spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_spender","type":"address"},{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address[]","name":"_receivers","type":"address[]"},{"internalType":"uint256[]","name":"_amounts","type":"uint256[]"}],"name":"bulkTransfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"collect","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"distribute","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"dividendsOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"isWhitelisted","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"stake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"stakeDrop","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"address","name":"_user","type":"address"}],"name":"stakedOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalStaked","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokens","type":"uint256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"transferAndCall","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"uint256","name":"_tokens","type":"uint256"}],"name":"unstake","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_user","type":"address"},{"internalType":"bool","name":"_status","type":"bool"}],"name":"whitelist","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"}];
//console.log(contract);
console.log(abi);



/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("Fortmatic is", Fortmatic);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if(location.protocol !== 'https:') {
    // https://ethereum.stackexchange.com/a/62217/620
    const alert = document.querySelector("#alert-error-https");
    alert.style.display = "block";
    document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
    return;
  }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "8043bb2cf99347b1bfadfb233c5325c0",
      }
    },

    fortmatic: {
      package: Fortmatic,
      options: {
        // Mikko's TESTNET api key
        key: "pk_test_391E26A3B43A3350"
      }
    },
    
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
    theme:'dark',
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  
  const chainData = evmChains.getChain(chainId);
  document.querySelector("#network-name").textContent = chainData.name;

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];
  document.querySelector("#selected-account").textContent = selectedAccount;
  
  // Get a handl
  // Purge UI elements any previously loaded accounts
  //accountContainer.innerHTML = '';
  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    //GET Ethereum/BNB  Balance
    const balance = await web3.eth.getBalance(address);
    //CWJ TOKEN 
    const contract = new web3.eth.Contract(abi,contractaddress);
    //Cake Token
    //const contract2 = new web3.eth.Contract(abi,contractaddress2);
    
    //Fetch token Balance CWJ
    const tokenBalance = await contract.methods.balanceOf(address).call();
    //Fetch token Balance Cake
    //const cakeBalance = await contract2.methods.balanceOf(address).call();

    //CWJ Contract 
    const totalSupply = await contract.methods.totalSupply().call();
    
    const totalStake = await contract.methods.totalStaked().call();
    
    const divRead =  await contract.methods.dividendsOf(address).call();
    const dividendfix = web3.utils.fromWei(divRead, "ether");
    const dividendsOf = parseFloat(dividendfix).toFixed(4);

    const stakedOf = await contract.methods.stakedOf(address).call();
   

    // ethBalance is a BigNumber instance  convert to humanreadable
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    //convert token balance cwj
    const tokenBalancecwj = web3.utils.fromWei(tokenBalance, "ether");
    const humanFriendlyBalance2 = parseFloat(tokenBalancecwj).toFixed(4);
    //convert token balance cwj
    //const cakeBalancecwj = web3.utils.fromWei(cakeBalance, "ether");
   // const humanFriendlyBalance3 = parseFloat(cakeBalancecwj).toFixed(4);
    
    

    // Fill in the templated row and put in the document
    
    document.querySelector(".balance").textContent = humanFriendlyBalance;
    if(humanFriendlyBalance < 0.05){
        //document.getElementById('buyBNB').disabled = true;
        document.getElementById('buyBNB').innerHTML = "<a href='https://binance.com'; target='_blank' style='color:white;' >BUY BNB</a>";
    }else{
        document.getElementById('buyBNB').disabled = true;
    }
    //document.querySelector(".address").textContent = address;
    //CWJ Token 
    document.querySelector(".cwjbalance").textContent = humanFriendlyBalance2;
    document.querySelector(".cwj").innerHTML =contractaddress ;
    document.querySelector(".cwjscan").innerHTML = "<a href='https://bscscan.com/address/0x49AD5Ae0b902360029b222CB6516521afA8e1141'; target='_blank' >VerifiedSmartContract</a>" ;
    //Cake Token
    //document.querySelector(".cakebalance").textContent = humanFriendlyBalance3;
    //document.querySelector(".cake").textContent = contractaddress2;

   if(humanFriendlyBalance2 == 0){
    document.querySelector(".cwjbalance").innerHTML = "0 CWJ, <a href='https://1inch.exchange/#/r/0x9F0818B7D8AaA0AD4Db760E896363b2A01a00921'> Buy on 1inch</a> or get on <a href='https://exchange.pancakeswap.finance/#/swap?outputCurrency=0x49AD5Ae0b902360029b222CB6516521afA8e1141'>PancakeSwap</a>"
    document.getElementById('addToken').style.display = 'none'
   }else{
     
   }

   //Contract Info totalSupply, staked, etc..
   document.querySelector(".totalSupply").innerHTML = web3.utils.fromWei(totalSupply, "ether");
   document.querySelector(".totalStaked").innerHTML = web3.utils.fromWei(totalStake, "ether");
   document.querySelector(".dividendsOf").innerHTML = dividendsOf;
   document.querySelector(".stakedBalance").innerHTML = web3.utils.fromWei(stakedOf, "ether");
   document.querySelector(".availableStake").innerHTML = humanFriendlyBalance2;

    //Transfer Token from Account to account
    document.getElementById("sendEthButton").addEventListener('click', transfer);
    async function transfer() {
      const to = document.getElementById('to').value;
      const amountwei = document.getElementById('amount').value;
      const hex = web3.utils.toWei(amountwei);
    
      // TRansfer
      await contract.methods.transfer(to, hex).send({from: accounts[0]})
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
      //document.getElementById('amount').value = '';
      //document.getElementById('to').value = '';
        
       

    }
         //Stake
         document.getElementById("stakeButton").addEventListener('click', stake);
    async function stake() {
      const stakeAmountWei = document.getElementById('stakeAmount').value;
      const hexStake = web3.utils.toWei(stakeAmountWei);
      
      // Stake
      await contract.methods.stake(hexStake).send({from: accounts[0]})
      .then((txHash) => console.log(txHash))
      .catch((error) => console.error);
      document.getElementById('amount').value = '';
      document.getElementById('to').value = '';

    }
        //Unstake 
            
        document.getElementById("unstakeButton").addEventListener('click', unstake);
        async function unstake() {
          const unstakeAmountWei = document.getElementById('unstakeAmount').value;
          const unhexStake = web3.utils.toWei(unstakeAmountWei);
        
          
        
          // UnStake
          await contract.methods.unstake(unhexStake).send({from: accounts[0]})
          .then((txHash) => console.log(txHash))
          .catch((error) => console.error);
          document.getElementById('unstakeAmount').value = ''; 
    
        }       

        //Withdraw
        document.getElementById("collect").addEventListener('click', collect);
        async function collect() {
          await contract.methods.collect().send({from: accounts[0]})
          .then((txHash) => console.log(txHash))
          .catch((error) => console.error);
    
        }       

     



  });
  

  

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  document.querySelector("#prepare").style.display = "none";
  document.querySelector("#connected").style.display = "block";

  
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  document.querySelector("#connected").style.display = "none";
  document.querySelector("#prepare").style.display = "none";
  //document.querySelector("#hide").style.display = "none";
  document.querySelector("#jumbo").style.display = "none"; //Hide Splash screen
  document.querySelector('#goodbye').style.display='none';
  document.querySelector('#welcome').style.display='none'
  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  document.querySelector("#btn-connect").removeAttribute("disabled")
}


/**
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }
  

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });




  await refreshAccountData();
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);
  document.querySelector('#goodbye').style.display='block';
  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
  document.querySelector('#welcome').style.display='none';
  document.querySelector('#goodbye').style.display='block'
}


/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
  document.querySelector("#btn-disconnect").addEventListener("click", onDisconnect);
  
});




addToken.addEventListener('click', () =>{
  ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: '0x49AD5Ae0b902360029b222CB6516521afA8e1141',
        symbol: 'CWJ',
        decimals: 18,
        image: 'https://token.codewithjoe.net/logo.png',
      },
    },
  });
});

 
    


