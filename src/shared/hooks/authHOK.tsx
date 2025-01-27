import { ComponentType, ReactElement, useEffect } from 'react'

import { useMeQuery } from '@/services/auth/signInApi'
import { useRouter } from 'next/router'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  return (props: P): ReactElement | null => {
    const { isError, isFetching, isLoading } = useMeQuery()
    const router = useRouter()

    useEffect(() => {
      if (!isError) {
        return
      }
      void router.push('/sign-in')
    }, [isError])

    if (isLoading || isFetching) {
      return <div>Loading</div>
    }

    if (isError) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

export default withAuth
