export const matchesRoute = (pathname: string, bases: string[]): boolean => {
  return bases.some(
    (base) => pathname === base || pathname.startsWith(base + "/")
  );
};
