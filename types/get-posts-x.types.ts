export interface GetPostsXResponse {
  cursor: Cursor;
  result: Result;
}

export interface Cursor {
  bottom: string;
  top: string;
}

export interface Result {
  timeline: Timeline;
}

export interface Timeline {
  instructions: Instruction[];
  metadata: Metadata;
}

export interface Instruction {
  type: string;
  entries?: Entry[];
}

export interface Entry {
  entryId: string;
  sortIndex: string;
  content: Content;
}

export interface Content {
  entryType: string;
  __typename: string;
  itemContent?: ItemContent;
  clientEventInfo?: ClientEventInfo;
  items?: Item[];
  displayType?: string;
  header?: Header;
  footer?: Footer;
  value?: string;
  cursorType?: string;
}

export interface ItemContent {
  itemType: string;
  __typename: string;
  tweet_results: TweetResults;
  tweetDisplayType: string;
}

export interface TweetResults {
  result: Result2;
}

export interface Result2 {
  __typename: string;
  rest_id: string;
  core: Core;
  unmention_data: UnmentionData;
  edit_control: EditControl;
  is_translatable: boolean;
  views: Views;
  source: string;
  grok_analysis_button: boolean;
  legacy: Legacy2;
  quick_promote_eligibility: QuickPromoteEligibility;
  note_tweet?: NoteTweet2;
  card?: Card;
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
  avatar: Avatar;
  core: Core2;
  dm_permissions: DmPermissions;
  follow_request_sent: boolean;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  legacy: Legacy;
  location: Location;
  media_permissions: MediaPermissions;
  parody_commentary_fan_label: string;
  profile_image_shape: string;
  profile_bio: ProfileBio;
  privacy: Privacy;
  relationship_perspectives: RelationshipPerspectives;
  tipjar_settings: TipjarSettings;
  verification: Verification;
  profile_description_language: string;
}

export interface AffiliatesHighlightedLabel {}

export interface Avatar {
  image_url: string;
}

export interface Core2 {
  created_at: string;
  name: string;
  screen_name: string;
}

export interface DmPermissions {
  can_dm: boolean;
}

