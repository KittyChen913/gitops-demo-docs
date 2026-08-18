---
sidebar_position: 5
---

# VPN 配置

<img
  src={require('./images/vpn-configuration-dev-prod.png').default}
  alt="單一 OpenVPN Server 同時支援 Dev、Prod 環境的 ArgoCD 存取架構"
  width="75%"
  style={{ marginBottom: '50px' }}
/>

此架構的 OpenVPN Server 只部屬一台，支援 dev、prod 多個 Environment 使用。

User 登入 VPN 後，就可根據權限 `dev-ops`、`prod-ops` 存取該環境的內部管理服務（在此架構中目前只有 ArgoCD UI）。

詳細登入步驟請參考：[使用者登入 VPN](./Guides/vpn-client-access.md)
