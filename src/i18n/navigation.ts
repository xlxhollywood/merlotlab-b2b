import { createNavigation } from 'next-intl/navigation'

import { routing } from './routing'

// locale을 자동으로 붙여주는 라우팅 API. 내부 이동은 next/link·next/navigation 대신 여기서 import.
export const { Link, redirect, permanentRedirect, usePathname, useRouter, getPathname } =
  createNavigation(routing)
