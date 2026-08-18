---
sidebar_position: 3
---

# Cluster 拆分

<img
  src={require('./images/cluster-architecture.png').default}
  alt="Dev／Prod 各自的 Management Cluster 與 Worker Cluster 架構"
  width="92%"
  style={{ marginBottom: '50px' }}
/>

在此專案中有 2 種 cluster：

1. management clster
2. worker cluster

management cluster 會每個 Environment 都各一個，裡面主要放置 ArgoCD 這種管理用的服務。

worker cluster 是規劃每個 Team 都擁有自己的 cluster，在 demo 專案中只實作一個 Team。
