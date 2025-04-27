export type BillingCountryResponse = {
  country_code: string;
};

export type DiscordUser = {
  id: string;
  username: string;
  discriminator: number;
  avatar?: string;
  bot?: boolean;
  system?: boolean;
  mfa_enabled?: boolean;
  locale?: string;
  flags?: number;
  public_flags?: number;
  purchased_flags?: number;
  banner?: string;
  banner_color?: string;
  accent_color?: number;
  bio?: string;
  nsfw_allowed?: boolean;
  email?: string;
  phone?: string;
  verified?: boolean;
  premium_type?: number;
};

export type UserProfile = {
  user: DiscordUser;
  connected_accounts?: Array<{
    type: string;
    id: string;
    name: string;
    verified: boolean;
  }>;
  mutual_guilds?: Array<{
    id: string;
    nick: string;
  }>;
  premium_since?: string;
  premium_guild_since?: string;
  premium_type?: number;
  user_profile: {
    bio?: string;
    accent_color?: number;
    banner?: string;
  };
};

export type DiscordAccount = {
  user: DiscordUser;
  tokens: string[];
};

export type InvalidDiscordAccount = {
  user: DiscordUser | { id?: string };
  token: string;
};
