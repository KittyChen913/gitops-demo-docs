---
sidebar_position: 11
---

# 變數清單

:::info
Manual 欄位有打勾 ✅ 者，代表該變數需要人工手動新增，其餘未打勾的變數，則都由程式自動化建立。
:::

<br />

### GitHub Actions Repository Secrets

大多數的變數都存放在 AWS SSM，GitHub 只存放用於建立 GitHub Actions OIDC 驗證的 IAM 角色 ARN 所需的 Account ID

| Variable         |   Type   | Purpose        | Manual |
| ---------------- | :------: | -------------- | :----: |
| `AWS_ACCOUNT_ID` | `Secret` | AWS Account ID |   ✅    |

## AWS SSM Parameters

> 以下 Created By 欄位皆省略 `gitops-demo-` 前綴。

### Shared

Path: `/gitops/shared/`

| Parameter               |      Type      |    Tier    | Created By    | Purpose                  | Manual |
| ----------------------- | :------------: | :--------: | ------------- | ------------------------ | :----: |
| `LINODE_TOKEN`          | `SecureString` | `Standard` | `openvpn-dns` | 用於 Linode API 身分驗證 |   ✅    |
| `OPENVPN_CONTACT_EMAIL` | `SecureString` | `Standard` | `openvpn-dns` | 設定 OpenVPN 聯絡信箱    |   ✅    |

這都是由人工手動添加，其他專案只有 read 權限的變數。

### OpenVPN／DNS / OpenVPN / Ansible

Path: `/gitops/openvpn-dns/openvpn/ansible/`

| Parameter                     |      Type      |    Tier    | Created By    | Purpose                                                                          | Manual |
| ----------------------------- | :------------: | :--------: | ------------- | -------------------------------------------------------------------------------- | :----: |
| `OPENVPN_SSH_PUBLIC_KEY`      |    `String`    | `Standard` | `openvpn-dns` | Ansible 使用的 SSH 公鑰                                                          |        |
| `OPENVPN_SSH_PRIVATE_KEY_B64` | `SecureString` | `Standard` | `openvpn-dns` | workflow 中供 Ansible 使用的 SSH 私鑰，也可供 SRE 以 SSH Key 連線方式訪問 Server |        |
| `OPENVPN_SSH_HOST_KEY`        |    `String`    | `Standard` | `openvpn-dns` | 驗證 OpenVPN 主機的 SSH host key                                                 |        |
| `OPENVPN_ADMIN_PASSWORD`      | `SecureString` | `Standard` | `openvpn-dns` | OpenVPN Access Server 帳號 `openvpn` 的密碼                                      |        |

### OpenVPN／DNS / OpenVPN / Break Glass

Path: `/gitops/openvpn-dns/openvpn/break-glass/`

| Parameter                |      Type      |    Tier    | Created By    | Purpose                                          | Manual |
| ------------------------ | :------------: | :--------: | ------------- | ------------------------------------------------ | :----: |
| `VPNADMIN_SUDO_PASSWORD` | `SecureString` | `Standard` | `openvpn-dns` | 管理人員使用的 `vpnadmin` Linux 登入用 sudo 密碼 |        |

### OpenVPN／DNS / Network

Path: `/gitops/openvpn-dns/network/`

| Parameter              |   Type   |    Tier    | Created By    | Purpose               | Manual |
| ---------------------- | :------: | :--------: | ------------- | --------------------- | :----: |
| `VPN_PUBLIC_EGRESS_IP` | `String` | `Standard` | `openvpn-dns` | VPN 對外連線的公開 IP |        |
| `VPN_CLIENT_CIDR`      | `String` | `Standard` | `openvpn-dns` | VPN client 網段 CIDR  |        |
| `INTERNAL_DOMAIN`      | `String` | `Standard` | `openvpn-dns` | 內部服務網域名稱      |        |
| `INTERNAL_DNS_IP`      | `String` | `Standard` | `openvpn-dns` | 內部 DNS 伺服器 IP    |        |

### OpenVPN／DNS / Automation / CI ArgoCD

Path: `/gitops/openvpn-dns/automation/ci-argocd/`

| Parameter  |      Type      |                       Tier                       | Created By    | Purpose                              | Manual |
| ---------- | :------------: | :----------------------------------------------: | ------------- | ------------------------------------ | :----: |
| `PROFILE`  |    `String`    | <code style={{color: '#e8590c'}}>Advanced</code> | `openvpn-dns` | 基礎設施自動化使用的 AWS CLI profile |        |
| `PASSWORD` | `SecureString` |                    `Standard`                    | `openvpn-dns` | CI 基礎設施帳號密碼                  |        |

### OpenVPN／DNS / Automation / CI Cluster

Path: `/gitops/openvpn-dns/automation/ci-cluster/`

