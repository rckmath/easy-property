// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract Property {
    event Log (uint amount, uint gas);

    struct Doc {
        uint price;
        string name;
        string url;
        string description;
        address payable owner;
    }

    address payable recipient;

    mapping (address => bool) signedBy;
    mapping (address => bool) isSigner;

    Doc document;

    constructor(
        uint _price,
        string memory _docName,
        string memory _docUrl,
        string memory _docDescription,
        address payable _recipient
    ) {
        require(_price > 0, "Price must be greater than zero.");
        require(payable(msg.sender) != _recipient, "The owner can not be the recipient");
        
        document = Doc(_price, _docName, _docUrl, _docDescription, payable(msg.sender));
        recipient = _recipient;
    
        // Addresses allowed to sign the document (owner and recipient only)
        isSigner[document.owner] = true;
        isSigner[recipient] = true;

        // Owner creates the contract so it's signed by him in this moment
        signedBy[document.owner] = true;
    }

    function setNewOwner(address _owner) internal {
        document.owner = payable(_owner);
    }

    function getDoc() public view returns (Doc memory) {
        return document;
    }

    function signAndPay() public payable {
        require(isSigner[msg.sender], "You are not a signatory.");
        require(!signedBy[msg.sender], "You have already signed.");
        require(msg.value == (document.price * 1e18), "Incorrect amount, please send the exact value for the property price");

        signedBy[msg.sender] = true;
        document.owner.transfer(msg.value);
        setNewOwner(msg.sender);
    }
}