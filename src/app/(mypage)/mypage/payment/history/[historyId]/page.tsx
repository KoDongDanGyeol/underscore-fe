import Link from "next/link"
import Breadcrumb from "@/components/navigation/Breadcrumb"

interface PageProps {
  params: {
    historyId: string
  }
}

const Page = (props: PageProps) => {
  const { params } = props

  return (
    <>
      <Breadcrumb>
        <Link href="/mypage">마이페이지</Link>
        <Link href="/mypage/profile">회원정보</Link>
        <Link href="/mypage/payment/history">결제내역</Link>
        <Link href={`mypage/payment/history/${params.historyId}`}>{params.historyId}</Link>
      </Breadcrumb>
      <section>
        <h2>결제내역 상세(/mypage/payment/history/{params.historyId})</h2>
      </section>
    </>
  )
}

export default Page
