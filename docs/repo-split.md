---
sidebar_position: 2
---

# Repository 拆分

本專案由 6 個獨立 Git 的 Repository 組成，依資源 ownership、變更頻率與安全邊界拆分。

## Repository 職責

<div className="cluster-table">
| 專案                      | 負責什麼                      | 具體內容                                                                                                     | GitHub                                                                                                                                                                 |
| ------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `gitops-demo-openvpn-dns` | VPN Server、DNS Server 管理   | OpenVPN 主機、內部 DNS、路由與 NAT、防火牆、存取權限群組                                                     | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-openvpn-dns" target="_blank" rel="noopener noreferrer">GitHub ↗</a> |
| `gitops-demo-cluster`     | Kubernetes cluster 建置       | 基礎設施 k8s manifest，LKE 叢集、防火牆、ArgoCD 存取用的 RBAC 與 Token                                       | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-cluster" target="_blank" rel="noopener noreferrer">GitHub ↗</a>     |
| `gitops-demo-argocd`      | GitOps 平台管理               | 基礎設施 ArgoCD manifest，ArgoCD 安裝與自我管理、註冊 Worker 叢集、Root Application、private ArgoCD endpoint | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-argocd" target="_blank" rel="noopener noreferrer">GitHub ↗</a>      |
| `gitops-demo-apps`        | ArgoCD Application 的部署定義 | Application ArgoCD manifest，前後端 Kubernetes 資源、dev／prod 環境設定、ApplicationSet                      | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-apps" target="_blank" rel="noopener noreferrer">GitHub ↗</a>        |
| `gitops-demo-backend`     | 後端程式碼 & image push       | Go API、後端 Dockerfile                                                                                      | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-backend" target="_blank" rel="noopener noreferrer">GitHub ↗</a>     |
| `gitops-demo-frontend`    | 前端程式碼 & image push       | React 靜態網頁、Nginx 設定樣板、API 反向代理、前端 Dockerfile                                                | <a className="button button--primary button--sm" href="https://github.com/KittyChen913/gitops-demo-frontend" target="_blank" rel="noopener noreferrer">GitHub ↗</a>    |
</div>

## Repository 責任矩陣

| 職責                        | `openvpn-dns` | `cluster` | `argocd` | `apps` | `backend` | `frontend` |
| --------------------------- | :-----------: | :-------: | :------: | :----: | :-------: | :--------: |
| VPN 主機 & 防火牆           |       ✅       |     —     |    —     |   —    |     —     |     —      |
| VPN 自動化帳號 & 憑證初始化 |       ✅       |     —     |    —     |   —    |     —     |     —      |
| 內部 DNS 解析               |       ✅       |     —     |    —     |   —    |     —     |     —      |
| 內部服務存取控管            |       ✅       |     —     |    —     |   —    |     —     |     —      |
| S3 State Bucket 建置        |       ✅       |     ✅     |    —     |   —    |     —     |     —      |
| Terraform State 寫入        |       ✅       |     ✅     |    ✅     |   —    |     —     |     —      |
| Kubernetes 叢集建置         |       —       |     ✅     |    —     |   —    |     —     |     —      |
| 叢集網路邊界 & 防火牆       |       —       |     ✅     |    —     |   —    |     —     |     —      |
| Kubernetes RBAC             |       —       |     ✅     |    —     |   —    |     —     |     —      |
| ArgoCD 安裝                 |       —       |     —     |    ✅     |   —    |     —     |     —      |
| ArgoCD 註冊 Worker 叢集     |       —       |     —     |    ✅     |   —    |     —     |     —      |
| Root Application 管理       |       —       |     —     |    ✅     |   —    |     —     |     —      |
| ArgoCD 私有入口 & 防火牆    |       —       |     —     |    ✅     |   —    |     —     |     —      |
| Kubernetes 資源定義         |       —       |     —     |    —     |   ✅    |     —     |     —      |
| 前後端部署版本控制          |       —       |     —     |    —     |   ✅    |     —     |     —      |
| ApplicationSet 管理         |       —       |     —     |    —     |   ✅    |     —     |     —      |
| 應用程式 Source Code        |       —       |     —     |    —     |   —    |     ✅     |     ✅      |
| Docker image 建置 & 發布    |       —       |     —     |    —     |   —    |     ✅     |     ✅      |

## 拆分原則

這些 Repository 主要依三個維度來拆分：
1. **Ownership**（資源由哪個 Team 負責維護）
2. **Lifecycle／變更頻率**（常變動與不常變動的會拆開）
3. **安全邊界**（異動影響範圍，避免改 A 壞 B）

| 專案                      | Ownership     | Manifest 類型                 | 變更頻率 |
| ------------------------- | ------------- | ----------------------------- | -------- |
| `gitops-demo-openvpn-dns` | SRE Team      | 基礎設施 VPN、DNS manifest    | 幾乎不變 |
| `gitops-demo-cluster`     | SRE Team      | 基礎設施 k8s manifest         | 小量變更 |
| `gitops-demo-argocd`      | SRE Team      | 基礎設施 ArgoCD manifest      | 幾乎不變 |
| `gitops-demo-apps`        | SRE Team      | Application ArgoCD manifest   | 小量變更 |
| `gitops-demo-backend`     | Backend Team  | Application workload manifest | 頻繁變更 |
| `gitops-demo-frontend`    | Frontend Team | Application workload manifest | 頻繁變更 |
