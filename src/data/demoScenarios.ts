// ─────────────────────────────────────────────────────────────
// SafeSpace AI — Demo Scenarios
//
// Realistic-but-clearly-fictional example messages for each
// threat category. Used by DemoModeSelector to pre-populate
// the MessageInput without making any API calls on selection.
//
// All names, usernames, and contact details are entirely made up.
// ─────────────────────────────────────────────────────────────

export interface DemoScenario {
  id: string
  label: string
  category: 'stalking' | 'blackmail' | 'doxxing'
  /** Pre-fills the single-message input */
  messageText: string
}

export const DEMO_SCENARIOS: DemoScenario[] = [
  // ── 1. Stalking ──────────────────────────────────────────
  {
    id: 'demo-stalking',
    label: 'Stalking scenario',
    category: 'stalking',
    messageText: `I know you blocked me everywhere but that won't stop me. I was outside your apartment building on Maple Street again last night — I saw the light in your window go off at 11:47 PM. I followed you to that coffee shop on Tuesday too, the one near your office. You smiled at that guy behind the counter. Did you think I wouldn't notice? I'm always watching. You belong with me. All I'm asking is that you talk to me. If you keep ignoring me I'll have no choice but to keep showing up. You can't avoid me forever. I know your morning routine, your gym schedule, when your roommate leaves. I'm not going to hurt you, I just need you to understand that we're meant to be together. Check your mailbox — I left something for you again. I'll be nearby.`,
  },

  // ── 2. Blackmail ─────────────────────────────────────────
  {
    id: 'demo-blackmail',
    label: 'Blackmail scenario',
    category: 'blackmail',
    messageText: `You should know that I have copies of every photo and video you sent me, including the ones you told me to delete. I also have the screenshots of our private conversations from last year. Here's what's going to happen: you're going to send £800 in gift cards (Google Play or Amazon) to the email address below within 48 hours. If you don't, I will be forwarding everything to your employer at Hartfield & Associates, your LinkedIn contacts, and I will be creating posts tagging your family members on Facebook and Instagram. I have your sister's profile saved. I have your mother's. Don't test me. Once payment is confirmed I will permanently delete everything and you'll never hear from me again. This is a one-time offer. The clock started the moment you read this. If you go to the police I have a dead-man's switch — a friend who will publish everything automatically. Don't make this worse than it needs to be.`,
  },

  // ── 3. Doxxing ───────────────────────────────────────────
  {
    id: 'demo-doxxing',
    label: 'Doxxing scenario',
    category: 'doxxing',
    messageText: `Enjoy your privacy while it lasts. I've already compiled a full file on you: your home address is 14 Birchwood Close, Coventry CV3 2JX (confirmed via electoral roll lookup). Your employer is NovaBridge Tech on Friar Street and your direct manager is called David Osei — I found his LinkedIn. Your car is a silver Vauxhall Astra, registration ending in 4TZR. Your mum still lives in Nuneaton doesn't she? Nice neighbourhood. I've posted a thread about you on three forums already with your photo from your old public Instagram account. Unless you delete your posts calling out @r3a1_h4t3r and issue a public apology by Friday midnight, I'm going to post your full dox including phone number and daily schedule on every sub I can find. Your colleagues, your family, your neighbours — all of them will know exactly who you are and what you supposedly did. You have 72 hours.`,
  },
]
