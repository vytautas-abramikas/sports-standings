const flagModules = import.meta.glob("../assets/flags/*.svg", { eager: true });

export const FlagMap: Record<string, string> = {};

for (const path in flagModules) {
  // Extract the filename without extension
  const match = path.match(/\/([^/]+)\.svg$/);
  if (match) {
    const country = match[1];
    // @ts-ignore
    FlagMap[country] = flagModules[path].default;
  }
}
