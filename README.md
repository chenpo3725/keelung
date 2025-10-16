# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
## github
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/chenpo3725/keelung.git
git push -u origin main


這組指令是在「本機初始化一個 Git 倉庫，建立第一次提交，將預設分支改名為 main，綁定到 GitHub 遠端，然後把 main 首次推送上去
一、每行指令在做什麼？（逐步解釋）

git init
在目前資料夾建立一個全新的 Git 倉庫（產生 .git/ 目錄，開始可以追蹤版本）。📁
— 參考：Git 官方文件。
Git
+2
GitHub
+2

git add README.md
把 README.md 加入暫存區（stage），準備提交。🗂️
— 參考：GitHub 對 README 的說明。
GitHub Docs

git commit -m "first commit"
建立第一次提交，訊息為 first commit。🧱

git branch -M main
將目前分支強制改名為 main（-M 會自動覆蓋同名分支）。🔀
— 延伸：也可設定日後新倉庫預設分支為 main：git config --global init.defaultBranch main。
GitHub Docs
+1

git remote add origin https://github.com/chenpo3725/keelung.git
新增名為 origin 的遠端，指向你的 GitHub 倉庫 URL（HTTPS）。🌐
— 參考：遠端的基本概念與 URL 格式。
GitHub Docs
+1

git push -u origin main
把 main 推送到遠端 origin，並用 -u 將上游追蹤綁定（之後只要 git push / git pull 就能作用在 main）。🚀
— 參考：git push 用法。
GitHub Docs