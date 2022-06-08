export const propertyTransferFactoryContractAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    name: 'newPropertyTransferContract',
    type: 'event',
  },
  {
    inputs: [],
    name: 'lastPropertyTransferAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'propertyTransfers',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'getPropertyTransfersCount',
    outputs: [
      {
        internalType: 'uint256',
        name: 'contractCount',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'pos',
        type: 'uint256',
      },
    ],
    name: 'getPropertyTransfer',
    outputs: [
      {
        internalType: 'address',
        name: 'contractAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: 'docName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'docUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'docDescription',
        type: 'string',
      },
      {
        internalType: 'address payable',
        name: 'owner',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: 'buyer',
        type: 'address',
      },
    ],
    name: 'createPropertyTransfer',
    outputs: [
      {
        internalType: 'address',
        name: 'newContract',
        type: 'address',
      },
    ],
    stateMutability: 'payable',
    type: 'function',
    payable: true,
  },
]

export const propertyTransferContractAbi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_price',
        type: 'uint256',
      },
      {
        internalType: 'string',
        name: '_docName',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_docUrl',
        type: 'string',
      },
      {
        internalType: 'string',
        name: '_docDescription',
        type: 'string',
      },
      {
        internalType: 'address payable',
        name: '_owner',
        type: 'address',
      },
      {
        internalType: 'address payable',
        name: '_buyer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'payerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'gas',
        type: 'uint256',
      },
    ],
    name: 'newPayment',
    type: 'event',
  },
  {
    inputs: [],
    name: 'getName',
    outputs: [
      {
        internalType: 'string',
        name: 'name',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDescription',
    outputs: [
      {
        internalType: 'string',
        name: 'description',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getUrl',
    outputs: [
      {
        internalType: 'string',
        name: 'url',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getOwner',
    outputs: [
      {
        internalType: 'address',
        name: 'ownerAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getBuyer',
    outputs: [
      {
        internalType: 'address',
        name: 'buyerAddress',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getPrice',
    outputs: [
      {
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getDoc',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'string',
            name: 'name',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'url',
            type: 'string',
          },
          {
            internalType: 'string',
            name: 'description',
            type: 'string',
          },
          {
            internalType: 'address payable',
            name: 'owner',
            type: 'address',
          },
        ],
        internalType: 'struct Property.Doc',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'a',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'b',
        type: 'string',
      },
    ],
    name: 'concatenate',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'signAndPay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const contractFactoryAddress = '0xc165c0265f67949287160091a8356D2AF5cE4659'