export interface Legacy {
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
  media_count: number;
  normal_followers_count: number;
  pinned_tweet_ids_str: any[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_interstitial_type: string;
  statuses_count: number;
  translator_type: string;
  url: string;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export interface Entities {
  description: Description;
  url: Url;
}

export interface Description {
  urls: any[];
}

export interface Url {
  urls: Url2[];
}

export interface Url2 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Location {
  location: string;
}

export interface MediaPermissions {
  can_media_tag: boolean;
}

export interface ProfileBio {
  description: string;
}

export interface Privacy {
  protected: boolean;
}

export interface RelationshipPerspectives {
  following: boolean;
}

export interface TipjarSettings {}

export interface Verification {
  verified: boolean;
  verified_type: string;
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

export interface Legacy2 {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: Entities2;
  extended_entities?: ExtendedEntities;
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  is_quote_status: boolean;
  lang: string;
  possibly_sensitive?: boolean;
  possibly_sensitive_editable?: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  user_id_str: string;
  id_str: string;
  retweeted_status_result?: RetweetedStatusResult;
}

export interface Entities2 {
  hashtags: any[];
  media?: Medum[];
  symbols: any[];
  timestamps: any[];
  urls: Url5[];
  user_mentions: UserMention[];
}

export interface Medum {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  type: string;
  url: string;
  ext_media_availability: ExtMediaAvailability;
  features?: Features;
  sizes: Sizes;
  original_info: OriginalInfo;
  media_results: MediaResults;
  additional_media_info?: AdditionalMediaInfo;
  video_info?: VideoInfo;
  source_status_id_str?: string;
  source_user_id_str?: string;
}

export interface ExtMediaAvailability {
  status: string;
}

export interface Features {
  large: Large;
  medium: Medium;
  small: Small;
  orig: Orig;
}

export interface Large {
  faces: Face[];
}

export interface Face {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Medium {
  faces: Face2[];
}

export interface Face2 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Small {
  faces: Face3[];
}

export interface Face3 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Orig {
  faces: Face4[];
}

export interface Face4 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Sizes {
  large: Large2;
  medium: Medium2;
  small: Small2;
  thumb: Thumb;
}

export interface Large2 {
  h: number;
  w: number;
  resize: string;
}

export interface Medium2 {
  h: number;
  w: number;
  resize: string;
}

export interface Small2 {
  h: number;
  w: number;
  resize: string;
}

export interface Thumb {
  h: number;
  w: number;
  resize: string;
}

export interface OriginalInfo {
  height: number;
  width: number;
  focus_rects: FocusRect[];
}

export interface FocusRect {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MediaResults {
  result: Result4;
}

export interface Result4 {
  media_key: string;
}

export interface AdditionalMediaInfo {
  monetizable: boolean;
  source_user?: SourceUser;
}

export interface SourceUser {
  user_results: UserResults2;
}

export interface UserResults2 {
  result: Result5;
}

export interface Result5 {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel2;
  avatar: Avatar2;
  core: Core3;
  dm_permissions: DmPermissions2;
  follow_request_sent: boolean;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  legacy: Legacy3;
  location: Location2;
  media_permissions: MediaPermissions2;
  parody_commentary_fan_label: string;
  profile_image_shape: string;
  profile_bio: ProfileBio2;
  privacy: Privacy2;
  relationship_perspectives: RelationshipPerspectives2;
  tipjar_settings: TipjarSettings2;
  verification: Verification2;
  profile_description_language: string;
}

export interface AffiliatesHighlightedLabel2 {}

export interface Avatar2 {
  image_url: string;
}

export interface Core3 {
  created_at: string;
  name: string;
  screen_name: string;
}

export interface DmPermissions2 {
  can_dm: boolean;
}

export interface Legacy3 {
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities3;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  media_count: number;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_interstitial_type: string;
  statuses_count: number;
  translator_type: string;
  url: string;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export interface Entities3 {
  description: Description2;
  url: Url3;
}

export interface Description2 {
  urls: any[];
}

export interface Url3 {
  urls: Url4[];
}

export interface Url4 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Location2 {
  location: string;
}

export interface MediaPermissions2 {
  can_media_tag: boolean;
}

export interface ProfileBio2 {
  description: string;
}

export interface Privacy2 {
  protected: boolean;
}

export interface RelationshipPerspectives2 {
  following: boolean;
}

export interface TipjarSettings2 {}

export interface Verification2 {
  verified: boolean;
  verified_type: string;
}

export interface VideoInfo {
  aspect_ratio: number[];
  duration_millis: number;
  variants: Variant[];
}

export interface Variant {
  content_type: string;
  url: string;
  bitrate?: number;
}

export interface Url5 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface UserMention {
  id_str: string;
  name: string;
  screen_name: string;
  indices: number[];
}

export interface ExtendedEntities {
  media: Medum2[];
}

export interface Medum2 {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  type: string;
  url: string;
  ext_media_availability: ExtMediaAvailability2;
  features?: Features2;
  sizes: Sizes2;
  original_info: OriginalInfo2;
  media_results: MediaResults2;
  additional_media_info?: AdditionalMediaInfo2;
  video_info?: VideoInfo2;
  source_status_id_str?: string;
  source_user_id_str?: string;
}

export interface ExtMediaAvailability2 {
  status: string;
}

export interface Features2 {
  large: Large3;
  medium: Medium3;
  small: Small3;
  orig: Orig2;
}

export interface Large3 {
  faces: Face5[];
}

export interface Face5 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Medium3 {
  faces: Face6[];
}

export interface Face6 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Small3 {
  faces: Face7[];
}

export interface Face7 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Orig2 {
  faces: Face8[];
}

export interface Face8 {
  x: number;
  y: number;
  h: number;
  w: number;
}

export interface Sizes2 {
  large: Large4;
  medium: Medium4;
  small: Small4;
  thumb: Thumb2;
}

export interface Large4 {
  h: number;
  w: number;
  resize: string;
}

export interface Medium4 {
  h: number;
  w: number;
  resize: string;
}

export interface Small4 {
  h: number;
  w: number;
  resize: string;
}

export interface Thumb2 {
  h: number;
  w: number;
  resize: string;
}

export interface OriginalInfo2 {
  height: number;
  width: number;
  focus_rects: FocusRect2[];
}

export interface FocusRect2 {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MediaResults2 {
  result: Result6;
}

export interface Result6 {
  media_key: string;
}

export interface AdditionalMediaInfo2 {
  monetizable: boolean;
  source_user?: SourceUser2;
}

export interface SourceUser2 {
  user_results: UserResults3;
}

export interface UserResults3 {
  result: Result7;
}

export interface Result7 {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel3;
  avatar: Avatar3;
  core: Core4;
  dm_permissions: DmPermissions3;
  follow_request_sent: boolean;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  legacy: Legacy4;
  location: Location3;
  media_permissions: MediaPermissions3;
  parody_commentary_fan_label: string;
  profile_image_shape: string;
  profile_bio: ProfileBio3;
  privacy: Privacy3;
  relationship_perspectives: RelationshipPerspectives3;
  tipjar_settings: TipjarSettings3;
  verification: Verification3;
  profile_description_language: string;
}

export interface AffiliatesHighlightedLabel3 {}

export interface Avatar3 {
  image_url: string;
}

export interface Core4 {
  created_at: string;
  name: string;
  screen_name: string;
}

export interface DmPermissions3 {
  can_dm: boolean;
}

export interface Legacy4 {
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities4;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  media_count: number;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_interstitial_type: string;
  statuses_count: number;
  translator_type: string;
  url: string;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export interface Entities4 {
  description: Description3;
  url: Url6;
}

export interface Description3 {
  urls: any[];
}

export interface Url6 {
  urls: Url7[];
}

export interface Url7 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Location3 {
  location: string;
}

export interface MediaPermissions3 {
  can_media_tag: boolean;
}

export interface ProfileBio3 {
  description: string;
}

export interface Privacy3 {
  protected: boolean;
}

export interface RelationshipPerspectives3 {
  following: boolean;
}

export interface TipjarSettings3 {}

export interface Verification3 {
  verified: boolean;
  verified_type: string;
}

export interface VideoInfo2 {
  aspect_ratio: number[];
  duration_millis: number;
  variants: Variant2[];
}

export interface Variant2 {
  content_type: string;
  url: string;
  bitrate?: number;
}

export interface RetweetedStatusResult {
  result: Result8;
}

export interface Result8 {
  __typename: string;
  rest_id: string;
  core: Core5;
  unmention_data: UnmentionData2;
  edit_control: EditControl2;
  is_translatable: boolean;
  views: Views2;
  source: string;
  note_tweet: NoteTweet;
  grok_analysis_button: boolean;
  legacy: Legacy6;
}

export interface Core5 {
  user_results: UserResults4;
}

export interface UserResults4 {
  result: Result9;
}

export interface Result9 {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel4;
  avatar: Avatar4;
  core: Core6;
  dm_permissions: DmPermissions4;
  follow_request_sent: boolean;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  legacy: Legacy5;
  location: Location4;
  media_permissions: MediaPermissions4;
  parody_commentary_fan_label: string;
  profile_image_shape: string;
  profile_bio: ProfileBio4;
  privacy: Privacy4;
  relationship_perspectives: RelationshipPerspectives4;
  tipjar_settings: TipjarSettings4;
  verification: Verification4;
}

export interface AffiliatesHighlightedLabel4 {}

export interface Avatar4 {
  image_url: string;
}

export interface Core6 {
  created_at: string;
  name: string;
  screen_name: string;
}

export interface DmPermissions4 {
  can_dm: boolean;
}

export interface Legacy5 {
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities5;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  media_count: number;
  normal_followers_count: number;
  pinned_tweet_ids_str: any[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_interstitial_type: string;
  statuses_count: number;
  translator_type: string;
  url: string;
  want_retweets: boolean;
  withheld_in_countries: any[];
}

export interface Entities5 {
  description: Description4;
  url: Url8;
}

export interface Description4 {
  urls: any[];
}

export interface Url8 {
  urls: Url9[];
}

export interface Url9 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Location4 {
  location: string;
}

export interface MediaPermissions4 {
  can_media_tag: boolean;
}

export interface ProfileBio4 {
  description: string;
}

export interface Privacy4 {
  protected: boolean;
}

export interface RelationshipPerspectives4 {
  following: boolean;
}

export interface TipjarSettings4 {}

export interface Verification4 {
  verified: boolean;
}

export interface UnmentionData2 {}

export interface EditControl2 {
  edit_tweet_ids: string[];
  editable_until_msecs: string;
  is_edit_eligible: boolean;
  edits_remaining: string;
}

export interface Views2 {
  count: string;
  state: string;
}

export interface NoteTweet {
  is_expandable: boolean;
  note_tweet_results: NoteTweetResults;
}

export interface NoteTweetResults {
  result: Result10;
}

export interface Result10 {
  id: string;
  text: string;
  entity_set: EntitySet;
}

export interface EntitySet {
  hashtags: any[];
  symbols: any[];
  urls: Url10[];
  user_mentions: any[];
}

export interface Url10 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Legacy6 {
  bookmark_count: number;
  bookmarked: boolean;
  created_at: string;
  conversation_id_str: string;
  display_text_range: number[];
  entities: Entities6;
  extended_entities: ExtendedEntities2;
  favorite_count: number;
  favorited: boolean;
  full_text: string;
  is_quote_status: boolean;
  lang: string;
  possibly_sensitive: boolean;
  possibly_sensitive_editable: boolean;
  quote_count: number;
  reply_count: number;
  retweet_count: number;
  retweeted: boolean;
  user_id_str: string;
  id_str: string;
}

export interface Entities6 {
  hashtags: any[];
  media: Medum3[];
  symbols: any[];
  timestamps: any[];
  urls: any[];
  user_mentions: any[];
}

export interface Medum3 {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  type: string;
  url: string;
  ext_media_availability: ExtMediaAvailability3;
  features: Features3;
  sizes: Sizes3;
  original_info: OriginalInfo3;
  media_results: MediaResults3;
}

export interface ExtMediaAvailability3 {
  status: string;
}

export interface Features3 {
  all: All;
  large: Large5;
  medium: Medium5;
  small: Small5;
  orig: Orig3;
}

export interface All {
  tags: Tag[];
}

export interface Tag {
  user_id: string;
  name: string;
  screen_name: string;
  type: string;
}

export interface Large5 {
  faces: any[];
}

export interface Medium5 {
  faces: any[];
}

export interface Small5 {
  faces: any[];
}

export interface Orig3 {
  faces: any[];
}

export interface Sizes3 {
  large: Large6;
  medium: Medium6;
  small: Small6;
  thumb: Thumb3;
}

export interface Large6 {
  h: number;
  w: number;
  resize: string;
}

export interface Medium6 {
  h: number;
  w: number;
  resize: string;
}

export interface Small6 {
  h: number;
  w: number;
  resize: string;
}

export interface Thumb3 {
  h: number;
  w: number;
  resize: string;
}

export interface OriginalInfo3 {
  height: number;
  width: number;
  focus_rects: FocusRect3[];
}

export interface FocusRect3 {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MediaResults3 {
  result: Result11;
}

export interface Result11 {
  media_key: string;
}

export interface ExtendedEntities2 {
  media: Medum4[];
}

export interface Medum4 {
  display_url: string;
  expanded_url: string;
  id_str: string;
  indices: number[];
  media_key: string;
  media_url_https: string;
  type: string;
  url: string;
  ext_media_availability: ExtMediaAvailability4;
  features: Features4;
  sizes: Sizes4;
  original_info: OriginalInfo4;
  media_results: MediaResults4;
}

export interface ExtMediaAvailability4 {
  status: string;
}

export interface Features4 {
  all: All2;
  large: Large7;
  medium: Medium7;
  small: Small7;
  orig: Orig4;
}

export interface All2 {
  tags: Tag2[];
}

export interface Tag2 {
  user_id: string;
  name: string;
  screen_name: string;
  type: string;
}

export interface Large7 {
  faces: any[];
}

export interface Medium7 {
  faces: any[];
}

export interface Small7 {
  faces: any[];
}

export interface Orig4 {
  faces: any[];
}

export interface Sizes4 {
  large: Large8;
  medium: Medium8;
  small: Small8;
  thumb: Thumb4;
}

export interface Large8 {
  h: number;
  w: number;
  resize: string;
}

export interface Medium8 {
  h: number;
  w: number;
  resize: string;
}

export interface Small8 {
  h: number;
  w: number;
  resize: string;
}

export interface Thumb4 {
  h: number;
  w: number;
  resize: string;
}

export interface OriginalInfo4 {
  height: number;
  width: number;
  focus_rects: FocusRect4[];
}

export interface FocusRect4 {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface MediaResults4 {
  result: Result12;
}

export interface Result12 {
  media_key: string;
}

export interface QuickPromoteEligibility {
  eligibility: string;
}

export interface NoteTweet2 {
  is_expandable: boolean;
  note_tweet_results: NoteTweetResults2;
}

export interface NoteTweetResults2 {
  result: Result13;
}

export interface Result13 {
  id: string;
  text: string;
  entity_set: EntitySet2;
}

export interface EntitySet2 {
  hashtags: any[];
  symbols: any[];
  urls: Url11[];
  user_mentions: any[];
}

export interface Url11 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Card {
  rest_id: string;
  legacy: Legacy7;
}

export interface Legacy7 {
  binding_values: BindingValue[];
  card_platform: CardPlatform;
  name: string;
  url: string;
  user_refs_results: any[];
}

export interface BindingValue {
  key: string;
  value: Value;
}

export interface Value {
  image_value?: ImageValue;
  type: string;
  string_value?: string;
  scribe_key?: string;
  image_color_value?: ImageColorValue;
}

export interface ImageValue {
  height: number;
  width: number;
  url: string;
}

export interface ImageColorValue {
  palette: Palette[];
}

export interface Palette {
  rgb: Rgb;
  percentage: number;
}

export interface Rgb {
  blue: number;
  green: number;
  red: number;
}

export interface CardPlatform {
  platform: Platform;
}

export interface Platform {
  audience: Audience;
  device: Device;
}

export interface Audience {
  name: string;
}

export interface Device {
  name: string;
  version: string;
}

export interface ClientEventInfo {
  component: string;
  element?: string;
  details: Details;
}

export interface Details {
  timelinesDetails: TimelinesDetails;
}

export interface TimelinesDetails {
  injectionType: string;
  controllerData: string;
  sourceData?: string;
}

export interface Item {
  entryId: string;
  item: Item2;
}

export interface Item2 {
  itemContent: ItemContent2;
  clientEventInfo: ClientEventInfo2;
}

export interface ItemContent2 {
  itemType: string;
  __typename: string;
  user_results: UserResults5;
  userDisplayType: string;
}

export interface UserResults5 {
  result: Result14;
}

export interface Result14 {
  __typename: string;
  id: string;
  rest_id: string;
  affiliates_highlighted_label: AffiliatesHighlightedLabel5;
  avatar: Avatar5;
  core: Core7;
  dm_permissions: DmPermissions5;
  follow_request_sent: boolean;
  has_graduated_access: boolean;
  is_blue_verified: boolean;
  legacy: Legacy8;
  location: Location5;
  media_permissions: MediaPermissions5;
  parody_commentary_fan_label: string;
  profile_image_shape: string;
  professional?: Professional;
  profile_bio: ProfileBio5;
  privacy: Privacy5;
  relationship_perspectives: RelationshipPerspectives5;
  tipjar_settings: TipjarSettings5;
  super_follow_eligible?: boolean;
  verification: Verification5;
  profile_description_language?: string;
}

export interface AffiliatesHighlightedLabel5 {
  label?: Label;
}

export interface Label {
  url: Url12;
  badge: Badge;
  description: string;
  userLabelType: string;
  userLabelDisplayType: string;
}

export interface Url12 {
  url: string;
  urlType: string;
}

export interface Badge {
  url: string;
}

export interface Avatar5 {
  image_url: string;
}

export interface Core7 {
  created_at: string;
  name: string;
  screen_name: string;
}

export interface DmPermissions5 {
  can_dm: boolean;
}

export interface Legacy8 {
  default_profile: boolean;
  default_profile_image: boolean;
  description: string;
  entities: Entities7;
  fast_followers_count: number;
  favourites_count: number;
  followers_count: number;
  friends_count: number;
  has_custom_timelines: boolean;
  is_translator: boolean;
  listed_count: number;
  media_count: number;
  normal_followers_count: number;
  pinned_tweet_ids_str: string[];
  possibly_sensitive: boolean;
  profile_banner_url: string;
  profile_interstitial_type: string;
  statuses_count: number;
  translator_type: string;
  want_retweets: boolean;
  withheld_in_countries: any[];
  url?: string;
}

export interface Entities7 {
  description: Description5;
  url?: Url14;
}

export interface Description5 {
  urls: Url13[];
}

export interface Url13 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Url14 {
  urls: Url15[];
}

export interface Url15 {
  display_url: string;
  expanded_url: string;
  url: string;
  indices: number[];
}

export interface Location5 {
  location: string;
}

export interface MediaPermissions5 {
  can_media_tag: boolean;
}

export interface Professional {
  rest_id: string;
  professional_type: string;
  category: Category[];
}

export interface Category {
  id: number;
  name: string;
  icon_name: string;
}

export interface ProfileBio5 {
  description: string;
}

export interface Privacy5 {
  protected: boolean;
}

export interface RelationshipPerspectives5 {
  following: boolean;
}

export interface TipjarSettings5 {
  is_enabled?: boolean;
}

export interface Verification5 {
  verified: boolean;
  verified_type?: string;
}

export interface ClientEventInfo2 {
  component: string;
  element: string;
  details: Details2;
}

export interface Details2 {
  timelinesDetails: TimelinesDetails2;
}

export interface TimelinesDetails2 {
  injectionType: string;
  controllerData: string;
  sourceData: string;
}

export interface Header {
  displayType: string;
  text: string;
  sticky: boolean;
}

export interface Footer {
  displayType: string;
  text: string;
  landingUrl: LandingUrl;
}

export interface LandingUrl {
  url: string;
  urlType: string;
}

export interface Metadata {
  scribeConfig: ScribeConfig;
}

export interface ScribeConfig {
  page: string;
}
