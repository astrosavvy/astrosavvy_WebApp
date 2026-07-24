export const trackPageView = () => {
  if (!window.fbq) return;
  window.fbq('track', 'PageView');
};
