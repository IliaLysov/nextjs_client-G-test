'use client'

import { useEffect } from "react"
import { checkAuth } from "@/modules/auth"
import { useAppDispatch } from "@/hooks/redux"
import { setPending } from "@/modules/auth"
import { setModal } from "@/modules/common"
import { ModalTypeEnum } from "@/types/modal"

export default function Main({
    children,
  }: {
    children: React.ReactNode
  }) {
    const dispatch = useAppDispatch()
    
    dispatch(setPending(true))
    dispatch(setModal({status: true, type: ModalTypeEnum.Loading}))
    useEffect(() => {
      dispatch(checkAuth())
    }, [])

    return <div>{children}</div>
}