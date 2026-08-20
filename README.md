# GitOps Demo 跨 Repository 架構文件

這不是單一專案的 README，而是 GitOps Demo 多個 Repository 的整體架構與操作入口。此處集中說明各專案的 ownership、跨 Repository 契約、部署順序、Cloud 與網路設計、CI/CD 流程，以及日常操作方式。

- 文件網站：<https://kittychen913.github.io/gitops-demo-docs/>
- 預設分支：`master`
- 發布方式：GitHub Actions 手動觸發 `Deploy to GitHub Pages`

## 相關 Repository

本文件 Repository 串連以下實作 Repository：

- [`gitops-demo-cluster`](https://github.com/KittyChen913/gitops-demo-cluster)：S3 State Bucket、LKE、Worker Firewall、ArgoCD SA/RBAC/token。
- [`gitops-demo-argocd`](https://github.com/KittyChen913/gitops-demo-argocd)：ArgoCD 安裝、自我管理、Cluster registration 與 private endpoint。
- [`gitops-demo-openvpn-dns`](https://github.com/KittyChen913/gitops-demo-openvpn-dns)：Shared OpenVPN、DNS、route、NAT 與 network access contract。
- [`gitops-demo-apps`](https://github.com/KittyChen913/gitops-demo-apps)：Kubernetes manifests、Kustomize overlays 與 ApplicationSet。
- [`gitops-demo-backend`](https://github.com/KittyChen913/gitops-demo-backend)、[`gitops-demo-frontend`](https://github.com/KittyChen913/gitops-demo-frontend)：application source 與 image build。

## 目錄結構

```text
📁 gitops-demo-docs/
├── 📁 docs/
│   ├── 📁 Guides/          快速開始與服務存取指南
│   ├── 📁 cicd-workflow/   各 Repository 的 CI/CD 與執行順序
│   ├── 📄 variables.md     GitHub Secrets 與 AWS SSM Parameter contracts
│   └── 📄 *.md             架構、Cloud、IAM、DNS、Firewall、VPN 與 Repository 邊界
├── 📁 static/              網站靜態資源
└── 📁 src/                 網站樣式與元件
```

## 本機開發

需求：

- Node.js 20 或更新版本
- npm（使用已提交的 `package-lock.json`）

安裝依賴：

```bash
npm install
```

啟動開發伺服器：

```bash
npm run start
```

預設會啟動支援 hot reload 的本機 Docusaurus server。

需要清除 Docusaurus cache 與產出檔案時：

```bash
npm run clear
```

## 驗證

提交文件或網站設定前，至少執行：

```bash
npm run typecheck
npm run build
```

`npm run build` 會產生 production site，並依 `docusaurus.config.ts` 將 broken links 與 broken anchors 視為失敗。Build output 位於 `build/`，不應提交至 Git。

## 新增或修改文件

- **文件位置**：Markdown／MDX 放在 `docs/`。
- **內容分類**：操作指南放在 `docs/Guides/`；CI/CD 文件放在 `docs/cicd-workflow/`。
- **圖片與連結**：圖片放在章節的 `images/` 或 `static/`；站內頁面使用相對連結。
- **文件語言**：使用繁體中文，產品名稱、命令、路徑與識別字可保留英文。
- **契約變更**：同步核對 owner Repository 與直接 consumers。
- **提交前驗證**：執行 `npm run typecheck` 與 `npm run build`。

Sidebar 由 `sidebars.ts` 依 `docs/` 目錄自動產生；頁面順序可透過 front matter 的 `sidebar_position` 調整。

## 部署

- **觸發方式**：在 GitHub Actions 手動執行 `Deploy to GitHub Pages`。
- **部署分支**：`master`。
- **執行流程**：`npm ci` → `npm run typecheck` → `npm run build` → GitHub Pages。
