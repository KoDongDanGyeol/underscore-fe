import Link from "next/link"
import Breadcrumb from "@/components/navigation/Breadcrumb"

interface PageProps {
  //
}

const Page = (props: PageProps) => {
  // const { } = props

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Link href="/mypage">마이페이지</Link>
        <Link href="/mypage/profile">회원정보</Link>
        <Link href="/mypage/payment/history">결제내역</Link>
      </Breadcrumb>
      <div className="container">
        <h2>결제내역(/mypage/payment/history)</h2>
      </div>
    </>
  )
}

export default Page
