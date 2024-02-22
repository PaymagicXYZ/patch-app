import { Chain } from "@patchwallet/patch-sdk";

export const NATIVE_TOKEN_ADDRESSES = [
	"0x0000000000000000000000000000000000001010", // matic
	"0x912CE59144191C1204E64559FE8253a0e49E6548", //arb
	"0x4200000000000000000000000000000000000042", // op
	"0x0000000000000000000000000000000000001004", // bnb
	"0x9C58BAcC331c9aa871AFD802DB6379a98e80CEdb", // GNO
	"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", // base/linea
];

export const BLOCK_EXPLORERS: Record<Chain, string> = {
	matic: "https://polygonscan.com",
	arb1: "https://arbiscan.io",
	// oeth: "https://optimistic.etherscan.io",
	bnb: "https://bscscan.com",
	linea: "https://lineascan.build",
	base: "https://basescan.org",
	gno: "https://gnosisscan.io",
	maticmum: "https://mumbai.polygonscan.com",
};
