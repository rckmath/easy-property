// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract TransferPropertyFactory {
    address[] public propertyTransfers;
    address public lastPropertyTransferAddress;

    event newPropertyTransferContract(address contractAddress);

    constructor() {}

    // Get the total of deployed contracts
    function getPropertyTransfersCount()
        public
        view
        returns (uint256 contractCount)
    {
        return propertyTransfers.length;
    }

    // Tell me a position and I will tell you its address
    function getPropertyTransfer(uint256 pos)
        public
        view
        returns (address contractAddress)
    {
        return address(propertyTransfers[pos]);
    }

    // Deploy a new property transfer contract
    function createPropertyTransfer(
        uint256 price,
        string memory docName,
        string memory docUrl,
        string memory docDescription,
        address payable owner,
        address payable buyer
    ) public payable returns (address newContract) {
        Property p = new Property(
            price,
            docName,
            docUrl,
            docDescription,
            owner,
            buyer
        );
        address contractAddr = address(p);
        propertyTransfers.push(contractAddr);
        lastPropertyTransferAddress = contractAddr;
        emit newPropertyTransferContract(contractAddr);
        return contractAddr;
    }
}

contract Property {
    event newPayment(address payerAddress, uint256 price, uint256 gas);

    struct Doc {
        uint256 price;
        string name;
        string url;
        string description;
        address payable owner;
    }

    address payable buyer;

    mapping(address => bool) signedBy;
    mapping(address => bool) isSigner;

    Doc document;

    constructor(
        uint256 _price,
        string memory _docName,
        string memory _docUrl,
        string memory _docDescription,
        address payable _owner,
        address payable _buyer
    ) {
        require(_price > 0, "Price must be greater than zero.");
        require(_owner != _buyer, "The owner can not be the buyer");

        document = Doc(_price, _docName, _docUrl, _docDescription, _owner);
        buyer = _buyer;

        // Addresses allowed to sign the document (owner and buyer only)
        isSigner[document.owner] = true;
        isSigner[buyer] = true;

        // Owner creates the contract so it's signed by him in this moment
        signedBy[document.owner] = true;
    }

    function setNewOwner(address _owner) internal {
        document.owner = payable(_owner);
    }

    function getName() public view returns (string memory name) {
        return document.name;
    }

    function getDescription() public view returns (string memory description) {
        return document.description;
    }

    function getUrl() public view returns (string memory url) {
        return document.url;
    }

    function getOwner() public view returns (address ownerAddress) {
        return document.owner;
    }

    function getBuyer() public view returns (address buyerAddress) {
        return buyer;
    }

    function getPrice() public view returns (uint256 price) {
        return document.price;
    }

    function getDoc() public view returns (Doc memory) {
        return document;
    }

    function concatenate(string memory a, string memory b)
        public
        pure
        returns (string memory)
    {
        return string(abi.encodePacked(a, " ", b));
    }

    function uintToStr(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    function signAndPay() public payable {
        emit newPayment(msg.sender, msg.value, gasleft());
        require(isSigner[msg.sender], "You are not a signatory.");
        require(!signedBy[msg.sender], "You have already signed.");
        require(
            msg.value == document.price,
            concatenate(
                "Incorrect amount, please send the exact value for the property price",
                uintToStr(msg.value)
            )
        );

        signedBy[msg.sender] = true;
        document.owner.transfer(msg.value);
        setNewOwner(msg.sender);
    }
}
