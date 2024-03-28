"use client"

import { useCallback } from "react"
import { RecoilRoot, SetRecoilState } from "recoil"
import { Flag, atomFlag } from "@/stores/flag"

export interface RecoilProviderMainProps extends React.PropsWithChildren {
  flag?: Flag
}

const RecoilProviderMain = (props: RecoilProviderMainProps) => {
  const { flag, children, ...restProps } = props

  const initializeState = useCallback(
    ({ set }: { set: SetRecoilState }) => {
      if (flag) set(atomFlag, flag)
    },
    [flag],
  )

  return (
    <RecoilRoot initializeState={initializeState} {...restProps}>
      {children}
    </RecoilRoot>
  )
}

export default RecoilProviderMain
