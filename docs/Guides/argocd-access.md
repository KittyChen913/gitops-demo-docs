---
sidebar_position: 3
---

# 訪問 ArgoCD UI

在此專案中 ArgoCD 是內部服務，需連上 VPN 後才能訪問，所以請先完成 [VPN Client 連線](./vpn-client-access.md)。

<br />

## 取得 ArgoCD UI Domain

<br />
ArgoCD UI Domain：AWS SSM `/gitops/dev/platform/argocd/ENDPOINT_HOSTNAME`

帳號：`admin`

密碼：AWS SSM `/gitops/dev/platform/argocd/ADMIN_PASSWORD`

<img
  src={require('./images/login-argocd-ui.png').default}
  alt="ArgoCD UI 登入畫面"
  width="85%"
  style={{ marginBottom: '50px' }}
/>

即可看到受 ArgoCD 監控的 Application 們

<img
  src={require('./images/argocd-ui-application-list.png').default}
  alt="ArgoCD UI 中受監控的 Application 列表"
  width="100%"
  style={{ marginBottom: '30px' }}
/>
