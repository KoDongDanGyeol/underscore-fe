"use client"

import { useRecoilState } from "recoil"
import { atomFlag } from "@/stores/flag"
import useMount from "@/libs/hook/useMount"

export interface FlagMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const FlagMain = (props: FlagMainProps) => {
  const { className = "", ...restProps } = props
  const [flag, setFlag] = useRecoilState(atomFlag)
  const { mountStructure } = useMount()

  return (
    <div>
      {mountStructure.isMounted && (
        <section className={`${className}`} {...restProps}>
          <span>Recoil atomFlag: {flag.toString()}</span>
          <button type="button" onClick={() => setFlag((value) => !value)}>
            Toggle
          </button>
        </section>
      )}
    </div>
  )
}

export default FlagMain
