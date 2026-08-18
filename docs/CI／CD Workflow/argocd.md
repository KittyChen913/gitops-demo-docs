---
sidebar_position: 4
---

# ArgoCD 專案

<img
  src={require('./images/cicd-workflow-s3-bucket.png').default}
  alt="ArgoCD Terraform S3 backend 前置關係"
  width="65%"
  style={{ marginBottom: '30px' }}
/>

此專案是使用 Terraform 做自動化建置的，Terraform state 選擇儲存到 AWS S3，所以 Workflow 第一步會先去建立 S3 Bucket。

<img
  src={require('./images/cicd-workflow-argocd-2.png').default}
  alt="Terraform 用 Service Account 存取 management cluster 並安裝 ArgoCD"
  width="65%"
  style={{  marginBottom: '30px' , marginTop: '30px' }}
/>

使用 `cluster` 專案建立的 management 用 SA + RBAC 憑證，進 management cluster 安裝 ArgoCD。

<img
  src={require('./images/cicd-workflow-argocd-3.png').default}
  alt="Terraform 用 Service Account 讓 ArgoCD 在 management cluster 中註冊 worker cluster"
  width="65%"
  style={{  marginBottom: '30px' , marginTop: '30px' }}
/>

使用 `cluster` 專案建立的 worker 用 SA + RBAC 憑證，在 management cluster 中讓 ArgoCD 註冊 worker cluster。

<img
  src={require('./images/cicd-workflow-argocd-4.png').default}
  alt="Terraform 建立 ArgoCD Application yaml，之後交由 ArgoCD 自行監管自己"
  width="67%"
  style={{  marginBottom: '30px' , marginTop: '30px' }}
/>

在這個專案中，我只讓 Terraform 負責做<span style={{ color: '#4ADE80' }}>第一次的安裝</span>，後續的更新我直接讓 ArgoCD 自己監控自己 yaml 的變化，之後只要改 yaml，就會自動更新。

<img
  src={require('./images/cicd-workflow-argocd-5.png').default}
  alt="Terraform 建立 Root Application（App of Apps），託管 apps repo 並建立 ApplicationSet"
  width="67%"
  style={{  marginBottom: '30px' , marginTop: '30px' }}
/>

最後指定 ArgoCD 去監控 `apps` 專案，一旦 `apps` 專案有任何 change，都會自動更新相關的部屬資源。

:::note
實際上 Workflow 還做了很多其他事情，這裡只提核心流程，一些身分驗證、Verify、Health Check 等基本處理就不特別補充了。
:::