const openingHours = [
  { day: 'Ma - Vr', time: '08:30 - 22:00' },
  { day: 'Za', time: '09:00 - 16:00' },
  { day: 'Zo', time: '09:30 - 16:00' },
];

const openingHoursInline = openingHours.map(({ day, time }) => `${day} ${time}`).join(' | ');

// Holiday hours with full date for automatic filtering
const holidayHoursData = [
  { day: '24 dec', status: '08:30 - 17:00', date: '2025-12-24' },
  { day: '25 dec', status: '09:00 - 14:00', date: '2025-12-25' },
  { day: '26 dec', status: '09:00 - 14:00', date: '2025-12-26' },
  { day: '31 dec', status: '09:00 - 15:00', date: '2025-12-31' },
  { day: '1 jan', status: '10:00 - 14:00', date: '2026-01-01' },
];

// Filter out dates that have already passed
const getActiveHolidayHours = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

  return holidayHoursData.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= today;
  });
};

const holidayHours = getActiveHolidayHours();

const heroStats = [
  { value: '4.6/5', label: 'Rating' },
  { value: 'Gratis', label: 'Parkeren' },
  { value: 'Ladies', label: 'Only zone' },
];

const heroMedia = {
  background: {
    webp: '',
    jpg: '/banner_v3.png',
    alt: '',
  },
  video: {
    src: '/Fitcity%20Culemborg.mp4',
  },
};

export {
  openingHours,
  openingHoursInline,
  holidayHours,
  heroStats,
  heroMedia,
};
