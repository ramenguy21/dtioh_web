export const clinicContact = {
  phoneDisplay: '+92 302 2301918',
  phoneE164: '+923022301918',
  whatsappNumber: '923022301918',
  email: 'hello@dtioh.com',
  locationLabel: 'Malir Cantt, Karachi',
  addressLines: ['Malir Cantt', 'Karachi, Sindh, Pakistan'],
  mapUrl: '',
  hours: ['Mon to Sat: By appointment', 'WhatsApp to confirm timings'],
} as const;

export type ServiceKey =
  | 'prp'
  | 'laser'
  | 'hydrafacial'
  | 'weight-management'
  | 'cupping'
  | 'microneedling'
  | 'mesotherapy'
  | 'botox-fillers';

export interface ClinicService {
  key: ServiceKey;
  title: string;
  shortDescription: string;
  concern: string;
  image: string;
  color: string;
  whatsappMessage: string;
  details: {
    summary: string;
    reasons: string[];
    consultation: string;
    sessions: string;
    downtime: string;
    disclaimer: string;
    priceLabel?: string;
  };
}

export const clinicServices: ClinicService[] = [
  {
    key: 'prp',
    title: 'PRP (Face & Hair)',
    shortDescription:
      "Consultation-led platelet-rich plasma sessions for hair and skin concerns using your body's own growth factors.",
    concern: 'Hair thinning, skin texture, and rejuvenation planning',
    image: '/images/services/prp.webp',
    color: '#66A6AC',
    whatsappMessage:
      "Hi, I'm interested in PRP at Dr. Tasneem's Clinic. Please share consultation details, pricing and available appointments.",
    details: {
      summary:
        'PRP uses a concentrated sample of your own blood to support skin and scalp treatment plans.',
      reasons: ['Hair shedding concerns', 'Skin rejuvenation planning', 'Texture and glow support'],
      consultation:
        'Your consultation covers your concern, whether PRP face or PRP hair is appropriate, timing, and expected treatment planning.',
      sessions:
        'Multiple sessions may be recommended depending on the area treated and your response.',
      downtime:
        'Downtime expectations and aftercare are reviewed during consultation before treatment is scheduled.',
      disclaimer:
        'Suitability, expected response, and risks are assessed individually during consultation.',
      priceLabel: 'PRP Face/Hair: PKR 18,000 per session',
    },
  },
  {
    key: 'laser',
    title: 'Laser Hair Removal',
    shortDescription:
      'Laser hair reduction sessions planned around your skin, hair, and treatment area with clinic guidance.',
    concern: 'Long-term hair reduction for face or body areas',
    image: '/images/services/laser-hair.webp',
    color: '#219169',
    whatsappMessage:
      "Hi, I'm interested in Laser Hair Removal at Dr. Tasneem's Clinic. Please share package details and available appointments.",
    details: {
      summary:
        'Laser hair removal targets hair follicles over a series of visits to reduce unwanted hair growth.',
      reasons: ['Repeated shaving or waxing', 'Ingrown hair concerns', 'Lower-maintenance hair reduction plans'],
      consultation:
        'The consultation reviews your skin and hair profile, treatment areas, timing, and any precautions before starting.',
      sessions:
        'Multiple sessions are commonly required because hair grows in cycles.',
      downtime:
        'You may be advised about sun exposure, shaving, and aftercare based on the area treated.',
      disclaimer:
        'Treatment planning depends on skin tone, hair type, treatment area, and clinical suitability.',
    },
  },
  {
    key: 'hydrafacial',
    title: 'HydraFacial',
    shortDescription:
      'A clinic facial focused on cleansing, exfoliation, and hydration with a plan tailored to your skin goals.',
    concern: 'Dullness, congestion, hydration, and event-prep skincare',
    image: '/images/services/hydra-facial.webp',
    color: '#0C2E3C',
    whatsappMessage:
      "Hi, I'm interested in a HydraFacial at Dr. Tasneem's Clinic. Please share pricing and available appointments.",
    details: {
      summary:
        'HydraFacial combines cleansing, exfoliation, extraction, and hydration in a consultation-led skincare session.',
      reasons: ['Refresh dull-looking skin', 'Prepare for an event', 'Support ongoing skincare maintenance'],
      consultation:
        'Your consultation helps identify your skin concerns, treatment goals, and whether add-ons or a different approach is more suitable.',
      sessions:
        'Some patients book a single session, while others choose repeat sessions as part of ongoing skincare.',
      downtime:
        'Aftercare and timing for makeup, sun exposure, and skincare products are discussed before and after treatment.',
      disclaimer:
        'Skin response varies, so suitability and expected results are discussed during consultation.',
      priceLabel: 'HydraFacial: Starting from PKR 8,000',
    },
  },
  {
    key: 'weight-management',
    title: 'Weight Management',
    shortDescription:
      'Medically supervised weight management consultations focused on sustainable planning and individual goals.',
    concern: 'Structured support for nutrition, habits, and weight-related goals',
    image: '/images/services/weight-loss.webp',
    color: '#219169',
    whatsappMessage:
      "Hi, I'm interested in the medically supervised Weight Management programme. Please share consultation details and available appointments.",
    details: {
      summary:
        'Weight management begins with a consultation to understand your goals, history, and the kind of support that may suit you.',
      reasons: ['Structured accountability', 'Nutrition and lifestyle guidance', 'Support with medically supervised planning'],
      consultation:
        'The consultation reviews your history, objectives, and an appropriate next-step plan tailored to your needs.',
      sessions:
        'Follow-up frequency depends on your personalised plan and progress reviews.',
      downtime:
        'There is no treatment downtime, but your clinician may recommend changes to routine, nutrition, or follow-up cadence.',
      disclaimer:
        'Recommendations depend on your health history and consultation findings.',
      priceLabel: 'Consultation: PKR 2,000',
    },
  },
  {
    key: 'cupping',
    title: 'Cupping Therapy',
    shortDescription:
      'Cupping therapy appointments delivered in a clinical setting after discussing your goals and suitability.',
    concern: 'Wellness support and traditional cupping therapy inquiries',
    image: '/images/services/cupping.webp',
    color: '#66A6AC',
    whatsappMessage:
      "Hi, I'm interested in Cupping Therapy. Please share available appointments.",
    details: {
      summary:
        'Cupping therapy appointments are planned after reviewing your concern, health history, and timing.',
      reasons: ['General wellness support', 'Traditional therapy preference', 'Guided clinical appointment scheduling'],
      consultation:
        'The consultation or pre-booking discussion confirms whether cupping is appropriate and how the session is planned.',
      sessions:
        'Recommended frequency varies depending on your goals and clinician guidance.',
      downtime:
        'Aftercare and expected temporary marks are discussed before the session.',
      disclaimer:
        'Cupping is only offered when appropriate for the individual after review.',
      priceLabel: 'PKR 5,000 per session',
    },
  },
  {
    key: 'microneedling',
    title: 'Microneedling',
    shortDescription:
      'Microneedling plans for texture, acne-scar, and rejuvenation concerns with clinical aftercare guidance.',
    concern: 'Texture, scarring, and collagen-support treatment planning',
    image: '/images/services/microneedling.webp',
    color: '#0C2E3C',
    whatsappMessage:
      "Hi, I'm interested in Microneedling. Please share consultation details and available appointments.",
    details: {
      summary:
        'Microneedling is used in clinic-led treatment plans to support texture, scarring, and rejuvenation concerns.',
      reasons: ['Texture support', 'Acne-scar planning', 'Rejuvenation consultations'],
      consultation:
        'The consultation reviews your skin goals, whether microneedling is suitable, and what aftercare would involve.',
      sessions:
        'A series of sessions may be recommended depending on your goals and skin response.',
      downtime:
        'Temporary redness and aftercare steps are discussed before treatment booking.',
      disclaimer:
        'Skin suitability and recovery expectations are confirmed during consultation.',
      priceLabel: 'PKR 15,000 per session',
    },
  },
  {
    key: 'mesotherapy',
    title: 'Mesotherapy',
    shortDescription:
      'Targeted mesotherapy consultations for face, scalp, or wellness support depending on your treatment plan.',
    concern: 'Targeted skin or scalp treatment planning',
    image: '/images/services/mesotherapy.webp',
    color: '#219169',
    whatsappMessage:
      "Hi, I'm interested in Mesotherapy. Please share consultation details and available appointments.",
    details: {
      summary:
        'Mesotherapy treatment plans are tailored after reviewing the area being treated and the concern being addressed.',
      reasons: ['Skin revitalisation planning', 'Scalp support inquiries', 'Consultation-led targeted treatment'],
      consultation:
        'The consultation covers your concern, treatment area, expected plan, and whether mesotherapy is appropriate.',
      sessions:
        'Session count varies by concern and is discussed as part of treatment planning.',
      downtime:
        'Aftercare and expected short-term effects are reviewed before any appointment is confirmed.',
      disclaimer:
        'Treatment suitability depends on clinical review and individual goals.',
    },
  },
  {
    key: 'botox-fillers',
    title: 'Botox and Fillers',
    shortDescription:
      'Consultation-first injectables appointments for wrinkle-softening or volume concerns where clinically appropriate.',
    concern: 'Expression lines, facial balancing, and volume-restoration consultations',
    image: '/images/services/botox.webp',
    color: '#66A6AC',
    whatsappMessage:
      "Hi, I'm interested in a consultation for Botox or Fillers. Please share available appointments.",
    details: {
      summary:
        'Injectables begin with a consultation to review your goals, suitable options, and what treatment planning may involve.',
      reasons: ['Dynamic wrinkle consultation', 'Volume restoration planning', 'Facial balancing discussions'],
      consultation:
        'Your consultation covers your goals, likely treatment areas, precautions, and whether Botox or fillers are suitable.',
      sessions:
        'Follow-up and maintenance timing depends on the product, area treated, and clinician guidance.',
      downtime:
        'Expected aftercare and activity precautions are reviewed during consultation.',
      disclaimer:
        'Injectables are only recommended after an individual assessment.',
    },
  },
];

