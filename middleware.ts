import { chain } from '@/middlewares/chain'
import { withAuthMiddleware } from '@/middlewares/middleware1'
import { withI18nMiddleware } from '@/middlewares/middleware2'
import { withIntlMiddleware } from './middlewares/middleware3'
import { withRoleMiddleware } from './middlewares/middleware4'

export default chain([withAuthMiddleware, withRoleMiddleware, withI18nMiddleware, withIntlMiddleware])

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
