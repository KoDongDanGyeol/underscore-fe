"use client"

import { useRef, useState, useEffect } from "react"
import styled, { css } from "styled-components"
import { useController, Control, FieldValues, FieldPath, RegisterOptions } from "react-hook-form"
import useFocusTrap from "@/libs/hook/useFocusTrap"
import { SelectShape } from "@/components/entry/Select/type"
import SelectGroup from "@/components/entry/Select/Group"
import SelectLabel from "@/components/entry/Select/Label"
import SelectItem from "@/components/entry/Select/Item"
import Icon from "@/components/general/Icon"

export interface SelectMainProps<T extends FieldValues = object> extends React.HTMLAttributes<HTMLSelectElement> {
  control: Control<T>
  rules?: RegisterOptions<T>
  name: FieldPath<T>
  placeholder?: string
  disabled?: boolean
  multiple?: boolean
  shape?: SelectShape
  optionGroups: {
    label: string
    options: { value: T[FieldPath<T>]; text: string }[]
  }[]
  onChange?: () => void
}

interface TypeStructure<T extends FieldValues = object> {
  isExpanded: boolean
  currentValue: T[FieldPath<T>] | T[FieldPath<T>][]
}

const SelectMain = <T extends FieldValues = object>(props: SelectMainProps<T>) => {
  const {
    control,
    rules,
    name,
    placeholder,
    disabled = false,
    multiple = false,
    shape = SelectShape.Square,
    optionGroups,
    className = "",
    onChange,
    ...restProps
  } = props

  const { field, fieldState } = useController({ control, name, rules })

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [structure, setStructure] = useState<TypeStructure<T>>({
    isExpanded: false,
    currentValue: field.value,
  })

  const {
    focusTrapRefs: { containerRef: trapRef },
    onActivate,
    onDeactivate,
  } = useFocusTrap([
    [
      "Escape",
      () => {
        if (!containerRef.current) return
        const comboboxEl = containerRef.current.querySelector("[role='combobox']") as HTMLElement
        comboboxEl?.focus?.()
      },
    ],
  ])

  const onOpen = () => {
    if (!containerRef.current) return
    const listboxEl = containerRef.current.querySelector("[role='listbox']") as HTMLElement
    onActivate()
    listboxEl?.focus?.()
  }

  const onClose = () => {
    onDeactivate()
  }

  const onBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    if (containerRef.current.contains(event.relatedTarget)) return
    onDeactivate({ isReturnFocus: false })
    setStructure((prev) => ({ ...prev, isExpanded: false }))
  }

  useEffect(() => {
    if (JSON.stringify(field.value) === JSON.stringify(structure.currentValue)) return
    setStructure((prev) => ({ ...prev, currentValue: field.value }))
    onChange?.()
  }, [field.value])

  useEffect(() => {
    if (structure.isExpanded) onOpen()
    else onClose()
  }, [structure.isExpanded])

  if (!optionGroups?.flatMap(({ options }) => options)?.length) {
    return null
  }

  return (
    <SelectMainContainer
      ref={containerRef}
      onBlur={onBlur}
      className={`${className}`}
      $shape={shape}
      $isDisabled={disabled}
      $isInvalid={Boolean(fieldState.error)}
      $isExpanded={structure.isExpanded}
      $isSelected={
        multiple && Array.isArray(structure.currentValue) ? !!structure.currentValue.length : !!structure.currentValue
      }
    >
      <SelectMainCombobox
        ref={field.ref}
        role="combobox"
        type="button"
        disabled={disabled}
        onClick={() => setStructure((prev) => ({ ...prev, isExpanded: !structure.isExpanded }))}
        aria-expanded={structure.isExpanded}
        aria-controls={`${name}-listbox`}
        aria-labelledby={`${name}-label`}
        aria-haspopup="listbox"
      >
        <span>
          {optionGroups?.flatMap(({ options }) => options)?.find(({ value }) => value === structure.currentValue)
            ?.text ?? placeholder}
        </span>
        <Icon name="CaretDown" aria-hidden={true} />
      </SelectMainCombobox>
      <SelectMainLayer ref={trapRef}>
        <div
          role="listbox"
          id={`${name}-listbox`}
          tabIndex={structure.isExpanded ? 0 : -1}
          aria-labelledby={`${name}-label`}
        >
          <div role="presentation">
            {optionGroups.map(({ label, options }, index) => (
              <SelectGroup role="group" key={`${name}-${index}-label`} aria-labelledby={`${name}-${index}-lebel`}>
                <SelectLabel id={`${name}-${index}-label`} className={`${optionGroups.length <= 1 ? "sr-only" : ""}`}>
                  {label}
                </SelectLabel>
                {options.map(({ value, text }) => (
                  <SelectItem
                    key={value}
                    role="option"
                    tabIndex={structure.isExpanded ? undefined : -1}
                    onClick={() => {
                      if (multiple && Array.isArray(structure.currentValue)) {
                        const newValue = [...structure.currentValue].includes(value)
                          ? [...structure.currentValue].filter((v: string) => v !== value)
                          : [...structure.currentValue, value]
                        field.onChange(newValue)
                        onChange?.()
                        setStructure((prev) => ({ ...prev, currentValue: newValue as T[FieldPath<T>][] }))
                        return
                      }
                      field.onChange(value)
                      setStructure((prev) => ({ ...prev, currentValue: value }))
                      onChange?.()
                      setStructure((prev) => ({ ...prev, isExpanded: false }))
                    }}
                    aria-selected={
                      multiple && Array.isArray(structure.currentValue)
                        ? [...structure.currentValue].includes(value)
                        : value === structure.currentValue
                    }
                  >
                    {text}
                  </SelectItem>
                ))}
              </SelectGroup>
            ))}
          </div>
        </div>
      </SelectMainLayer>
      <select
        id={name}
        value={field.value || (multiple ? [] : "")}
        required={Boolean(rules?.required)}
        multiple={multiple}
        disabled={disabled}
        onChange={(event) => {
          multiple
            ? field.onChange(Array.from(event.target.selectedOptions).map(({ value }) => value))
            : field.onChange(event.target.value)
        }}
        onBlur={() => {
          field.onBlur()
        }}
        hidden={true}
        {...restProps}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {optionGroups.map(({ label, options }) => {
          if (optionGroups.length === 1) {
            return options.map(({ text, value }) => (
              <option key={value} value={value}>
                {text}
              </option>
            ))
          }
          return (
            <optgroup key={label} label={label}>
              {options.map(({ value, text }) => (
                <option key={value} value={value}>
                  {text}
                </option>
              ))}
            </optgroup>
          )
        })}
      </select>
    </SelectMainContainer>
  )
}

