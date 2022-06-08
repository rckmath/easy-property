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

    // Deploy a new property transfer contract
    function createPropertyTransfer(
        uint256 price,
        string memory docName,
        string memory docUrl,
        string memory docDescription,
        address payable buyer
    ) public payable returns (address newContract) {
        Property p = new Property(
            price,
            docName,
            docUrl,
            docDescription,
            buyer
        );
        address contractAddr = address(p);
        propertyTransfers.push(contractAddr);
        lastPropertyTransferAddress = contractAddr;
        emit newPropertyTransferContract(contractAddr);
        return contractAddr;
    }

    // Tell me a position and I will tell you its address
    function getPropertyTransfer(uint256 pos)
        public
        view
        returns (address contractAddress)
    {
        return address(propertyTransfers[pos]);
    }
}

contract Property {
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
        address payable _buyer
    ) {
        require(_price > 0, "Price must be greater than zero.");
        require(
            payable(msg.sender) != _buyer,
            "The owner can not be the buyer"
        );

        document = Doc(
            _price,
            _docName,
            _docUrl,
            _docDescription,
            payable(msg.sender)
        );
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

    function getPrice() public view returns (uint256 price) {
        return document.price;
    }

    function getDoc() public view returns (Doc memory) {
        return document;
    }

    function signAndPay() public payable {
        require(isSigner[msg.sender], "You are not a signatory.");
        require(!signedBy[msg.sender], "You have already signed.");
        require(
            msg.value == (document.price * 1e18),
            "Incorrect amount, please send the exact value for the property price"
        );

        signedBy[msg.sender] = true;
        document.owner.transfer(msg.value);
        setNewOwner(msg.sender);
    }
}
