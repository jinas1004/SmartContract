const Web3 = require('web3');
const dotenv = require('dotenv').config();

exports.test = (req, res) => {
    // Web3 provider 연결을 위한 구문, 해당 링크는 BSC testnet 오픈 노드
    const web3 = new Web3("https://data-seed-prebsc-1-s1.binance.org:8545/");

    // Contract의 interface(ABI), address
    const contractAbi = require('./abi/router.json');
    const contractAddress = process.env.CONTRACT_ADDRESS;

    // 트랜잭션 요청자의 private key
    const privateKey = process.env.PRIVATE_KEY;

    // private key로 account 정보 변환
    const account = web3.eth.accounts.privateKeyToAccount('0x'+privateKey);

    // web3에 account 추가
    web3.eth.accounts.wallet.add(account);

    // contract 주소와 abi를 사용하여 contract 불러오기
    const contract = new web3.eth.Contract(contractAbi, contractAddress);

    // read 트랜잭션 요청 sample
    // contract.methods.WETH().call()
    // .then(function(res){
    //     console.log("Text : " + res);
    // });

    // write 트랜잭션 요청 sample
    // contract.methods.swapExactTokensForTokens(BigInt(10000000000000000000), BigInt(1000000000000000),["0x57B3d32f4E26438E5c73AC9A2a961c4F37dd3Bc7","0x8d58045432168caCF9bBd019E7CD938212D0e084"], "0xe4BD1D9F556eF3a6E85357E2425e7c8457A053Fb", 1664956000).send({
    //     from: account.address,
    //     gas: 210000
    // }).then(function(hash){
    //     console.log("swap result" + hash);
    // });

    res.render("index");
}