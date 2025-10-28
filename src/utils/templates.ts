export interface Template {
  name: string;
  display: string;
  description: string;
  available: boolean;
  comingSoon?: boolean;
}

export const templates: Template[] = [
  {
    name: "hello-world",
    display: "Hello World",
    description: "Simple starter template with basic contract deployment",
    available: true,
  },
  {
    name: "counter",
    display: "Counter",
    description:
      "Simple increment/decrement app demonstrating state management",
    available: false,
    comingSoon: true,
  },
  {
    name: "bboard",
    display: "Bulletin Board (Bboard)",
    description:
      "Bulletin board with multi-user interactions and privacy patterns",
    available: false,
    comingSoon: true,
  },
  {
    name: "dex",
    display: "Decentralized Exchange (DEX)",
    description: "Decentralized exchange using OpenZeppelin FungibleToken",
    available: false,
    comingSoon: true,
  },
  {
    name: "midnight-kitties",
    display: "Midnight Kitties",
    description:
      "Full stack DApp using NFT smart contract library (Crypto Kitties on Midnight)",
    available: false,
    comingSoon: true,
  },
];

/**
 * Get available templates for selection
 */
export function getAvailableTemplates(): Template[] {
  return templates.filter((t) => t.available);
}

/**
 * Get all templates including coming soon
 */
export function getAllTemplates(): Template[] {
  return templates;
}

/**
 * Get template by name
 */
export function getTemplate(name: string): Template | undefined {
  return templates.find((t) => t.name === name);
}

/**
 * Validate template name
 */
export function isValidTemplate(name: string): boolean {
  const template = getTemplate(name);
  return template !== undefined && template.available;
}
