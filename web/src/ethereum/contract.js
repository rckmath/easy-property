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
        name: '_buyer',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
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
    inputs: [],
    name: 'signAndPay',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
]

export const contractFactoryAddress = '0xCe85DbBd3c10D217d52660E25a7eAe150e13cB5E'
