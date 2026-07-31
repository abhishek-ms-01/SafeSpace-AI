/**
 * SafeSpace AI — Sample Test Data and Scenarios
 * Used for manual testing, QA validation, and mock trials.
 */

export interface TestThreat {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  message: string;
  context: string;
  expectedIndicators: string[];
}

export const SAMPLE_THREATS: TestThreat[] = [
  {
    id: 'threat-low',
    severity: 'low',
    type: 'harassment',
    message: "You're really bad at playing games. Why do you even stream? Just delete your account already, nobody wants to watch you.",
    context: "Sent in twitch chat during a live gaming broadcast.",
    expectedIndicators: ["insults", "discouragement", "account deletion suggestion"]
  },
  {
    id: 'threat-medium',
    severity: 'medium',
    type: 'stalking',
    message: "Hey, I noticed you go to the coffee shop on 5th avenue every Tuesday morning around 8:45 AM. You always order an iced matcha. I was sitting two tables away watching you. You look much better in person than online. See you next Tuesday.",
    context: "Received as an anonymous Instagram direct message.",
    expectedIndicators: ["location tracking", "physical monitoring", "implied future contact"]
  },
  {
    id: 'threat-high',
    severity: 'high',
    type: 'doxxing',
    message: "Think you can block me and get away with it? Let's see how much you like it when everyone knows your real name is Sarah Jenkins, you live at 742 Evergreen Terrace, Springfield, and your phone number is 555-0199. I'm posting this to your work channel tomorrow morning.",
    context: "Received via Twitter/X direct message after blocking an abusive follower.",
    expectedIndicators: ["personal identifier disclosure", "address leakage", "workplace intimidation"]
  },
  {
    id: 'threat-critical',
    severity: 'critical',
    type: 'blackmail',
    message: "I have access to your private photos from your compromised email account. If you do not send $5,000 in Bitcoin to my address (bc1qxy2kg...) within 24 hours, I will send them to all of your Facebook friends and your family members. I am watching your account and will know if you try to contact anyone.",
    context: "Received via an anonymous email address with matching compromised passwords.",
    expectedIndicators: ["financial extortion", "private media threat", "strict timeline"]
  }
];

export const USER_SCENARIOS = [
  {
    name: "Coordinated Brigade / Mobbing",
    description: "Multiple users flooding a creator's comments with matching hashtags and personal attacks to drive them off the platform.",
    steps: [
      "Copy a low-to-medium threat message.",
      "Submit for threat analysis.",
      "Confirm severity score is between 4 and 7.",
      "Initiate chat to explain the coordinated nature of the attack."
    ]
  },
  {
    name: "Emergency Escalation",
    description: "An incident that transitions from general harassment into immediate physical danger or self-harm risk.",
    steps: [
      "Submit the critical blackmail/threat message.",
      "Ensure severity indicator displays 'critical' with red progress bar.",
      "Verify the direct call-to-action buttons for crisis helplines are visible immediately."
    ]
  }
];