export const heroBookingMessage =
  "Hi, I found Dr. Tasneem's Clinic online and would like to book an appointment. Please share the available timings.";

export const bookingSteps = [
  'Message the clinic on WhatsApp.',
  'Discuss your concern and choose an appointment.',
  'Attend a consultation and receive a personalised treatment recommendation.',
] as const;

export const clinicTrustIndicators = [
  'Medically supervised care where applicable',
  'Certified practitioners',
  'Malir Cantt, Karachi clinic location',
] as const;

export const clinicFaqs = [
  {
    question: 'How do I book an appointment?',
    answer:
      'Use the WhatsApp booking buttons on the clinic page or call the clinic directly. The team will confirm timings and the best next step for your concern.',
  },
  {
    question: 'Is a consultation required?',
    answer:
      'Most treatments begin with a consultation so the clinic can review your concern, suitability, and the most appropriate plan before confirming treatment.',
  },
  {
    question: 'How is treatment suitability determined?',
    answer:
      'Suitability is discussed individually during consultation based on your concern, health history, treatment area, and clinician assessment.',
  },
  {
    question: 'How many sessions might I need?',
    answer:
      'Session count depends on the service and your goals. The clinic will explain whether a single session or a series is more appropriate during consultation.',
  },
  {
    question: 'Where is the clinic located?',
    answer:
      "The clinic page currently uses the verified Malir Cantt, Karachi location. If you need directions, contact the clinic team before visiting.",
  },
  {
    question: 'How should I prepare for my appointment?',
    answer:
      'Preparation varies by service. The clinic will share practical instructions on WhatsApp or during your consultation confirmation.',
  },
  {
    question: 'How can I ask about pricing?',
    answer:
      'You can ask about pricing on WhatsApp. Variable or package-based pricing is confirmed after the clinic understands the treatment area and consultation needs.',
  },
] as const;

export function buildWhatsAppUrl(message: string, source: string, service?: ServiceKey) {
  const params = new URLSearchParams({ text: message, source });
  if (service) {
    params.set('service', service);
  }
  return `https://wa.me/${clinicContact.whatsappNumber}?${params.toString()}`;
}
