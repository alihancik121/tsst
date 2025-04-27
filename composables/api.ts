import type { BillingCountryResponse, DiscordUser, UserProfile } from '~/utils/types';

type RequestConfig = {
  data?: object;
  token?: string;
  delay?: number;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

export const DISCORD_EPOCH = 1420070400000;

/**
 * Converts a Discord snowflake id to a milliseconds timestamp.
 * @param snowflake
 */
function snowflakeToMilliseconds(snowflake: string): number {
  if (!Number.isInteger(+snowflake)) {
    return 0;
  }

  return Math.floor(+snowflake / 4194304 + DISCORD_EPOCH);
}

/**
 * Sends a request to the Discord api with the given data. If a rate limit is encountered, wait and retry.
 * @param {string} uri The request uri (e.g. /users)
 * @param {RequestConfig} config The request config for this request.
 */
async function apiRequest(uri: string, config: RequestConfig): Promise<any> {
  const { data = null, token = null, delay = 0, method = 'GET' } = config;
  try {
    if (delay && delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay));
    }

    const url = useRuntimeConfig().public.GATEWAY_URL + uri;
    return await $fetch(url, {
      method,
      body: data,
      headers: token ? { Authorization: token } : {},
    });
  } catch (err) {
    if (err.response && err.response.status === 429) {
      return await apiRequest(uri, {
        data,
        token,
        delay: err.response._data.retry_after * 1000,
      });
    }

    return null;
  }
}

/**
 * Fetches and returns a Discord user object.
 * @param userId The user id (use @me for self user)
 * @param config The request config for this request.
 * @returns {Promise<DiscordUser | null>}
 */
function fetchUser(userId: string = '@me', config: RequestConfig = {}): Promise<DiscordUser | null> {
  return apiRequest(`/users/${userId}`, config);
}

/**
 * Fetches and returns the billing country code of the current user.
 * @param config The request config for this request.
 * @returns {Promise<BillingCountryResponse | null>}
 */
function fetchBillingCountry(config: RequestConfig = {}): Promise<BillingCountryResponse | null> {
  return apiRequest('/users/@me/billing/country-code', config);
}

/**
 * Fetches and returns the user profile.
 * @param userId The user id (snowflake)
 * @param config The request config for this request.
 */
function fetchUserProfile(userId: string, config: RequestConfig = {}): Promise<UserProfile | null> {
  return apiRequest(`/users/${userId}/profile?with_mutual_guilds=false`, config);
}

export { fetchUser, fetchBillingCountry, fetchUserProfile, snowflakeToMilliseconds };
