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
        <Link href="/mypage/checklist">체크리스트</Link>
      </Breadcrumb>
      <div className="container">
        <h2>체크리스트(/mypage/checklist)</h2>
      </div>
    </>
  )
}

export default Page
