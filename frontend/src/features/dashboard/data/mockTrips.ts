import type { Trip } from '../../../types/trip';

const MOCK_TRIPS: Trip[] = [
  {
    id: 'trip-1',
    name: 'Tokyo Adventure',
    destination: 'Tokyo, Japan',
    startDate: '2026-04-15',
    endDate: '2026-04-25',
    status: 'planned',
    coverImages: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&h=300&fit=crop',
    ],
    thumbnailGradient: 'from-rose-500 to-orange-400',
    collaborators: [
      { id: 'user-1', name: 'Alex Chen' },
      { id: 'user-2', name: 'Maria Lopez', avatar: '' },
    ],
    completionPercentage: 75,
  },
  {
    id: 'trip-2',
    name: 'Paris Getaway',
    destination: 'Paris, France',
    startDate: '2026-06-01',
    endDate: '2026-06-08',
    status: 'draft',
    coverImages: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1549144511-f099e773c147?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1431274172761-fca41d930114?w=600&h=300&fit=crop',
    ],
    thumbnailGradient: 'from-blue-500 to-purple-500',
    collaborators: [
      { id: 'user-1', name: 'Alex Chen' },
    ],
    completionPercentage: 30,
  },
  {
    id: 'trip-3',
    name: 'Bali Retreat',
    destination: 'Bali, Indonesia',
    startDate: '2026-08-10',
    endDate: '2026-08-20',
    status: 'planned',
    coverImages: [
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&h=300&fit=crop',
    ],
    thumbnailGradient: 'from-emerald-500 to-teal-400',
    collaborators: [
      { id: 'user-1', name: 'Alex Chen' },
      { id: 'user-3', name: 'Sam Kim' },
      { id: 'user-4', name: 'Jordan Lee' },
    ],
    completionPercentage: 90,
  },
  {
    id: 'trip-4',
    name: 'NYC Weekend',
    destination: 'New York, USA',
    startDate: '2026-03-20',
    endDate: '2026-03-23',
    status: 'in-progress',
    coverImages: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=600&h=300&fit=crop',
      'https://images.unsplash.com/photo-1522083165195-3424ed129620?w=600&h=300&fit=crop',
    ],
    thumbnailGradient: 'from-amber-500 to-red-500',
    collaborators: [
      { id: 'user-1', name: 'Alex Chen' },
      { id: 'user-5', name: 'Taylor Brown' },
    ],
    completionPercentage: 100,
  },
];

export { MOCK_TRIPS };
