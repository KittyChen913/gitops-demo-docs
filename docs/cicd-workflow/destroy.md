---
sidebar_position: 7
---

# Destroy 資源

這裡指的 `openvpn-dns`、`cluster`、`argocd` 這 3 個專案使用 Terraform 建置的雲端資源。

當所有專案部屬完畢後，cloud 上已經充滿了大量的資源，很多資源是需要付費的，所以我每次測試完畢後都會隨即 Destroy 進行銷毀。以上 3 個專案裡面都已經有設置可手動執行的 Destroy Workflow，方便一鍵 Destroy 所有資源。

要注意的是，因為這幾個專案中的很多雲端資源都是互相設置的耦合關係，所以 Destroy 的順序要與部屬順序相反。

<img
  src={require('./images/multi-repo-destroy-order.png').default}
  alt="Destroy 順序：argocd → cluster → openvpn-dns，依序移除 ArgoCD、Kubernetes cluster、OpenVPN／dnsmasq"
  width="38%"
  style={{ marginTop: '10px' }}
/>
