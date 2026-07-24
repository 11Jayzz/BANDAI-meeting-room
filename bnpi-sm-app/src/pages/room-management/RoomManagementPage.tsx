import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Spinner } from '@/components/atoms/Spinner';
import { Text } from '@/components/atoms/Text';
import { PageHeader } from '@/components/organisms/PageHeader';
import { AppShellLayout } from '@/components/templates/AppShellLayout';
import { apiClient, ApiError } from '@/lib/apiClient';
import { cn } from '@/lib/cn';
import type { Room } from '@/types/bdss';

/** Read-only in Phase 1 — create/edit/delete land in Phase 2. */
export function RoomManagementPage() {
  const { t } = useTranslation(['roomManagement', 'common']);
  const [rooms, setRooms] = useState<Room[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const roomList = await apiClient.get<Room[]>('/rooms');
        if (!cancelled) setRooms(roomList);
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : t('common:errorGeneric'));
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [t]);

  return (
    <AppShellLayout>
      <div data-testid="room-management-page" className="flex flex-col gap-6">
        <PageHeader title={t('roomManagement:title')} description={t('roomManagement:subtitle')} />

        <Text tone="muted" data-testid="room-management-crud-notice">
          {t('roomManagement:crudComingSoon')}
        </Text>

        {error ? (
          <Text tone="danger" role="alert">
            {error}
          </Text>
        ) : rooms === null ? (
          <div className="flex justify-center py-12">
            <Spinner size="lg" label={t('common:loading')} />
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[480px] border-collapse text-sm" data-testid="room-management-table">
                <thead>
                  <tr className="border-b border-border text-left text-xs font-medium uppercase tracking-wide text-text-muted">
                    <th className="px-5 py-3">{t('roomManagement:columnName')}</th>
                    <th className="px-5 py-3">{t('roomManagement:columnType')}</th>
                    <th className="px-5 py-3">{t('roomManagement:columnStatus')}</th>
                    <th className="px-5 py-3">{t('roomManagement:columnCurrent')}</th>
                  </tr>
                </thead>
                <tbody>
                  {rooms.map((room) => (
                    <tr
                      key={room.id}
                      className="border-b border-border last:border-0 hover:bg-surface-muted"
                      data-testid={`room-management-row-${room.id}`}
                    >
                      <td className="px-5 py-3 font-medium">{room.name}</td>
                      <td className="px-5 py-3 capitalize text-text-muted">{room.type}</td>
                      <td className="px-5 py-3 text-text-muted">
                        {room.isActive ? t('roomManagement:active') : t('roomManagement:inactive')}
                      </td>
                      <td className="px-5 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
                            room.currentStatus === 'occupied'
                              ? 'bg-danger-muted text-danger'
                              : 'bg-green-100 text-success',
                          )}
                        >
                          <span
                            className={cn(
                              'h-1.5 w-1.5 rounded-full',
                              room.currentStatus === 'occupied' ? 'bg-danger' : 'bg-success',
                            )}
                          />
                          {room.currentStatus === 'occupied'
                            ? t('roomManagement:occupied')
                            : t('roomManagement:vacant')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AppShellLayout>
  );
}
