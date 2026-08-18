---
sidebar_position: 6
---

# GitHub Runner 的 VPN 權限設置

<br />
這個章節比較特別，由前一個 Firewall 章節中可以看到，Linode 的各 Node 都因為不想暴露在外部而設置了🔥Firewall，但設置了 Firewall 後就會發現有個棘手的問題，當 GitHub Runner 在各 workflow 中想要為 Node 做些什麼事的時候，無法再輕易的訪問。

<img
  src={require('./images/runner-not-access-linode-node.png').default}
  alt="GitHub Runner 因 Firewall 阻擋，無法直接存取 Linode 資源"
  width="75%"
  style={{ marginBottom: '40px', marginTop: '30px' }}
/>

在一般企業中，Runner 通常是公司內部自己架設的，那就沒有這種問題，可以固定為 Runner 那台 Node IP 開 Firewall 白名單就好，但因為此專案使用的是 GitHub 的臨時 Runner，這種 Runner 沒有固定 IP，所以無法為他設置白名單，於是我在此專案嘗試了一種解決方案：<span style={{color: 'orange'}}>設置一個 GitHub Action 用的 VPN Client</span>。

<img
  src={require('./images/runner-vpn-access.png').default}
  alt="GitHub Runner 透過 VPN Client 連線存取 Firewall 後的 Linode 資源"
  width="100%"
  style={{ marginBottom: '40px', marginTop: '30px' }}
/>


在 `openvpn-dns` 專案中，特別增設了 2 個 VPN Client `ci-cluster` & `ci-argocd`，各自用在不同 repo 中，在增設 Firewall 後還有其他 CI/CD Job 需為資源做其他設置的用途。



:::info
我想這種問題也跟 repo 拆分、Workflow Job 拆分、Workflow 順序編排有關，如果要在設置 Firewall 前把所有動作在一個 Job 一次做完，或是不要拆分那麼多個 repo 分別對同資源做事，也可以不用做這種設定，只是全部放在一起 code 有點難看就是了。
加上我認為讓 Node 創建後暴露在外部太久是一件安全性很差的事，才會想要在流程前期就先設置 Firewall。
:::
