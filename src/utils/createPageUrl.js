// src/utils/createPageUrl.js
export function createPageUrl(nameOrPath) {
  if (typeof nameOrPath === "string") {
    if (nameOrPath.startsWith("/")) return nameOrPath;

    // If it's a named route with a query param
    if (nameOrPath.includes("?")) {
      const [page, query] = nameOrPath.split("?");
      switch (page) {
        case "GameDetail":
          return `/GameDetail?${query}`;
        case "SavedCollection":
          return `/SavedCollection?${query}`;
        default:
          return `/?${query}`;
      }
    }

    // Plain route name
    switch (nameOrPath) {
      case "Home":
        return "/";
      case "GameDetail":
        return "/GameDetail";
      case "SavedCollection":
        return "/SavedCollection";
      default:
        return "/";
    }
  }

  return "/";
}
