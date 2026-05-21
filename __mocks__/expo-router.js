const mockReplace = jest.fn();
const mockPush = jest.fn();
const mockBack = jest.fn();

const useRouter = jest.fn(() => ({
  replace: mockReplace,
  push: mockPush,
  back: mockBack,
}));

module.exports = {
  useRouter,
  useSegments: jest.fn(() => []),
  Slot: ({ children }) => children,
  Redirect: () => null,
  Stack: () => null,
  Link: ({ children }) => children,
  // Exportados para que los tests puedan hacer assertions
  __mockReplace: mockReplace,
  __mockPush: mockPush,
};
