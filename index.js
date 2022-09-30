const Web3 = require('web3');
const dotenv = require('dotenv').config();


exports.test = (req, res) => {
    // Web3 provider 연결을 위한 구문, 해당 링크는 BSC testnet 오픈 노드
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

    // Contract의 interface(ABI), address
    const contractAbi = require('./abi/router.json'); //JSON.stringify(process.env.ABI); 
    const contractAddress = process.env.CONTRACT_ADDRESS;

    // 트랜잭션 요청자의 private key
    const privateKey = process.env.PRIVATE_KEY;

    // contract 주소와 abi를 사용하여 contract 불러오기
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // private key로 account 정보 변환
    const account = web3.eth.accounts.privateKeyToAccount('0x'+privateKey);
    
    // web3에 account 추가
    web3.eth.accounts.wallet.add(account);
    
    // 트랜잭션 요청
    // contract.methods.WETH.call()
    // .then(function(res){
    //     console.log("Text : " + res);
    // })
    // contract.methods.WETH.call();
    console.log(contract.methods);
    res.render("index");
}