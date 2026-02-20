import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  route('api/auth/*', 'routes/auth.ts'),
  layout('layouts/auth-layout.tsx', [route('login', 'routes/login.tsx'), route('register', 'routes/register.tsx')]),
  layout('layouts/app-layout.tsx', [index('routes/home.tsx'), route('profile', 'routes/profile.tsx')]),
  route('logout', 'routes/logout.tsx')
] satisfies RouteConfig;
