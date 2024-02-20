"use server";
import isUserId from "@/libs/utils/checkUserId";
import {
	SocialNetwork,
	supportedSocialNetworks,
} from "../services/social-network-resolver";
import { Address, UserId } from "@patchwallet/patch-sdk";
import { isAddress } from "viem";
import z from "zod";
import { utilsService } from "../services/utils";
import { notFound } from "next/navigation";
import { resolve } from "./resolve";
import { revalidateTag } from "next/cache";

export async function resolveSocialProfile(userId: UserId) {
	if (!isUserId(userId)) {
		notFound();
	}

	const [network, userName] = userId.split(":") as [SocialNetwork, string];

	const profile = await supportedSocialNetworks[network].resolveUser(userName);
	if ("error" in profile) {
		notFound();
	}

	const address = (await resolve(profile.patchUserId)) as Address;

	if (!address) {
		notFound();
	}

	return {
		profile,
		address,
	};
}

/**
 * Form Action for fetching user address from the server based on 2 form inputs - provider:username
 * @param prevState previous form submission state
 * @param formData current form data
 */
export async function fetchUserAddress(prevState: any, formData: FormData) {
	const schema = z.object({
		userId: z.string(),
		provider: z.string(),
	});
	const data = schema.parse({
		userId: formData.get("userId"),
		provider: formData.get("provider"),
	});

	if (data.provider === "domain") {
		const address = await utilsService.resolveDomain(data.userId as string);
		return {
			address: address ?? "",
			errorMessage: address ? "" : "Domain doesn't exist",
		};
	}

	if (data.provider === "address") {
		const _isValidAddress = isAddress(data.userId);
		return {
			address: _isValidAddress ? data.userId : "",
			errorMessage: _isValidAddress ? "" : "Invalid address",
		};
	}

	const _userId = `${data.provider}:${data.userId}`;

	if (isUserId(_userId)) {
		const address = (await resolve(_userId as UserId)) as Address;

		return {
			address,
			errorMessage: address ? "" : "Profile doesn't exist",
		};
	}
	return {
		address: "",
		errorMessage: data.userId && "Invalid user",
	};
}

export const revalidate = (tag: string) => {
	revalidateTag(tag);
};
