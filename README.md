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
| スタート画面| wating画面|カード配布画面|
| --- | --- | --- |
| <image src="https://github.com/mashumarrow/the_mind/assets/134787738/0d0f05bc-69ed-48fc-9522-002ef1f269d3" width=150>|<image src="https://github.com/mashumarrow/the_mind/assets/134787738/b3d6da02-e9b7-4a0f-81a7-1f48a0eed05a" width=150> |<image src="https://github.com/mashumarrow/the_mind/assets/134787738/7da922c5-41c6-41e8-a507-0a20116a7608" width=150>|
| git diff |  |



![waiting](https://github.com/mashumarrow/the_mind/assets/134787738/b3d6da02-e9b7-4a0f-81a7-1f48a0eed05a)
![card](https://github.com/mashumarrow/the_mind/assets/134787738/b6d25f13-1332-4e55-8eb4-6b0fe72659c9)


![fall](https://github.com/mashumarrow/the_mind/assets/134787738/4f36c2ce-d4ba-4960-9ebb-5d5dd7b9abca)
![clear](https://github.com/mashumarrow/the_mind/assets/134787738/e2abbcf1-7cce-4d82-8783-52507b06e43e)
![playpng](https://github.com/mashumarrow/the_mind/assets/134787738/5841c175-8cf2-4e64-a62c-c0a3e66346e8)



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
