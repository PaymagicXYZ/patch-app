import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Image from "next/image"
import { SupportedSocialNetworksDetails } from "@/types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function getSupportedLookupNetworks(isMobile = false): SupportedSocialNetworksDetails {
    return {
        "twitter": {
          id: "twitter",
          name: "Twitter",
          label: isMobile ? "" : "Twitter",
          placeholder: !isMobile ? "Search for Twitter profile..." : "username",
          iconSrc: "/twitter.svg",
          iconAlt: "twitter icon"
        },
        "github": {
          id: "github",
          name: "Github",
          label: isMobile ? "" : "Github",
          placeholder: !isMobile ? "Search for Github profile..." : "username",
          iconSrc: "/github.svg",
          iconAlt: "github icon"
        },
        "email": {
          id: "email",
          name: "Email",
          label: isMobile ? "" : "Email",
          placeholder: !isMobile ? "Search for Email address..." : "email",
          iconSrc: "/email.svg",
          iconAlt: "email icon"
        },
        "tel": {
          id: "tel",
          name: "Phone",
          label: isMobile ? "" : "Phone",
          placeholder: !isMobile ? "Search for phone number..." : "phone number",
          iconSrc: "/phone.svg",
          iconAlt: "phone icon"
        },
        "passphrase": {
          id: "passphrase",
          name: "Passphrase",
          label: isMobile ? "" : "Passphrase",
          placeholder: !isMobile ? "Search for passphrase wallet..." : "passphrase",
          iconSrc: "/passphrase.svg",
          iconAlt: "passphrase icon"
        },
    }
}