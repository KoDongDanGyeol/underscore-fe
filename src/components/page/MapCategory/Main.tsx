"use client"

import { useEffect, useState } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import useMap from "@/libs/hook/useMap"
import useSearchCategory from "@/queries/api/map/useSearchCategory"
import { CategoryOptionGroups, TypeCategoryCode } from "@/components/form/SearchCategory/type"
import SearchCategory, { TypeSearchCategory } from "@/components/form/SearchCategory"
import PanelView, { PanelViewSubjectStatusCode } from "@/components/display/PanelView"
import CategoryView from "@/components/display/CategoryView"
import Pagination from "@/components/navigation/Pagination"

export interface MapCategoryMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

interface TypeStructure {
  page: number
  size: number
  category: {
    value: TypeCategoryCode
    text: string
  }
}

const MapCategoryMain = (props: MapCategoryMainProps) => {
  const { className = "", ...restProps } = props

  const [structure, setStructure] = useState<TypeStructure>({
    page: 1,
    size: 10,
    category: CategoryOptionGroups.flatMap(({ options }) => options).find(
      ({ value }) => value === TypeCategoryCode["FD6"],
    )!,
  })

  const {
    mapStructure: { isInitialized, level, bounds },
    onOverlayChanged,
    onOverlayFocus,
    onOverlayBlur,
  } = useMap()

  const searchCategory = useForm<TypeSearchCategory>({
    defaultValues: {
      categoryCode: structure.category.value,
    },
  })

  const { data, isLoading, isPending } = useSearchCategory(structure.page, {
    level,
    categoryCode: structure.category.value,
    rect: isInitialized && bounds ? `${bounds[1]},${bounds[0]},${bounds[3]},${bounds[2]}` : "",
    size: structure.size,
  })

  const onChange = (data: TypeSearchCategory) => {
    setStructure((prev) => ({
      ...prev,
      category: CategoryOptionGroups.flatMap(({ options }) => options).find(
        ({ value }) => value === data.categoryCode,
      )!,
    }))
  }

  const onPaging = (page: number) => {
    setStructure((prev) => ({ ...prev, page }))
  }

  useEffect(() => {
    onOverlayChanged({
      shape: "pin",
      locations: (data?.documents ?? []).map((location) => ({
        id: location.id,
        name: location.place_name,
        coordinates: { latitude: parseFloat(location.y), longitude: parseFloat(location.x) },
      })),
    })
  }, [data?.documents])

  return (
    <MapCategoryMainContainer className={`${className}`} {...restProps}>
      <SearchCategory
        formData={searchCategory}
        formAction={{
          submit: "조회",
        }}
        formPlaceholder={{
          categoryCode: "카테고리 선택",
        }}
        formOptionGroups={{
          categoryCode: CategoryOptionGroups,
        }}
        handleValid={onChange}
      />
      <PanelView.Subject
        status={
          !isInitialized || isLoading
            ? { code: PanelViewSubjectStatusCode.Loading, message: "로딩중" }
            : isPending && !isLoading
              ? { code: PanelViewSubjectStatusCode.Warning, message: "검색범위초과" }
              : { code: PanelViewSubjectStatusCode.Success, message: "" }
        }
        count={data?.meta?.total_count}
      >
        장소
      </PanelView.Subject>
      <MapCategoryMainResult>
        {data && Boolean(data?.documents?.length) && (
          <CategoryView.Group>
            {data?.documents?.map((item) => {
              const options = {
                shape: "pin" as const,
                location: {
                  id: item.id,
                  name: item.place_name,
                  coordinates: { latitude: parseFloat(item.y), longitude: parseFloat(item.x) },
                },
              }
              return (
                <CategoryView.Item
                  key={item.id}
                  data={item}
                  data-target={item.id}
                  tabIndex={0}
                  onFocus={() => onOverlayFocus(options)}
                  onMouseOver={() => onOverlayFocus(options)}
                  onBlur={() => onOverlayBlur(options)}
                  onMouseOut={() => onOverlayBlur(options)}
                />
              )
            })}
          </CategoryView.Group>
        )}
        {data && Boolean(data?.meta?.pageable_count) && (
          <Pagination
            page={structure.page}
            totalPages={Math.ceil(data.meta.pageable_count / structure.size)}
            onPaging={onPaging}
          />
        )}
      </MapCategoryMainResult>
      {data && data.meta.total_count === 0 && (
        <PanelView.Message>
          <strong>
            검색된 <em>{structure.category.text}</em> 정보가 없어요
          </strong>
          <span>지도 위치를 변경하여 주변정보를 확인해보세요</span>
        </PanelView.Message>
      )}
      {data && data.meta.total_count > data.meta.pageable_count && (
        <PanelView.Message>
          <strong>
            장소는 최대 <em>{data.meta.pageable_count}개</em>까지 조회 가능해요
          </strong>
          <span>자세한 정보는 카카오 지도에서 확인해주세요</span>
        </PanelView.Message>
      )}
      {![1, 2, 3].includes(level) && (
        <PanelView.Message>
          <strong>
            검색 범위가 <em>초과</em>되었어요
          </strong>
          <span>지도를 확대하여 확인해보세요</span>
        </PanelView.Message>
      )}
    </MapCategoryMainContainer>
  )
}

const MapCategoryMainResult = styled(CategoryView)`
  nav {
    padding: 16px 0;
    background: rgb(var(--color-neutral100));
    border-top: 1px solid rgb(var(--color-neutral400));
  }
`

const MapCategoryMainContainer = styled.div`
  /*  */
`

export default MapCategoryMain
