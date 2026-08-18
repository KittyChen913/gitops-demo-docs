---
sidebar_position: 0
---

# CI/CD Workflow 總覽

在此架構中是使用 GitOps 的部屬流程，使用的 GitOps Tool 是 ArgoCD。

這裡會先說明 GitOps 與傳統 CI/CD 的整體差異，各 repo 的細節流程請參考本章節其他頁面。

<br />

## 傳統的 CI/CD 流程

<img
  src={require('./images/traditional-ci-cd.png').default}
  alt="Traditional CI/CD"
  width="87%"
  style={{ marginBottom: '30px' }}
/>

在傳統的 CI/CD 流程，是將 CI 跟 CD 耦合在同一個 Workflow，這種部屬方式有幾個缺點：
1. 一旦途中有問題（Ex：CI Job success，但 CI Job failed），都要全部重跑一次
2. 要是有人在 Server 手動異動了 k8s cluster 的任何資源設定，不會有人發現 k8s manifest 與線上的狀態不同

<br />

## GitOps 流程

GitOps 與傳統 CI/CD 的部屬流程不同，GitOps 會將 CI 與 CD 拆分開來。

<img
  src={require('./images/gitops-ci.png').default}
  alt="GitOps 的 CI 流程：push code 觸發 GitHub Actions 測試、建置並推送 image"
  width="72%"
/>

<img
  src={require('./images/gitops-cd.png').default}
  alt="GitOps 的 CD 流程：ArgoCD 監控 K8s manifest repo 並同步至 kubernetes cluster"
  width="60%"
  style={{ marginBottom: '30px' }}
/>

將 Application 與 k8s manifest 拆分成不同專案，就可以讓他們給不同的 Team 維護，Backend／Frontend 人員可以專心開發自己的程式碼，不需要了解怎麼維護 k8s manifest。

統一讓維運人員管理各服務的 k8s manifest，這個存放 k8s manifest 的專案還能提供給 GitOps 監控。由 GitOps Tool（ArgoCD）去定期確認 Git 內的狀態，k8s manifest 專案一旦有 change commit，就能立刻同步至 k8s 環境中。

要是有人手動去更改環境上的 k8s，GitOps Tool 能立刻檢測出狀態不同，把 k8s 恢復成 Git 定義的狀態，確保線上環境與 Git 永遠同步，方便將狀態異動集中控管。