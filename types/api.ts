export interface PriceChangePercentage24h {
    [key: string]: number;
}

export interface ICoinData {
    price: number;
    price_btc: string;
    price_change_percentage_24h: PriceChangePercentage24h;
    market_cap: string;
    market_cap_btc: string;
    total_volume: string;
    total_volume_btc: string;
    sparkline: string;
    content: {
        title?: string;
        description?: string;
    } | null;
}

export interface ICoinItem {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: ICoinData;
}

export interface TrendingCoinsResponse {
    coins: Array<{
        item: ICoinItem;
    }>;
}


export interface CoinDescription {
    en: string;
  }
  
  export interface CoinLinks {
    homepage: string[];
    blockchain_site: string[];
    official_forum_url: string[];
    chat_url: string[];
    announcement_url: string[];
    twitter_screen_name: string;
    facebook_username: string;
    subreddit_url: string;
    repos_url: {
      github: string[];
      bitbucket: string[];
    };
  }
  
  export interface ICoinData {
    id: string;
    symbol: string;
    name: string;
    description: CoinDescription;
    links: CoinLinks;
  } 


export type PriceDataPoint = [number, number];
export type PriceData = PriceDataPoint[];
export  interface TransformedPriceData {
    timestamp: number;
    price: number;
}

export interface CoinDetails {
  id: string;
  symbol: string;
  name: string;
  description: {
    [key: string]: string;
  };
  image: {
    thumb: string;
    small: string;
    large: string;
  };
  market_data: {
    current_price: {
      [key: string]: number;
    };
    price_change_percentage_24h: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
  };
  categories: string[];
  block_time_in_minutes: number | null;
  hashing_algorithm: string | null;
  genesis_date: string | null;
  community_data: {
    twitter_followers: number;
    reddit_subscribers: number;
    telegram_channel_user_count: number;
  };
}