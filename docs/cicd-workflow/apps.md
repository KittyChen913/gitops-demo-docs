---
sidebar_position: 5
---

# Apps 專案

<img
  src={require('./images/cicd-workflow-apps.png').default}
  alt="CI/CD Workflow Apps"
  width="55%"
  style={{ marginBottom: '50px' }}
/>

此專案遵循 GitOps 理念，用 Git 當作唯一事實來源（Single Source of Truth）來管理基礎設施與應用程式部署。

這裡的 apps 專案就是那個 Git 來源，裡面放置各服務（Backend、Frontend）的 K8s Manifest，受 ArgoCD 監控。這個專案不用做任何部屬 Workflow，只要將 change 進 Git，ArgoCD 那邊就會自動為你更新相關服務的內容。

:::note
GitHub Actions 只有基本的程式碼驗證型 Job
:::
