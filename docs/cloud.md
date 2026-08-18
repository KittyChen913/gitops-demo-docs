---
sidebar_position: 1
---

# Cloud 選擇

我第一個學習的 Cloud 是 AWS，所以原本打算都用 AWS 相關服務來開發此專案，但發現 EKS（AWS 的 Kubernetes）非常貴，聽過有些公司會選擇用 EC2 自架 Kubernetes，但我想那應該會跟我之前自架 Docker Swarm 的方式類似，加上因為我沒有碰過 Cloud 的 Kubernetes 所以很想用用看，考量到成本問題，便決定將 Cloud Kubernetes 的部分改用其他 Cloud 來實作，於是我選擇了 Linode。

<br />
<div className="cloud-table">
| Cloud Provider | 主要職責                           | 使用服務                                                           |
| :------------: | -------------------------------   | ------------------------------------------------------------------ |
| **Linode**     | 實際部屬的機器、網路與流量入口       | LKE (Kubernetes)、VPN Server、DNS Server、Firewall、NodeBalancer   |
| **AWS**        | 狀態儲存、參數管理與 CI/CD 身分驗證  | S3、SSM Parameter Store、IAM、OIDC                                 |
</div>

<br />
之所以沒有把所有服務都改用 Linode 是因為 Linode 的功能比較陽春，Linode 有 S3，但他沒有精細的 OIDC 權限可以控管各 repo 的存取限制，也沒有 SSM 這種參數的儲存結構，所以除了跟 VM 有關的東西必須使用 Linode 以外，其他應用都使用 AWS。

<br />
我是以「<span style={{color: '#22c55e'}}>假設我的客戶族群大多在東南亞</span>」為發想去選擇 region 的，所以我把 Linode 與 AWS 的資源都放在新加坡，離使用者近一點，存取速度也會更即時。

| Provider | Region | 用途 |
| :---: | --- | --- |
| Linode | `ap-south` | LKE、OpenVPN 與相關網路資源 |
| AWS | `ap-southeast-1` | S3 與 SSM Parameter Store |
| AWS | Global | IAM 與 GitHub OIDC provider |