interface SelectMainStyled {
  $shape: SelectShape
  $isDisabled: boolean
  $isInvalid: boolean
  $isExpanded: boolean
  $isSelected: boolean
}

const SelectMainCombobox = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  text-align: left;
  font-size: ${(props) => props.theme.typo.size.sm};
  line-height: ${(props) => props.theme.typo.leading.sm};
  background: rgb(var(--color-neutral100));
  > span {
    flex: 1 1 0px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`

const SelectMainLayer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 4px;
  display: flex;
  width: 100%;
  background: rgb(var(--color-neutral100));
  border-radius: 6px;
  overflow: hidden;
  z-index: 1;
  box-shadow:
    0px 3px 6px -4px rgba(var(--color-neutral1300), 0.12),
    0px 6px 16px 0 rgba(var(--color-neutral1300), 0.08),
    0px 9px 28px 8px rgba(var(--color-neutral1300), 0.05);
  > div {
    width: 100%;
    max-height: 0px;
    transition: max-height 200ms var(--motion-ease-out);
    overflow: auto;
  }
`

const SelectMainContainer = styled.div<SelectMainStyled>`
  position: relative;
  ${(props) => {
    switch (props.$shape) {
      case "plain":
        return css`
          /*  */
        `
      case "square":
      default:
        return css`
          ${SelectMainCombobox} {
            padding: 4px 12px;
            border-radius: 6px;
            border: 1px solid rgb(var(--color-neutral500));
            background-color: rgb(var(--color-neutral100));
            outline: none;
            transition-property: border-color, box-shadow;
            transition-duration: 0.2s;
            transition-timing-function: ease;
            transition-delay: 0s;
            &:hover {
              border-color: rgb(var(--color-primary600));
              background-color: rgb(var(--color-neutral100));
            }
            &:focus-within,
            &:focus-visible {
              border-color: rgb(var(--color-primary600));
              box-shadow: 0 0 0 2px rgba(var(--color-primary500), 0.1);
            }
          }
          ${props.$isDisabled &&
          css`
            && ${SelectMainCombobox} {
              border-color: rgb(var(--color-neutral500));
              background-color: rgb(var(--color-neutral300));
            }
          `}
          ${Boolean(!props.$isDisabled && props.$isInvalid) &&
          css`
            && ${SelectMainCombobox} {
              border-color: rgb(var(--color-red600));
            }
            &&:hover ${SelectMainCombobox} {
              border-color: rgb(var(--color-red600));
            }
            &&:focus-within ${SelectMainCombobox}, &&:focus-visible ${SelectMainCombobox} {
              border-color: rgb(var(--color-red600));
              box-shadow: 0 0 0 2px rgba(var(--color-red500), 0.1);
            }
          `}
        `
    }
  }}
  ${(props) => {
    switch (props.$isExpanded) {
      case true:
        return css`
          ${SelectMainCombobox} {
            svg {
              transform: rotate(180deg);
            }
          }
          ${SelectMainLayer} {
            > div {
              max-height: 142px;
            }
          }
        `
      case false:
      default:
        return css`
          /*  */
        `
    }
  }}
  ${(props) => {
    switch (props.$isSelected) {
      case true:
        return css`
          ${SelectMainCombobox} {
            color: rgb(var(--color-neutral1100));
          }
        `
      case false:
      default:
        return css`
          ${SelectMainCombobox} {
            color: rgb(var(--color-neutral800));
          }
        `
    }
  }}
`

export default SelectMain
