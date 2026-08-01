// ─────────────────────────────────────────────────────────────
// SafeSpace AI — Legal Rights Snippets
//
// A static hardcoded lookup table mapping each ThreatType to a
// 1-2 sentence rights/legal info snippet. No API call — purely
// client-side. Snippets are general awareness only, not legal advice.
// ─────────────────────────────────────────────────────────────

import type { ThreatType } from '../types'

export interface RightsSnippetData {
  headline: string
  detail: string
}

export const RIGHTS_SNIPPETS: Record<ThreatType, RightsSnippetData> = {
  stalking: {
    headline: 'Persistent unwanted contact and surveillance is a criminal offence in most countries.',
    detail:
      'You have the right to apply for a restraining or protective order — contact your local police or a domestic violence charity for help doing so.',
  },
  threats: {
    headline: 'Sending threatening messages is a criminal offence in virtually every jurisdiction.',
    detail:
      'Examples include the Malicious Communications Act (UK) and 18 U.S.C. § 875 (US). Screenshot and preserve every message with timestamps before reporting to police or the platform.',
  },
  blackmail: {
    headline: 'Extortion and blackmail are serious criminal offences — you are never obligated to pay.',
    detail:
      'Payment rarely stops the demands. Report to law enforcement immediately; sharing intimate images without consent is also a specific criminal offence in many regions (e.g. the UK Revenge Porn Helpline).',
  },
  doxxing: {
    headline: 'Publishing someone\'s private information to cause harm may violate computer fraud, privacy, and harassment laws.',
    detail:
      'Document everything and report to the hosting platform and law enforcement — most major platforms have dedicated trust & safety teams for doxxing cases.',
  },
  grooming: {
    headline: 'Grooming of minors is a criminal offence in all jurisdictions.',
    detail:
      'Grooming of adults may also constitute fraud or coercive control. Report to the National Center for Missing & Exploited Children (US) or the Internet Watch Foundation (UK/EU) as appropriate.',
  },
  harassment: {
    headline: 'Sustained online harassment may constitute a criminal offence under harassment, stalking, or malicious communications laws.',
    detail:
      'You have the right to report to both the platform and local police, and to request that harmful content be removed under platform policies.',
  },
  impersonation: {
    headline: 'Creating fake accounts to impersonate someone may violate identity fraud or malicious communications laws.',
    detail:
      'Report the fake account directly to the platform using their impersonation report flow, and consider filing a police report for identity fraud.',
  },
  coordinated_abuse: {
    headline: 'Coordinated harassment campaigns may constitute criminal conspiracy or harassment, regardless of how many individuals are involved.',
    detail:
      'Document the pattern, report to the platform, and consider contacting the Cyber Civil Rights Initiative — they specialise in mass-harassment and coordinated abuse cases.',
  },
  none: {
    headline: 'If something felt wrong, trust your instincts — you have the right to report any online behaviour that makes you feel unsafe.',
    detail:
      'Even if the behaviour does not clearly fit a legal category, organisations like the Cyber Civil Rights Initiative (cybercivilrights.org) offer free, confidential advice.',
  },
}

/**
 * Convenience getter — returns the snippet for the given threat type,
 * falling back to the 'none' entry if the type is unrecognised.
 */
export function getRightsSnippet(threatType: ThreatType): RightsSnippetData {
  return RIGHTS_SNIPPETS[threatType] ?? RIGHTS_SNIPPETS['none']
}
