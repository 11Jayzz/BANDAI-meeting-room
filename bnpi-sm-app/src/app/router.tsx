import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from '@/app/auth/ProtectedRoute';
import { ROUTES } from '@/config/routes.config';
import { HomePage } from '@/pages/home';
// FEATURE_ROUTER_IMPORTS_START
// (auto-managed by feature:new … page — do not remove markers)
// FEATURE_BLOCK_START:router-import:login
import { LoginPage } from '@/pages/login';
// FEATURE_BLOCK_END:router-import:login
// FEATURE_BLOCK_START:router-import:calendar
import { CalendarPage } from '@/pages/calendar';
// FEATURE_BLOCK_END:router-import:calendar
// FEATURE_BLOCK_START:router-import:public-calendar
import { PublicCalendarPage } from '@/pages/public-calendar';
// FEATURE_BLOCK_END:router-import:public-calendar
// FEATURE_BLOCK_START:router-import:schedule
import { SchedulePage } from '@/pages/schedule';
// FEATURE_BLOCK_END:router-import:schedule
// FEATURE_BLOCK_START:router-import:dashboard
import { DashboardPage } from '@/pages/dashboard';
// FEATURE_BLOCK_END:router-import:dashboard
// FEATURE_BLOCK_START:router-import:profile
import { ProfilePage } from '@/pages/profile';
// FEATURE_BLOCK_END:router-import:profile
// FEATURE_BLOCK_START:router-import:reports
import { ReportsPage } from '@/pages/reports';
// FEATURE_BLOCK_END:router-import:reports
// FEATURE_BLOCK_START:router-import:room-management
import { RoomManagementPage } from '@/pages/room-management';
// FEATURE_BLOCK_END:router-import:room-management
// FEATURE_ROUTER_IMPORTS_END

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        {/* FEATURE_ROUTER_ROUTES_START */}
        {/* (auto-managed by feature:new … page — do not remove markers) */}
{/* FEATURE_BLOCK_START:router-route:login */}
        <Route path={ROUTES.login} element={<LoginPage />} />
{/* FEATURE_BLOCK_END:router-route:login */}
{/* FEATURE_BLOCK_START:router-route:calendar */}
        <Route
          path={ROUTES.calendar}
          element={
            <ProtectedRoute roles={['admin', 'front_desk']}>
              <CalendarPage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:calendar */}
{/* FEATURE_BLOCK_START:router-route:public-calendar */}
        <Route path={ROUTES.publicCalendar} element={<PublicCalendarPage />} />
{/* FEATURE_BLOCK_END:router-route:public-calendar */}
{/* FEATURE_BLOCK_START:router-route:schedule */}
        <Route
          path={ROUTES.schedule}
          element={
            <ProtectedRoute roles={['admin', 'front_desk']}>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:schedule */}
{/* FEATURE_BLOCK_START:router-route:dashboard */}
        <Route
          path={ROUTES.dashboard}
          element={
            <ProtectedRoute roles={['admin', 'front_desk']}>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:dashboard */}
{/* FEATURE_BLOCK_START:router-route:profile */}
        <Route
          path={ROUTES.profile}
          element={
            <ProtectedRoute roles={['admin', 'front_desk']}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:profile */}
{/* FEATURE_BLOCK_START:router-route:reports */}
        <Route
          path={ROUTES.reports}
          element={
            <ProtectedRoute roles={['admin', 'front_desk']}>
              <ReportsPage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:reports */}
{/* FEATURE_BLOCK_START:router-route:room-management */}
        <Route
          path={ROUTES.roomManagement}
          element={
            <ProtectedRoute roles={['admin']}>
              <RoomManagementPage />
            </ProtectedRoute>
          }
        />
{/* FEATURE_BLOCK_END:router-route:room-management */}
        {/* FEATURE_ROUTER_ROUTES_END */}
        <Route path="*" element={<Navigate to={ROUTES.home} replace />} />
      </Routes>
    </BrowserRouter>
  );
}
