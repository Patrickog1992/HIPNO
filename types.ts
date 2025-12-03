export interface UserAnswers {
  age: string;
  relationship: string;
  difficulties: string[];
  psychologist: string;
  duration: string;
  pills: string;
  porn: string;
  smoking: string;
  stress: string;
  activity: string;
  desire: string;
  earlyEjaculation: string;
  partnerDisappointment: string;
  feelings: string[];
  goalDuration: string;
  goals: string[];
}

export type StepType = 
  | 'INTRO'
  | 'Q1' | 'Q2' | 'Q3' | 'Q4'
  | 'TESTIMONIAL_1'
  | 'INTERSTITIAL_1'
  | 'Q5' | 'Q6' | 'Q7'
  | 'INTERSTITIAL_2'
  | 'Q8' | 'Q9' | 'Q10'
  | 'INTERSTITIAL_3'
  | 'Q11' | 'Q12' | 'Q13'
  | 'INTERSTITIAL_4'
  | 'Q14' | 'Q15' | 'Q16'
  | 'INTERSTITIAL_5'
  | 'ANALYSIS'
  | 'RESULT_1'
  | 'RESULT_2'
  | 'RESULT_3'
  | 'RESULT_4'
  | 'VIDEO_SAMPLE'
  | 'SALES';