// token address
export const WETH_ADDRESS = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6";   
export const USDC_ADDRESS = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
export const UNI_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
export const LINK_ADDRESS = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"

// token address map
export const tokenAddressMap = {
    WETH: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
    USDC: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    UNI: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
    LINK: "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"
};

// contract address
export const contractAddress = '0x3f432DdE5a21865A7f146dBbe3AEb60B5e856EF9';



// WETH contract ABI
export const wethAbi = ["function balanceOf(address account) external returns (uint256 amount)", "function deposit() external payable", "function approve(address spender, uint256 amount) public returns (bool)"]; // ABI for the deposit and approve functions

// contract ABI
export const contractABI = [
    {
        "inputs": [
            {
                "internalType": "contract ISwapRouter",
                "name": "_swapRouter",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "ethSpent",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "amountsOut",
                "type": "uint256[]"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "proportions",
                "type": "uint256[]"
            }
        ],
        "name": "Buy",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "name": "Sell",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "WETH9",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "proportions",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "name": "investInPortfolio",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "poolFee",
        "outputs": [
            {
                "internalType": "uint24",
                "name": "",
                "type": "uint24"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address[]",
                "name": "tokens",
                "type": "address[]"
            },
            {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }
        ],
        "name": "sellPortfolio",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "swapRouter",
        "outputs": [
            {
                "internalType": "contract ISwapRouter",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];