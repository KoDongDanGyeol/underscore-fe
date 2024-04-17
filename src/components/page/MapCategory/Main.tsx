"use client"

import { useEffect } from "react"
import styled from "styled-components"
import { useForm } from "react-hook-form"
import useMap from "@/libs/hook/useMap"
import { isEquals } from "@/libs/utils"
import useSearchCategory from "@/queries/api/map/useSearchCategory"
import { CategoryOptionGroups, TypeCategoryCode } from "@/components/form/SearchCategory/type"
import SearchCategory, { TypeSearchCategory } from "@/components/form/SearchCategory"
import PanelView, { PanelViewSubjectStatusCode } from "@/components/display/PanelView"
import CategoryView from "@/components/display/CategoryView"
import Pagination from "@/components/navigation/Pagination"
import Button from "@/components/general/Button"
import Icon from "@/components/general/Icon"

export interface MapCategoryMainProps extends React.HTMLAttributes<HTMLDivElement> {
  //
}

const MapCategoryMain = (props: MapCategoryMainProps) => {
  const { className = "", ...restProps } = props

  const {
    mapStructure: { isInitialized, level, bounds },
    onOverlayChanged,
    onOverlayFocus,
    onOverlayBlur,
  } = useMap()

  const searchCategory = useForm<TypeSearchCategory>({
    defaultValues: {
      page: 1,
      size: 10,
      category: "음식점",
      categoryCode: TypeCategoryCode["FD6"],
      searchBounds: [0, 0, 0, 0],
    },
  })

  const { data, isLoading, isFetching, isPending } = useSearchCategory(searchCategory.watch("page"), {
    level,
    categoryCode: searchCategory.watch("categoryCode"),
    searchBounds: searchCategory.watch("searchBounds"),
    size: searchCategory.watch("size"),
  })

  const onPaging = (page: number) => {
    searchCategory.setValue("page", page)
  }

  const onReload = () => {
    searchCategory.setValue("page", 1)
    searchCategory.setValue("searchBounds", bounds)
  }

  const onSubmit = (data: TypeSearchCategory) => {
    searchCategory.setValue("page", 1)
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

  useEffect(() => {
    if (!isInitialized) return
    searchCategory.setValue("searchBounds", bounds)
  }, [isInitialized])

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
        handleValid={onSubmit}
      />
      <PanelView.Subject
        status={
          !isInitialized || isLoading || isFetching
            ? { code: PanelViewSubjectStatusCode.Loading, message: "로딩중" }
            : isPending && !isLoading
              ? { code: PanelViewSubjectStatusCode.Warning, message: "검색범위초과" }
              : { code: PanelViewSubjectStatusCode.Success, message: "" }
        }
        count={data?.meta?.total_count}
        suffixEl={
          !(isPending && !isLoading) &&
          !isEquals([0, 0, 0, 0], searchCategory.watch("searchBounds")) &&
          !isEquals(bounds, searchCategory.watch("searchBounds")) ? (
            <Button type="button" size="sm" variants="secondary" prefixEl={<Icon name="Reload" />} onClick={onReload}>
              현재 지도에서 재검색
            </Button>
          ) : null
        }
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
            page={searchCategory.watch("page")}
            totalPages={Math.ceil(data.meta.pageable_count / searchCategory.watch("size"))}
            onPaging={onPaging}
          />
        )}
      </MapCategoryMainResult>
      {data?.meta && data?.meta?.total_count === 0 && (
        <PanelView.Message>
          <strong>
            검색된 <em>{searchCategory.watch("category")}</em> 정보가 없어요
          </strong>
          <span>지도 위치를 변경하여 주변정보를 확인해보세요</span>
        </PanelView.Message>
      )}
      {data?.meta && (data?.meta?.total_count ?? 0) > (data?.meta?.pageable_count ?? 0) && (
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
