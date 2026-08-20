import { Suspense } from 'react'

import ChatNeuriyPage from './ChatClient'

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="container max-w-4xl py-16 text-sm text-neutral-500">Loading Neuriy AI chat…</div>
      }
    >
      <ChatNeuriyPage />
    </Suspense>
  )
}