| Parameter  |      Type      |                       Tier                       | Created By    | Purpose                          | Manual |
| ---------- | :------------: | :----------------------------------------------: | ------------- | -------------------------------- | :----: |
| `PROFILE`  |    `String`    | <code style={{color: '#e8590c'}}>Advanced</code> | `openvpn-dns` | 叢集自動化使用的 AWS CLI profile |        |
| `PASSWORD` | `SecureString` |                    `Standard`                    | `openvpn-dns` | CI 叢集帳號密碼                  |        |

### Dev / Clusters / lke-dev-mgmt

Path: `/gitops/dev/clusters/lke-dev-mgmt/`

| Parameter      |      Type      |    Tier    | Created By | Purpose                                       | Manual |
| -------------- | :------------: | :--------: | ---------- | --------------------------------------------- | :----: |
| `token`        | `SecureString` | `Standard` | `cluster`  | lke-dev-mgmt 的 Kubernetes API access token   |        |
| `ca-cert`      |    `String`    | `Standard` | `cluster`  | lke-dev-mgmt 的 Kubernetes API CA certificate |        |
| `api-endpoint` |    `String`    | `Standard` | `cluster`  | lke-dev-mgmt 的 Kubernetes API endpoint       |        |

### Dev / Clusters / lke-dev-ateam

Path: `/gitops/dev/clusters/lke-dev-ateam/`

| Parameter      |      Type      |    Tier    | Created By | Purpose                                        | Manual |
| -------------- | :------------: | :--------: | ---------- | ---------------------------------------------- | :----: |
| `token`        | `SecureString` | `Standard` | `cluster`  | lke-dev-ateam 的 Kubernetes API access token   |        |
| `ca-cert`      |    `String`    | `Standard` | `cluster`  | lke-dev-ateam 的 Kubernetes API CA certificate |        |
| `api-endpoint` |    `String`    | `Standard` | `cluster`  | lke-dev-ateam 的 Kubernetes API endpoint       |        |

### Dev / Platform / ArgoCD

Path: `/gitops/dev/platform/argocd/`

| Parameter           |      Type      |    Tier    | Created By | Purpose                | Manual |
| ------------------- | :------------: | :--------: | ---------- | ---------------------- | :----: |
| `ENDPOINT_HOSTNAME` |    `String`    | `Standard` | `argocd`   | ArgoCD 端點主機名稱    |        |
| `ENDPOINT_IP`       |    `String`    | `Standard` | `argocd`   | ArgoCD 端點 IP         |        |
| `ADMIN_PASSWORD`    | `SecureString` | `Standard` | `argocd`   | ArgoCD 初始 admin 密碼 |        |

## SSM 路徑階層總覽

```text
📁 /gitops/
├─ 📁 shared/
│  ├─ 🛡️ LINODE_TOKEN
│  └─ 🛡️ OPENVPN_CONTACT_EMAIL
├─ 📁 openvpn-dns/
│  ├─ 📁 openvpn/
│  │  ├─ 📁 ansible/
│  │  │  ├─ 🔧 OPENVPN_SSH_PUBLIC_KEY
│  │  │  ├─ 🛡️ OPENVPN_SSH_PRIVATE_KEY_B64
│  │  │  ├─ 🔧 OPENVPN_SSH_HOST_KEY
│  │  │  └─ 🛡️ OPENVPN_ADMIN_PASSWORD
│  │  └─ 📁 break-glass/
│  │     └─ 🛡️ VPNADMIN_SUDO_PASSWORD
│  ├─ 📁 network/
│  │  ├─ 🔧 VPN_PUBLIC_EGRESS_IP
│  │  ├─ 🔧 VPN_CLIENT_CIDR
│  │  ├─ 🔧 INTERNAL_DOMAIN
│  │  └─ 🔧 INTERNAL_DNS_IP
│  └─ 📁 automation/
│     ├─ 📁 ci-argocd/
│     │  ├─ 🔧 PROFILE
│     │  └─ 🛡️ PASSWORD
│     └─ 📁 ci-cluster/
│        ├─ 🔧 PROFILE
│        └─ 🛡️ PASSWORD
└─ 📁 dev/
   ├─ 📁 clusters/
   │  ├─ 📁 lke-dev-mgmt/
   │  │  ├─ 🛡️ token
   │  │  ├─ 🔧 ca-cert
   │  │  └─ 🔧 api-endpoint
   │  └─ 📁 lke-dev-ateam/
   │     ├─ 🛡️ token
   │     ├─ 🔧 ca-cert
   │     └─ 🔧 api-endpoint
   └─ 📁 platform/
      └─ 📁 argocd/
         ├─ 🔧 ENDPOINT_HOSTNAME
         ├─ 🔧 ENDPOINT_IP
         └─ 🛡️ ADMIN_PASSWORD
```
