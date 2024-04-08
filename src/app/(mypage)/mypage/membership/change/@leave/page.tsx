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
        <Link href="/mypage/membership/change">맴버십 종료</Link>
      </Breadcrumb>
      <div className="container">
        <h2>맴버십 종료(/mypage/membership/change/@leave)</h2>
      </div>
    </>
  )
}

export default Page
