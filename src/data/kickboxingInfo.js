import { Target, Heart, Users, Clock } from 'lucide-react';

const kickboxingFeatures = [
  {
    icon: Target,
    title: 'Techniek & conditie',
    copy: 'Basisstoten, trappen en voetenwerk met coaching op houding, tempo en combinaties.',
  },
  {
    icon: Heart,
    title: 'Voor iedereen',
    copy: 'Beginners en gevorderden krijgen drills op niveau met duidelijke opbouw en coaching.',
  },
  {
    icon: Users,
    title: 'Coaching op techniek',
    copy: 'Trainers sturen bij op pads, bagwork en partnerdrills voor merkbare progressie.',
  },
  {
    icon: Clock,
    title: 'Flexibel rooster',
    copy: 'Avondlessen ma/do en een zondagsblok, flexibel in te plannen.',
  },
];

const kickboxingSchedule = [
  {
    day: 'Maandag',
    sessions: [
      { label: 'Kickboksen', time: '19:00 - 20:00' },
    ],
  },
  {
    day: 'Donderdag',
    sessions: [
      { label: 'Kickboksen', time: '19:00 - 20:00' },
    ],
  },
  {
    day: 'Zondag',
    sessions: [
      { label: 'Kickboksen', time: '11:00 - 12:00' },
    ],
  },
];

const beginnerInfo = {
  title: 'Wat kun je verwachten?',
  subtitle: 'Instappen kan direct; we bouwen tempo en techniek stap voor stap op.',
  points: [
    'Kennismaking met basis stances, stoten en trappen',
    'Opwarming, techniekdrills en conditionele blokken',
    'Sparren veilig en begeleid met duidelijke veiligheidsregels',
    'Train op jouw tempo met coaching en feedback',
    'Handschoenen en beschermers zijn te leen',
  ],
};

export { kickboxingFeatures, kickboxingSchedule, beginnerInfo };
