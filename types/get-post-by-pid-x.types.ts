export interface GetPostByPidXResponse {
  result: Result;
}

export interface Result {
  tweetResult: TweetResult;
}

export interface TweetResult {
  result: Result2;
}

export interface Result2 {
  __typename: string;
  rest_id: string;
  has_birdwatch_notes: boolean;
  core: Core;
  unmention_data: UnmentionData;
  edit_control: EditControl;
  is_translatable: boolean;
  views: Views;
  source: string;
  note_tweet: NoteTweet;
  grok_analysis_button: boolean;
  legacy: Legacy2;
}

export interface Core {
  user_results: UserResults;
}

export interface UserResults {
  result: Result3;
}

export interface Result3 {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel;
  has_graduated_access: boolean;
  parody_commentary_fan_label: string;
  is_blue_verified: boolean;
  profile_image_shape: string;
  legacy: Legacy;
  professional: Professional;
  tipjar_settings: TipjarSettings;
  super_follow_eligible: boolean;
  verification_info: VerificationInfo;
}

export interface VerificationInfo {
  is_identity_verified: boolean
  reason: Reason
}

export interface Reason {
  description: Description2
  verified_since_msec: string
}

export interface Description2 {
  text: string
  entities: Entity[]
}

export interface Entity {
  from_index: number
  to_index: number
  ref: Ref
}

export interface Ref {
  url: string
  url_type: string
}

export interface AffiliatesHighlightedLabel {
  label: Label;
}

export interface Label {
  url: Url;
  badge: Badge;
  description: string;
  userLabelType: string;
  userLabelDisplayType: string;
}

export interface Url {
  url: string;
  urlType: string;
}

export interface Badge {
  url: string;
}

export interface Legacy {
  following: boolean;
  can_dm: boolean;
  can_media_tag: boolean;
  created_at: string;
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  location: string;
  media_count: number;
  name: string;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_image_url_https: string;
  profile_interstitial_type: string;
  screen_name: string;
  statuses_count: number;
  translator_type: string;
  verified: boolean;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export interface Entities {
  description: Description;
}

export interface Description {
  urls: any[];
}

export interface Professional {
  rest_id: string;
  professional_type: string;
  category: any[];
}

export interface TipjarSettings {
  is_enabled: boolean;
}

export interface UnmentionData {}

export interface EditControl {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

export interface Views {
  count: string;
  state: string;
}

export interface NoteTweet {
  is_expandable: boolean;
  note_tweet_results: NoteTweetResults;
}

export interface NoteTweetResults {
  result: Result4;
}

export interface Result4 {
  id: string;
  text: string;
  entity_set: EntitySet;
}

export interface EntitySet {
  hashtags: any[];
  symbols: any[];
  urls: any[];
  user_mentions: any[];
}

export interface Legacy2 {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: Entities2;
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  is_quote_status: boolean;
  lang: string;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  user_id_str: string;
  id_str: string;
}

export interface Entities2 {
  hashtags: any[];
  symbols: any[];
  timestamps: any[];
  urls: any[];
  user_mentions: any[];
}
