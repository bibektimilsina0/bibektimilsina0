interface NepalReliefBanner {
  version: string;
  element: HTMLElement;
  remove: () => void;
  reset: () => void;
}

interface Window {
  NepalReliefBanner?: NepalReliefBanner;
  __nepalReliefBannerClaimed?: boolean;
}
