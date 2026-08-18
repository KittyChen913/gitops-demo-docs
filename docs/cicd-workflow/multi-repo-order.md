---
sidebar_position: 1
---

# Repository 發布順序與相依關係

<img
  src={require('./images/multi-repo-deploy-order.png').default}
  alt="部署順序：openvpn-dns → cluster → argocd → apps → backend／frontend 的相依關係"
  width="92%"
  style={{ marginBottom: '30px' }}
/>

1️⃣ 和 2️⃣ 他們各會建立不同的 Node，原則上是可以各自部屬的，只不過因為後來的 runner VPN 權限 & Firewall 設置問題，`cluster` 才會需要等待 `openvpn-dns` 的設定。

3️⃣ 因為是安裝在 kubernetes cluster 內的，所以要等 `cluster` 部屬完畢。

4️⃣ 其實沒跑 Workflow 部屬，`apps` 專案是提供給 ArgoCD 監控用的 Git source，這裡把他標為順序 4 只是為了表達他內部的設定需要在這個階段 ready。

5️⃣ 和 6️⃣ 比較特別，他們自身專案內只有 CI Workflow，可以各自發布 docker image，實際上控制他們部屬順序的是 <span style={{color: '#f97316'}}>ArgoCD 的 RollingSync 設定</span>，順序就是 `backend` → `frontend`。

<br />
圖中的 `Sync` 處是指不管哪一邊有新的異動，ArgoCD 都會做一次 Sync，但他不會異動 Git Source，他只會更改 k8s cluster 的狀態，讓他永遠保持跟 Git 上描述的狀態一致。

<br />

:::info
這裡的順序只是代表 Repository 之間的資源關係，並不代表 Workflow 有耦合問題，現階段各專案的 Workflow 是各自執行的。
:::
