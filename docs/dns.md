---
sidebar_position: 7
---

# DNS 配置

此專案有使用 DNS 的有 2 個服務：
1. ArgoCD UI
2. Frontend Web Site

<br />

## ArgoCD Internal DNS

<img
  src={require('./images/internal-dns-argocd.png').default}
  alt="Internal DNS"
  width="100%"
  style={{ marginBottom: '40px' }}
/>

因為 ArgoCD 是內部服務沒有要對外，所以他的 Domain 會使用 Internal 的 DNS Server 來提供。

這裡使用 dnsmasq 來當 Internal DNS Server，支援 dev、prod 多個 Environment 使用，在此架構中我是將 OpenVPN & dnsmasq 裝在同一台 Node 中，Client 要訪問 ArgoCD UI，需先連上 VPN 後，用 Domain 與 dnsmasq 交換取得 IP，再進到 ArgoCD UI 中。

<br />
<br />

## Frontend External DNS


<img
  src={require('./images/external-dns-frontend.png').default}
  alt="External DNS"
  width="100%"
  style={{ marginBottom: '40px' }}
/>

如果要使用 External 公開的 DNS，Linode 有提供 DNS Server 可以使用，但因為 Domain 要花錢購買 💰，我沒買。


<img
  src={require('./images/hosts-dns-frontend.png').default}
  alt="hosts DNS"
  width="92%"
  style={{ marginBottom: '40px', marginTop: '20px' }}
/>

所以這專案實際的架構是這張，這裡我只 Public IP，在 Windows 中設定 hosts 來測試用 Domain 訪問。








