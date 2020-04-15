import { navigate } from 'gatsby';
import { directory, redirectIfPathNotExists, getRoutes } from '../dashboard';

jest.mock('gatsby', () => ({
  navigate: jest.fn(),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('helper functions', () => {
  describe('redirectIfPathNotExists', () => {
    it('navigates to /dashboard/home with nonexistent path', () => {
      redirectIfPathNotExists('/dashboard/sldfkjsdf');
      expect(navigate).toBeCalledWith(directory.home.path);
    });
    it('does not navigate if path exists', () => {
      redirectIfPathNotExists(directory.home.path);
      expect(navigate).not.toBeCalled();
    });
  });
  describe('getRoutes', () => {
    const routes = getRoutes(directory);
    it('returns an array', () => {
      expect(Array.isArray(routes)).toBe(true);
    });
    test('each route only returns the necessary props', () => {
      const desiredRoute = {
        path: expect.stringContaining('/'),
        name: expect.stringContaining(''),
        sidebarIcon: expect.stringContaining(''),
      };
      expect(routes[0]).toMatchObject(desiredRoute);
    });
  });
});
