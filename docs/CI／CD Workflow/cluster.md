---
sidebar_position: 3
---

# Cluster 專案

<img
  src={require('./images/cicd-workflow-s3-bucket.png').default}
  alt="Terraform S3 State Bucket bootstrap 流程"
  width="67%"
  style={{ marginBottom: '30px' }}
/>

此專案是使用 Terraform 做自動化建置的，Terraform state 選擇儲存到 AWS S3，所以 Workflow 第一步會先去建立 S3 Bucket。

<img
  src={require('./images/cicd-workflow-cluster-2.png').default}
  alt="Terraform 存取 Linode 建立 Kubernetes Cluster（LKE）"
  width="70%"
  style={{ marginBottom: '30px' , marginTop: '30px' }}
/>

在 Linode 建立 Kubernetes Cluster、Node 們。

<img
  src={require('./images/cicd-workflow-cluster-3.png').default}
  alt="Terraform 為 Linode Node 設置 Firewall"
  width="79%"
  style={{ marginBottom: '30px' , marginTop: '30px' }}
/>

因 Linode Node 預設都有 Public IP 對外開放，所以另外設置 Firewall 避免直接對外暴露。

<img
  src={require('./images/cicd-workflow-cluster-4.png').default}
  alt="Terraform 為 ArgoCD 建立 Service Account 與 RBAC 授權，並將憑證存入 SSM"
  width="72%"
  style={{ marginBottom: '30px' , marginTop: '30px' }}
/>

為了讓 ArgoCD 有權限對 Kubernetes cluster 們（management cluster、worker cluster）做 GitOps 設定，所以這裡選擇用 ServiceAccount（SA）+ RBAC 的方式給予授權，由 `cluster` 專案創建好，讓 `argocd` 專案讀取。

:::note
實際上 Workflow 還做了很多其他事情，這裡只提核心流程，一些身分驗證、Verify、Health Check 等基本處理就不特別補充了。
:::