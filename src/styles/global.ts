import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

const StyledGlobal = styled.createGlobalStyle`
  :root {
    --color-neutral100: ${(props) => props.theme.color.light.neutral100};
    --color-neutral200: ${(props) => props.theme.color.light.neutral200};
    --color-neutral300: ${(props) => props.theme.color.light.neutral300};
    --color-neutral400: ${(props) => props.theme.color.light.neutral400};
    --color-neutral500: ${(props) => props.theme.color.light.neutral500};
    --color-neutral600: ${(props) => props.theme.color.light.neutral600};
    --color-neutral700: ${(props) => props.theme.color.light.neutral700};
    --color-neutral800: ${(props) => props.theme.color.light.neutral800};
    --color-neutral900: ${(props) => props.theme.color.light.neutral900};
    --color-neutral1000: ${(props) => props.theme.color.light.neutral1000};
    --color-neutral1100: ${(props) => props.theme.color.light.neutral1100};
    --color-neutral1200: ${(props) => props.theme.color.light.neutral1200};
    --color-neutral1300: ${(props) => props.theme.color.light.neutral1300};

    --color-red100: ${(props) => props.theme.color.light.red100};
    --color-red200: ${(props) => props.theme.color.light.red200};
    --color-red300: ${(props) => props.theme.color.light.red300};
    --color-red400: ${(props) => props.theme.color.light.red400};
    --color-red500: ${(props) => props.theme.color.light.red500};
    --color-red600: ${(props) => props.theme.color.light.red600};
    --color-red700: ${(props) => props.theme.color.light.red700};
    --color-red800: ${(props) => props.theme.color.light.red800};
    --color-red900: ${(props) => props.theme.color.light.red900};
    --color-red1000: ${(props) => props.theme.color.light.red1000};

    --color-yellow100: ${(props) => props.theme.color.light.yellow100};
    --color-yellow200: ${(props) => props.theme.color.light.yellow200};
    --color-yellow300: ${(props) => props.theme.color.light.yellow300};
    --color-yellow400: ${(props) => props.theme.color.light.yellow400};
    --color-yellow500: ${(props) => props.theme.color.light.yellow500};
    --color-yellow600: ${(props) => props.theme.color.light.yellow600};
    --color-yellow700: ${(props) => props.theme.color.light.yellow700};
    --color-yellow800: ${(props) => props.theme.color.light.yellow800};
    --color-yellow900: ${(props) => props.theme.color.light.yellow900};
    --color-yellow1000: ${(props) => props.theme.color.light.yellow1000};

    --color-green100: ${(props) => props.theme.color.light.green100};
    --color-green200: ${(props) => props.theme.color.light.green200};
    --color-green300: ${(props) => props.theme.color.light.green300};
    --color-green400: ${(props) => props.theme.color.light.green400};
    --color-green500: ${(props) => props.theme.color.light.green500};
    --color-green600: ${(props) => props.theme.color.light.green600};
    --color-green700: ${(props) => props.theme.color.light.green700};
    --color-green800: ${(props) => props.theme.color.light.green800};
    --color-green900: ${(props) => props.theme.color.light.green900};
    --color-green1000: ${(props) => props.theme.color.light.green1000};

    --color-primary100: ${(props) => props.theme.color.light.primary100};
    --color-primary200: ${(props) => props.theme.color.light.primary200};
    --color-primary300: ${(props) => props.theme.color.light.primary300};
    --color-primary400: ${(props) => props.theme.color.light.primary400};
    --color-primary500: ${(props) => props.theme.color.light.primary500};
    --color-primary600: ${(props) => props.theme.color.light.primary600};
    --color-primary700: ${(props) => props.theme.color.light.primary700};
    --color-primary800: ${(props) => props.theme.color.light.primary800};
    --color-primary900: ${(props) => props.theme.color.light.primary900};
    --color-primary1000: ${(props) => props.theme.color.light.primary1000};
  }

  html,
  body {
    min-width: 360px;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-weight: 400;
    font-family:
      var(--font-notoSansKr),
      -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";
    color: rgb(var(--color-neutral1100));
    background: rgb(var(--color-neutral100));
    word-wrap: break-word;
    word-break: keep-all;
    white-space: normal;
    -webkit-text-size-adjust: none;
    -webkit-overflow-scrolling: touch;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }
  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }
  label {
    cursor: pointer;
  }
  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  a {
    display: inline-block;
    color: rgb(var(--color-neutral1100));
    text-decoration: none;
  }
  button {
    display: inline-block;
    padding: 0;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-family: var(--font-notoSansKr), sans-serif;
    color: rgb(var(--color-neutral1100));
    border: 0;
    border-radius: 0;
    background: none;
    vertical-align: top;
    cursor: pointer;
    &[disabled] {
      cursor: default;
    }
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0;
    font-size: ${(props) => props.theme.typo.size.base};
    line-height: ${(props) => props.theme.typo.leading.base};
    font-family: var(--font-notoSansKr), sans-serif;
    color: rgb(var(--color-neutral1100));
    border: 0;
    border-radius: 0;
    background: none;
    vertical-align: top;
    -webkit-appearance: none;
    &:disabled,
    &:read-only {
      cursor: default;
    }
  }
  input {
    &[type="button"],
    &[type="reset"],
    &[type="submit"] {
      cursor: pointer;
    }
    &[type="number"]::-webkit-inner-spin-button,
    &[type="number"]::-webkit-outer-spin-button {
      height: auto;
    }
    &[type="search"]::-webkit-search-cancel-button,
    &[type="search"]::-webkit-search-decoration {
      -webkit-appearance: none;
    }
    &:-ms-input-placeholder,
    &::-moz-placeholder,
    &::-webkit-input-placeholder {
      color: rgb(var(--color-neutral700));
    }
  }
  select {
  }
  textarea {
    overflow: auto;
    resize: vertical;
    &:-ms-input-placeholder,
    &::-moz-placeholder,
    &::-webkit-input-placeholder {
      color: rgb(var(--color-neutral700));
    }
  }

  table {
    width: 100%;
    table-layout: fixed;
    th,
    td {
      text-align: left;
    }
  }

  .sr-only {
    position: absolute;
    margin: -1px;
    padding: 0;
    width: 1px;
    height: 1px;
    border: 0;
    clip: rect(0, 0, 0, 0);
    overflow: hidden;
    white-space: nowrap;
  }
`

export default StyledGlobal
