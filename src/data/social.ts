import { SocialNetworkListItem } from "@/types";

const socialNetworks: SocialNetworkListItem[] = [
    {
      id: "twitter",
      name: "Twitter",
      label: small ? "" : "Twitter",
      placeholder: small ? "Search for Twitter profile..." : "username",
      icon: <Image src="/twitter.svg" alt="twitter" width={20} height={20} />,
    },
    {
      id: "github",
      name: "Github",
      label: small ? "" : "Github",
      placeholder: small ? "Search for Github profile..." : "username",
      icon: <Image src="/github.svg" alt="github" width={20} height={20} />,
    },
    {
      id: "email",
      name: "Email",
      label: small ? "" : "Email",
      placeholder: small ? "Search for Email address..." : "email",
      icon: <Image src="/email.svg" alt="email" width={20} height={20} />,
    },
    {
      id: "tel",
      name: "Phone",
      label: small ? "" : "Phone",
      placeholder: small ? "Search for phone number..." : "phone number",
      icon: <Image src="/tel.svg" alt="phone" width={20} height={20} />,
    },
    {
      id: "passphrase",
      name: "Passphrase",
      label: small ? "" : "Passphrase",
      placeholder: small ? "Search for passphrase wallet..." : "passphrase",
      icon: (
        <Image src="/passphrase.svg" alt="passphrase" width={20} height={20} />
      ),
    },
  ];