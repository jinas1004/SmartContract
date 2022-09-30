// SPDX-License-Identifier: None
// 맨 윗줄의 License Identifier 주석은 지우지 말고 항상 표기

// solidity compiler version
pragma solidity 0.8.4;

// Contract interface 설정(추상 컨트랙트 및 함수)
interface IHelloWorld {
    // string의 경우는 용량이 크므로 memory로 함수 내에서만 사용하게 선언
    function modifyText(string memory text) external returns (bool);

    function readText(address addr) external view returns (string memory);

    // 특정 이벤트가 발생함을 알리기 위함, `indexed`를 추가하여 필터링 가능, `emit`으로 호출
    event ModifyText(address indexed addr, string text);
}

// 배포되는 컨트랙트
contract HelloWorld is IHelloWorld {
    // `mapping` 을 사용하여 각 address에 해당하는 string 값을 지정
    mapping (address => string) private _text;

    // 배포 시 초기 init
    constructor() {
        // msg.sender는 함수 호출자
        _text[msg.sender] = "Hello World!";

        // 이벤트 발생
        emit ModifyText(address(msg.sender), _text[msg.sender]);
    }

    // 추상 컨트랙트에서 상속받았기 때문에 override 설정
    // `external`사용하여 외부에서 호출, 내부에서만 호출 가능한 함수의 경우 `internal` 사용
    function modifyText(string memory text) external override returns (bool) {
        _text[msg.sender] = text;
        emit ModifyText(address(msg.sender), text);
        return true;
    }

    // `view` modifier를 추가하여 함수를 읽기 전용으로 설정(블록체인 내에 데이터를 바꾸지 않음, 수수료 없음)
    function readText(address addr) external view override returns (string memory) {
        // Solidity 에서는 Null 값이 없기 때문에 크기로 Null chech
        // `require`사용하여 조건에 맞지 않으면 함수 실행 취소
        require(bytes(_text[addr]).length > 0, "Error : empty string");

        return _text[addr];
    }
}