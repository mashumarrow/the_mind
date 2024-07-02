<h1 align="center"> 
   🃏ザ・マインド🃏
</h1>

***
<p align="center">
<img src="https://github.com/mashumarrow/the_mind/assets/134787738/5d5307eb-2e58-40a4-8de0-ba18c95dc4f8" width=850>
</p>
<br>

## ■ゲームのURL
***
 4人で協力して進める心理戦カードゲームです。<br>
https://the-mind-game.vercel.app/
## ■ゲームのイメージ
***
<p align="center">
<img src="https://github.com/mashumarrow/the_mind/assets/134787738/e528ee4c-ef5b-477a-9329-f9ff502d7a57" width=300>
   
## ■遊び方
***
| スタート画面| wating画面|
| --- | --- |
| ![start](https://github.com/mashumarrow/the_mind/assets/134787738/0d0f05bc-69ed-48fc-9522-002ef1f269d3)| List all new or modified files |
| git diff | Show file differences that haven't been staged |





# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
