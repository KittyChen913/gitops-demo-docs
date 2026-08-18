---
sidebar_position: 0
---

# 快速開始

此章節會說明怎麼使用這些專案部屬完的服務，以及什麼項目需要人工進行設置。

## 前置手動設置

:::warning
以下項目不在任何 Repository 的自動化流程內，也不會由 Terraform 建立。第一次執行 workflow 前必須先完成，否則 workflow 會在 OIDC 認證或 SSM 讀取階段直接失敗。
:::

### AWS SSM Parameters

只有兩個參數需要人工建立，其餘參數都由 Terraform 或 workflow 自動寫入。

| Parameter                              |      Type      | 建立者 | 用途                                                  |
| -------------------------------------- | :------------: | :----: | ----------------------------------------------------- |
| `/gitops/shared/LINODE_TOKEN`          | `SecureString` |  人工  | Linode API token，多專案共用，CI 透過 OIDC 讀取       |
| `/gitops/shared/OPENVPN_CONTACT_EMAIL` | `SecureString` |  人工  | 目前僅用於 OpenVPN Marketplace StackScript 的聯絡信箱 |

`/gitops/shared/` 底下的參數由<span style={{color: '#f97316'}}>管理人員</span>維護，各 Repository 的 OIDC Role 只有 read 權限。

<br />

### AWS IAM／OIDC

IAM Role 一律由<span style={{color: '#f97316'}}>管理人員</span>手動建立與維護，沒有任何 Repository 有權限建立或修改。

| 項目                                       | 說明                                                                                            |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| OIDC Identity Provider                     | `token.actions.githubusercontent.com`（`aud` = `sts.amazonaws.com`），整個 AWS 帳號只需建立一次 |
| `github-oidc-gitops-demo-cluster-role`     | `cluster` 的 deployment role                                                                    |
| `github-oidc-gitops-demo-argocd-role`      | `argocd` 的 deployment role                                                                     |
| `github-oidc-gitops-demo-openvpn-dns-role` | `openvpn-dns` 的 deployment role，deploy 與 destroy 共用                                        |

Trust policy 與 Inline Policy 的完整內容請見 [各 Repo 的 OIDC IAM Role](../oidc-iam-role.md)。

<br />

### GitHub Repository Secrets

| Secret               | 需要設定的 Repository              | 用途                                        |
| -------------------- | ---------------------------------- | ------------------------------------------- |
| `AWS_ACCOUNT_ID`     | `cluster`、`argocd`、`openvpn-dns` | 組合 OIDC assume role ARN                   |
| `DOCKERHUB_USERNAME` | `backend`、`frontend`              | Docker Hub 登入與 image repository 名稱前綴 |
| `DOCKERHUB_TOKEN`    | `backend`、`frontend`              | Docker Hub push 用的 access token           |

<br />

### GitHub Environments

| Repository            | Environment    | Protection rules                                                                     |
| --------------------- | -------------- | ------------------------------------------------------------------------------------ |
| `cluster`             | `dev`          | 無（自動 apply）                                                                     |
| `cluster`             | `prod`         | **Required reviewers（至少 1 人）**；可選 Deployment branches                        |
| `argocd`              | `dev`          | 無；可選 Deployment branches → 僅 `master`                                           |
| `argocd`              | `prod`         | **Required reviewers（至少 1 人）**、Deployment branches → Tags matching `v*.*.*`    |
| `backend`、`frontend` | `dev` / `prod` | image delivery 依 `push` 是 branch 或 tag 自動選擇，`prod` 建議設 required reviewers |

<br />

## 不需要手動建立的項目

為了方便測試使用，以下前置項目在本專案是<span style={{color: '#4ADE80'}}>自動化</span>建立的，不用自行準備：

| 項目                                                                                                    | 由誰建立                                                                                                                       |
| ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| S3 State Bucket `kc-gitops-demo-tfstate`                                                                | `cluster` 的 `terraform-backend-bootstrap.yml`，以及 `openvpn-dns` 的 `ensure-state-backend`（皆為冪等，已存在時只做唯讀驗證） |
| State lock                                                                                              | 使用新的 S3 原生 `use_lockfile`，不需要 DynamoDB table                                                                         |
| OpenVPN 管理員密碼、Ansible SSH key、automation identity `PROFILE`／密碼                                | `openvpn-dns` 的 `credential-bootstrap`                                                                                        |
| OpenVPN Network 參數（`VPN_PUBLIC_EGRESS_IP`／`VPN_CLIENT_CIDR`／`INTERNAL_DOMAIN`／`INTERNAL_DNS_IP`） | `openvpn-dns` 的 `base`                                                                                                        |
| Break-glass `VPNADMIN_SUDO_PASSWORD`                                                                    | Marketplace StackScript 產生，`openvpn-dns` 的 `base` 複製進 SSM                                                               |
| Cluster `api-endpoint`／`ca-cert`／`token`                                                              | `cluster` 的 Phase 1／Phase 2 Terraform                                                                                        |
| ArgoCD `ENDPOINT_IP`／`ENDPOINT_HOSTNAME`                                                               | `argocd` 的 `private-network` root                                                                                             |
| ArgoCD `ADMIN_PASSWORD`                                                                                 | `argocd` 的 install workflow，首次安裝成功後建立                                                                               |

<br />

