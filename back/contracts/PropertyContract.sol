// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {Helper} from "./HelperLibrary.sol";

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
        TransferProperty p = new TransferProperty(
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

contract TransferProperty {
    event newPayment(address payerAddress, uint256 price, uint256 gas);

    struct Doc {
        uint256 price;
        string name;
        string url;
        string description;
    }

    address payable private owner;
    address payable private buyer;

    mapping(address => bool) signedBy;
    mapping(address => bool) isSigner;

    Doc private document;

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

        document = Doc(_price, _docName, _docUrl, _docDescription);
        owner = _owner;
        buyer = _buyer;

        // Addresses allowed to sign the document (owner and buyer only)
        isSigner[owner] = true;
        isSigner[buyer] = true;

        // Owner creates the contract so it's signed by him in this moment
        signedBy[owner] = true;
    }

    function setNewOwner(address _owner) internal {
        owner = payable(_owner);
    }

    function getDoc() public view returns (Doc memory) {
        return document;
    }

    function getOwner() public view returns (address ownerAddress) {
        return owner;
    }

    function getBuyer() public view returns (address buyerAddress) {
        return buyer;
    }

    function signAndPay() public payable {
        emit newPayment(msg.sender, msg.value, gasleft());
        require(isSigner[msg.sender], "You are not a signatory.");
        require(!signedBy[msg.sender], "You have already signed.");

        string memory incorrectAmountMsg = Helper.concatenate(
            "Incorrect amount, please send the exact value for the property price",
            Helper.uintToStr(msg.value)
        );

        require(msg.value == document.price, incorrectAmountMsg);

        signedBy[msg.sender] = true;
        owner.transfer(msg.value);
        setNewOwner(msg.sender);
    }
}
