import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('/print', 'routes/print/main.tsx'),
] satisfies RouteConfig;
