---
sidebar_position: 1
---

# 存取 Frontend Web Site

Frontend 走 public NodeBalancer，不需要連上 VPN，如果有購買 Domain 的話直接訪問就好了，但因為我沒買，所以這裡需要手動去取得他的 Public IP，可依照以下流程操作：

<br />

## 取得 Frontend NodeBalancer 的 Public IP

Frontend 沒有像 ArgoCD 一樣把 endpoint 發布到 AWS SSM，需自行到 Linode 頁面查詢。

1. 登入 Linode 頁面，找到 NodeBalancers 列表
   
   找到 port 80 的 NodeBalancer，複製他的 Public IP Address

<img
  src={require('./images/frontend-loadbalance-public-ip.png').default}
  alt="Linode NodeBalancers 列表中 port 80 NodeBalancer 的 Public IP Address"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

<br />

## 開啟 Frontend

```text
http://<frontend-public-ip>
```

<img
  src={require('./images/frontend-ip-access.png').default}
  alt="瀏覽器以 Frontend Public IP 訪問網站畫面"
  width="75%"
  style={{ marginBottom: '30px' }}
/>

<br />

## 以 Domain 測試（選用）

此專案未購買正式的 Domain，Frontend 的 Public DNS 目前只能在本機以 hosts 設定測試用 Domain，詳細架構與限制可查看 [DNS 配置](../dns.md#frontend-external-dns)。

若要用 Domain 在本機測試：

1. 依上一步取得的 Public IP，加入本機 hosts 檔（Windows：`C:\Windows\System32\drivers\etc\hosts`）

<img
  src={require('./images/set-windows-host-domain.png').default}
  alt="在本機 hosts 檔案中加入 Frontend Public IP 與測試用 Domain"
  width="70%"
  style={{ marginBottom: '30px' }}
/>

2. 開啟瀏覽器測試設定的 Domain

<img
  src={require('./images/frontend-domain-access.png').default}
  alt="瀏覽器以設定的測試 Domain 訪問 Frontend 網站畫面"
  width="75%"
  style={{ marginBottom: '30px' }}
/>
