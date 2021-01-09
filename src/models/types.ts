export interface ILaunch {
    flight_number: number;
    mission_name: string;
    mission_id: any[];
    upcoming: boolean;
    launch_year: string;
    launch_date_unix: number;
    launch_date_utc: string;
    launch_date_local: string;
    is_tentative: boolean;
    tentative_max_precision: string;
    tbd: boolean;
    launch_window: number;
    rocket: Rocket;
    ships: any[];
    telemetry: any;
    launch_site: LaunchSite;
    launch_success: boolean;
    launch_failure_details?: LaunchFailureDetails;
    links: Links;
    details: string;
    static_fire_date_utc: string;
    static_fire_date_unix: number;
    timeline: any;
    crew: null;
  }
  
  export interface LaunchFailureDetails {
    time: number;
    altitude: null;
    reason: string;
  }
  
  export interface LaunchSite {
    site_id: string;
    site_name: string;
    site_name_long: string;
  }
  
  export interface Links {
    mission_patch: string;
    mission_patch_small: string;
    reddit_campaign: any;
    reddit_launch: any;
    reddit_recovery: any;
    reddit_media: any;
    presskit: any;
    article_link: string;
    wikipedia: string;
    video_link: string;
    youtube_id: string;
    flickr_images: any[];
  }
  
  export interface Rocket {
    rocket_id: string;
    rocket_name: string;
    rocket_type: string;
    first_stage: any;
    second_stage: any;
    fairings: any;
  }
  
  