export const toCamelCase = (str: string): string =>
    str.replace(/[-_][a-zA-Z]/g, (group) => group.slice(-1).toUpperCase());
