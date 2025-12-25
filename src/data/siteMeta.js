import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { openingHoursInline } from './facilityInfo';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Ladies Only', to: '/ladies-only' },
  { label: 'Kickboksen', to: '/kickboksen' },
  { label: 'Abonnementen', to: '/abonnementen' },
  { label: 'Contact', to: '/contact' },
];

const contactDetails = [
  {
    icon: MapPin,
    title: 'Adres',
    content: 'Houtweg 8, 4104 AB Culemborg',
    showInFooter: true,
  },
  {
    icon: Phone,
    title: 'Telefoon',
    content: '+31 6 46872274',
    href: 'tel:+31646872274',
    showInFooter: true,
  },
  {
    icon: Mail,
    title: 'Email',
    content: 'info@fitcityculemborg.nl',
    href: 'mailto:info@fitcityculemborg.nl',
    showInFooter: true,
  },
  {
    icon: Clock,
    title: 'Openingstijden',
    content: openingHoursInline,
    showInFooter: false,
  },
];

export { navItems, contactDetails };
