---
sidebar_position: 12
---

# AWS S3 Bucket 的 State 結構

```text
📁 kc-gitops-demo-tfstate
├─ 📁 gitops-demo-cluster/
│  └─ 📁 dev/
│     ├─ 📁 dev-clusters/
│     │  └─ 📄 terraform.tfstate
│     └─ 📁 dev-k8s/
│        └─ 📄 terraform.tfstate
├─ 📁 gitops-demo-argocd/
│  └─ 📁 dev/
│     ├─ 📁 argocd-ateam/
│     │  └─ 📄 terraform.tfstate
│     ├─ 📁 argocd-install/
│     │  └─ 📄 terraform.tfstate
│     ├─ 📁 argocd-private-network/
│     │  └─ 📄 terraform.tfstate
│     └─ 📁 argocd-self-manage/
│        └─ 📄 terraform.tfstate
└─ 📁 gitops-demo-openvpn-dns/
   └─ 📁 shared/
      ├─ 📁 base/
      │  └─ 📄 terraform.tfstate
      └─ 📁 credential-bootstrap/
         └─ 📄 terraform.tfstate
```


## State 對應表

| State Key                                                               | Managed By    | Purpose                                |
| ----------------------------------------------------------------------- | ------------- | -------------------------------------- |
| `gitops-demo-cluster/dev/dev-clusters/terraform.tfstate`                | `cluster`     | Dev 環境的 Kubernetes cluster 基礎設施 |
| `gitops-demo-cluster/dev/dev-k8s/terraform.tfstate`                     | `cluster`     | Dev 叢集內的 Kubernetes 層級資源設定   |
| `gitops-demo-argocd/dev/argocd-ateam/terraform.tfstate`                 | `argocd`      | A-team 專屬的 ArgoCD instance          |
| `gitops-demo-argocd/dev/argocd-install/terraform.tfstate`               | `argocd`      | ArgoCD 的安裝與基礎部署                |
| `gitops-demo-argocd/dev/argocd-private-network/terraform.tfstate`       | `argocd`      | ArgoCD 存取用的私有網路設定            |
| `gitops-demo-argocd/dev/argocd-self-manage/terraform.tfstate`           | `argocd`      | ArgoCD 自我管理（self-managed）設定    |
| `gitops-demo-openvpn-dns/shared/base/terraform.tfstate`                 | `openvpn-dns` | OpenVPN／DNS 共用基礎資源              |
| `gitops-demo-openvpn-dns/shared/credential-bootstrap/terraform.tfstate` | `openvpn-dns` | 憑證／認證資訊初始化設定               |
