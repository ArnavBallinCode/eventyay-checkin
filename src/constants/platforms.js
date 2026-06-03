export const PLATFORM_OPTIONS = [
  {
    label: 'Eventyay.com',
    url: 'https://eventyay.com'
  },
  {
    label: 'Wikimedia',
    url: 'https://wikimedia.eventyay.com'
  },
  {
    label: 'Testing',
    url: 'https://dev.eventyay.com'
  }
]

export const DEFAULT_PLATFORM = PLATFORM_OPTIONS[0]

export function getPlatformByLabel(label) {
  return PLATFORM_OPTIONS.find((platform) => platform.label === label) || DEFAULT_PLATFORM
}

export function getPlatformApiBaseUrl(label) {
  return `${getPlatformByLabel(label).url}/`
}
