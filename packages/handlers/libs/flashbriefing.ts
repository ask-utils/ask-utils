/**
 * Flashbrieding feed contemts
 * https://developer.amazon.com/docs/flashbriefing/flash-briefing-skill-api-feed-reference.html#details
 */
export interface FlashBriefingContent {
    uid: string;
    updateDate: string;
    titleText: string;
    streamUrl?: string;
    mainText: string;
    redirectionUrl: string;
}
export type FlashBriefings = FlashBriefingContent[]
