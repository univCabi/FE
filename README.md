# Coding Convention

## Commit

- `Fix`: 버그 수정
  - 버그 수정의 경우 **_반드시_** `Fix` 타입을 사용합니다.
- `Feat`: 새로운 기능 추가
  - 새로운 기능을 추가할 경우, **_반드시_** `Feat` 타입을 사용합니다.
- `Build`: 시스템 또는 외부 종속성에 영향을 미치는 변경사항 (npm 및 yarn)
- `Chore`: (npm 같은 패키지 매니저) 설정을 코드 수정 없이 변경
- `Ci`: ci 구성파일 및 스크립트 변경
- `Docs`: 문서 (documentation) 변경
- `Style`: 코드의 로직에 영향을 주지 않는 스타일상의 변경사항 (whitespace, formatting, colons 등)
- `Refactor`: 결과의 변경 없이 코드의 구조를 변경 및 리팩토링 할 경우
- `Perf`: 성능 (performance) 개선
- `Test`: 기존 테스트 코드 수정 및 누락된 테스트 코드 추가
- `Revert`: 작업 되돌리기

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```
