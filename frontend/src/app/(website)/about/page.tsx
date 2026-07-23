import type { Metadata } from 'next';
import AboutClient from './AboutClient';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Real E Bikes - our mission, vision and commitment to electric mobility.',
};

export default function AboutPage() {
  return <AboutClient />;
}
