---
sidebar_position: 4
---

# Firewall 配置

<img
  src={require('./images/firewall-configuration.png').default}
  alt="架構中 Kubernetes Node、ArgoCD NodeBalancer、OpenVPN Server 共 4 個 Firewall 的配置示意圖"
  width="100%"
  style={{ marginBottom: '50px' }}
/>

在此架構中總共使用了 4 個防火牆

1. Kubernetes Management Cluster node Firewall
2. Kubernetes Worker Cluster node Firewall
3. ArgoCD NodeBalancer Firewall
4. OpenVPN Server node Firewall

之所以需要那麼多個 Firewall 其實是跟 Linode 的元件限制有關。

## LKE Node Firewall（2 個）

Linode 的 LKE（Linode 的 Kubernetes）每台 Node 都會自動分配 Public IP，預設都能對外開放。

雖然 Linode 有 VPC 的功能，但他必須要企業版才能將 LKE 裝進 VPC 中，所以在我的專案中無法這樣用，所以我才會針對那些 LKE 的 Node 特別增設 Firewall 來防止直接暴露在外部。


## NodeBalancer Firewall（1 個）

Linode 的 NodeBalancer 也是會自動分配 Public IP，一樣預設對外開放。

所以對於 ArgoCD 這種內部使用的管理服務，也需要添加一個 Firewall 防止他暴露到外部讓所有人都能看的到。ArgoCD NodeBalancer 的 Firewall 不是完全封住，而是只開放 VPN 訪問，這個在 VPN 章節會再詳細描述。


## OpenVPN Node Firewall（1 個）

OpenVPN Server 安裝在一個獨立的 Node 裡，這個單獨的 Node 一樣有 Public IP，所以一樣需要添加 Firewall 防止直接對外開放。

