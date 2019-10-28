import { Polly } from 'aws-sdk'
export type PollyLanguage = 'de-DE' | 'en-AU' | 'en-CA' | 'en-GB' | 'en-IN' | 'en-US' | 'es-ES' | 'fr-FR' | 'it-IT' | 'ja-JP'
export const supportedLanguages: PollyLanguage[] = [
    'de-DE',
    'en-AU',
    'en-CA',
    'en-GB',
    'en-IN',
    'en-US',
    'es-ES',
    'fr-FR',
    'it-IT',
    'ja-JP'
]

/**
英語、米国（en-US）： Ivy、Joanna、Joey、Justin、Kendra、Kimberly、Matthew、Salli
英語、オーストラリア（en-AU）： Nicole、Russell
英語、イギリス（en-GB）： Amy、Brian、Emma
英語、インド（en-IN）： Aditi、Raveena
ドイツ語（de-DE）： Hans、Marlene、Vicki
スペイン語、カスティリャ（es-es）： Conchita、Enrique
イタリア語（it-IT）： Carla、Giorgio
日本語（ja-JP）： Mizuki、Takumi
フランス語（fr-FR）： Céline、Léa、Mathieu
 */
export const supportedPollyVoiceNames: {
    [lang in PollyLanguage]: Polly.VoiceId[]
} = {
    'ja-JP': ['Mizuki', 'Takumi'],
    'en-US': ['Ivy', 'Joanna', 'Joey', 'Justin', 'Kendra', 'Kimberly', 'Matthew', 'Salli'],
    'en-AU': ['Nicole', 'Russell'],
    'en-CA': ['Ivy', 'Joanna', 'Joey', 'Justin', 'Kendra', 'Kimberly', 'Matthew', 'Salli'], // fallback (en-US)
    'en-GB': ['Amy', 'Brian', 'Emma'],
    'en-IN': ['Aditi', 'Raveena'],
    'de-DE': ['Hans', 'Marlene', 'Vicki'],
    'es-ES': ['Conchita', 'Enrique'],
    'it-IT': ['Carla', 'Giorgio'],
    'fr-FR': ['Mathieu'] // 'Céline', 'Léa'
}

/**
 * get random launguage
 */
export const getRandomLanguage = (): PollyLanguage => {
    const key = Math.floor(Math.random() * supportedLanguages.length)
    return supportedLanguages[key] as PollyLanguage
}

/**
 * get random voice id
 */
export const getRandomSpeaker = (lang: PollyLanguage): string => {
    const speakers = supportedPollyVoiceNames[lang]
    const key = Math.floor(Math.random() * speakers.length)
    return speakers[key]
}

/**
 * Get ssml code by voice
 * @param text
 * @param lang
 */
export const getLangSSML = (text: string, lang: PollyLanguage = getRandomLanguage()): string => {
    const speaker = getRandomSpeaker(lang)
    return `<voice name="${speaker}"><lang xml:lang="${lang}">${text}</lang></voice>`
}

/**
 * Get Polly voice ssml (random voice id)
 * @param text
 */
export const getRandomLangSSML = (text: string): {lang: PollyLanguage; message: string} => {
    const lang = getRandomLanguage()
    return {
        lang,
        message: getLangSSML(text, lang)
    }
}

/**
 *
 * @param code
 * @param lang
 */
export const getLangNameByCode = (code: PollyLanguage, lang: PollyLanguage = 'ja-JP'): string => {
    if (lang === 'ja-JP') {
        if (/^en/.test(code)) return '英語'
        if (/^es/.test(code)) return 'スペイン語'
        if (/^it/.test(code)) return 'イタリア語'
        if (/^fr/.test(code)) return 'フランス語'
        if (/^ja/.test(code)) return '日本語'
        if (/^de/.test(code)) return 'ドイツ語'
        throw new Error(`Unsupported code: ${code}`)
    }
    // @TODO lang support
    throw new Error(`Unsupported locale: ${lang} and locale is ${code}`)
}
