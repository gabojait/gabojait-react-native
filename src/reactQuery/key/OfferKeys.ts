import { Position } from '@/data/model/type/Position';

export const offerKeys = {
  offerToTeam: ['offerToTeam'] as const,
  offerToUser: ['offerToUser'] as const,
  cancelOfferToUser: ['cancelOfferToUser'],
  getOffersFromFrontend: 'frontend',
  getOffersFromBackend: 'backend',
  getOffersFromDesigner: 'designer',
  getOffersFromManager: 'manager',
  rejectOfferFromUser: 'rejectOfferFromUser',
  acceptOfferFromUser: 'acceptOfferFromUser',
  decideOfferFromTeam: 'decideOfferFromTeam',
  offersSentToTeam: 'offersSentToTeam',
  getOffersSentToFrontend: 'getOffersSentToFrontend',
  getOffersSentToBackend: 'getOffersSentToBackend',
  getOffersSentToDesigner: 'getOffersSentToDesigner',
  getOffersSentToManager: 'getOffersSentToManager',
};

export const positionToSentOfferKey: { [key in Position]: string } = {
  FRONTEND: 'getOffersSentToFrontend',
  BACKEND: 'getOffersSentToBackend',
  DESIGNER: 'getOffersSentToDesigner',
  MANAGER: 'getOffersSentToManager',
  NONE: 'none',
};
