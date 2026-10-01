import { SyncStatus } from './syncTypes';

export type BadgeStatus = 'confirmed' | 'queued' | 'failed';

export function toBadgeStatus(status: SyncStatus): BadgeStatus {
  if (status === 'confirmed') return 'confirmed';
  if (status === 'failed' || status === 'cancelled') return 'failed';
  return 'queued';
}
