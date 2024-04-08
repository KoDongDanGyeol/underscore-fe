import Link from "next/link"
import Breadcrumb from "@/components/navigation/Breadcrumb"

interface PageProps {
  params: {
    checklistId: string
  }
}

const Page = (props: PageProps) => {
  const { params } = props

  return (
    <>
      <Breadcrumb className="breadcrumb">
        <Link href="/mypage">마이페이지</Link>
        <Link href="/mypage/checklist">체크리스트</Link>
        <Link href={`/mypage/checklist/${params.checklistId}`}>{params.checklistId}</Link>
        <Link href={`/mypage/checklist/${params.checklistId}/edit`}>수정</Link>
      </Breadcrumb>
      <div className="container">
        <h2>체크리스트 수정(/mypage/checklist/{params.checklistId}/edit)</h2>
      </div>
    </>
  )
}

export default Page
