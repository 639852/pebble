import firstMedia from '@/assets/images/media_slider-1.jpg'
import secondMedia from '@/assets/videos/media_slider-2.mp4'
import thirdMedia from '@/assets/videos/media_slider-3.mp4'
import fouthMedia from '@/assets/videos/media_slider-4.mp4'
import fifthMedia from '@/assets/videos/media_slider-5.mp4'
import sixthMedia from '@/assets/videos/media_slider-6.mp4'
import seventhMedia from '@/assets/videos/media_slider-7.mp4'

export const data = [
  {
    type: 'image' as const,
    src: firstMedia,
    title: '100% Electric',
    text: 'No more fossil fuels, buzzing generators, and propane tanks. Pebble has power for days.',
  },
  {
    type: 'video' as const,
    src: secondMedia,
    title: 'Magic Hitch',
    text: 'With one touch, the Pebble Flow senses, self-positions, and safely attaches to your tow vehicle.',
  },
  {
    type: 'video' as const,
    src: thirdMedia,
    title: 'Easy Tow',
    text: 'Introducing the world’s first dual-motor active towing system. Easy Tow improves fuel efficiency while delivering unwavering confidence whether braking or climbing mountain passes. Discover effortless towing.',
  },
  {
    type: 'video' as const,
    src: fouthMedia,
    title: 'Remote Control',
    text: 'Never back up again. Once unhitched, the Pebble Flow is fully remote-controllable. Move around a campsite or driveway via the Pebble App, pivoting effortlessly, and positioning into tight spots with ease.',
  },
  {
    type: 'video' as const,
    src: fifthMedia,
    title: 'InstaCamp',
    text: 'Skip the setup. With one tap, your Pebble Flow automatically deploys the levelers, stabilizers, and stairs — so you spend less time setting up and more time doing what you came for.',
  },
  {
    type: 'video' as const,
    src: sixthMedia,
    title: 'Open & Airy Living',
    text: 'Panoramic windows give way to a 270° view. Convertible furniture, clever storage compartments, and minimalist, modern interior give you everything you need and the flexibility to make it your own.',
    buttonText: 'Interiors'
  },
  {
    type: 'video' as const,
    src: seventhMedia,
    title: 'No manual required',
    text: 'The Pebble App is the remote control for your Pebble Flow. No manual required to get started.',
    buttonText: 'App'
  },
]

export const button = { text: 'Explore the pebble flow', href: 'https://pebblelife.com/pebble-flow' }
