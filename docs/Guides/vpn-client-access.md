---
sidebar_position: 2
---

# VPN 使用者登入

本專案因 OpenVPN Server 有設置 Firewall，預設只允許 VPN User 連線（UDP / 1194），沒有另外提供任何外部訪問。

OpenVPN Server 剛部屬好時，無自動提供可用的 VPN Client User，需進入 OpenVPN Admin UI 手動設定，可依照以下流程操作：
<br />

## 將本機 IP 加入 VPN Server 的 Firewall 白名單

<br />

1. 在瀏覽器查詢 <span style={{color: '#38bdf8'}}>`what is my ip`</span>，取得本機對外的 Public IP

<img
  src={require('./images/whatismyip.png').default}
  alt="瀏覽器查詢 what is my ip 取得本機對外的 Public IP"
  width="35%"
/>

:::info
一般家用網路大多沒有申請固定的 Public IP，行動網路也是浮動的 IP，所以 Public IP 隨時有可能會變動，不適合長時間設定。
:::
<br />

2. 登入 Linode 頁面，找到 OpenVPN 的 Firewall

<img
  src={require('./images/page-firewall-list.png').default}
  alt="Linode 頁面中 OpenVPN 的 Firewall 列表"
  width="100%"
  style={{ marginBottom: '30px' }}
/>
 
3. Rule > Inbound Rules > Add An Inbound Rule

<img
  src={require('./images/add-an-inbound-rule.png').default}
  alt="Firewall Rule 頁籤中 Add An Inbound Rule 的位置"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

4. 選擇 HTTPS 類型，加入自己 PC 的 Public IP
  
   因為這裡要訪問的是 OpenVPN 的 Admin UI，所以 port 要設置 OpenVPN Admin UI 的 943。

<img
  src={require('./images/set-inbound-rule-https.png').default}
  alt="設定 Inbound Rule 為 HTTPS 類型並加入本機 Public IP（port 943）"
  width="93%"
  style={{ marginBottom: '30px' }}
/>

5. 確認設定無誤，記得按 `Save` 保存設定

<img
  src={require('./images/save-inbound-rule-https.png').default}
  alt="確認 HTTPS Inbound Rule 設定無誤後按 Save 保存"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

<br />
<br />

## 登入 OpenVPN Admin UI 新增 User

<br />

1. 至 Linode 頁面，取得 OpenVPN Server 的 Public IP

<img
  src={require('./images/linode-node-list-vpn.png').default}
  alt="Linode 頁面中取得 OpenVPN Server 的 Public IP"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

2. 訪問 OpenVPN Admin UI

   ````text
   https://<openvpn-server-public-ip>:943/admin
   ````

   帳號：`openvpn`

   密碼：AWS SSM `/gitops/openvpn-dns/openvpn/ansible/OPENVPN_ADMIN_PASSWORD`
   
<img
  src={require('./images/login-openvpn-admin-ui.png').default}
  alt="OpenVPN Admin UI 登入畫面"
  width="75%"
  style={{ marginBottom: '30px' }}
/>
   
   <br />

3. 新增 VPN Client User

   Users > Add New User

<img
  src={require('./images/openvpn-add-user.png').default}
  alt="OpenVPN Admin UI 的 Users 頁面，點擊 Add New User"
  width="95%"
  style={{ marginBottom: '30px' }}
/>

   此專案在 OpenVPN Server 建置時，已經有先自動新增好 dev、prod User 用的 Group，這裡 Assign to Group 直接選擇既有的 Group `dev-ops` 就好

<img
  src={require('./images/openvpn-set-new-user-group.png').default}
  alt="新增 User 時 Assign to Group 選擇既有的 dev-ops Group"
  width="85%"
  style={{ marginBottom: '30px' }}
/>

   Authentication 區塊，設定好 New Password 後按 `Save`

<img
  src={require('./images/openvpn-set-new-user-password.png').default}
  alt="Authentication 區塊設定 New Password 後點擊 Save"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

4. 下載 VPN Client User Profile 登入用憑證
   
   對剛剛創建的 User 點擊 Download profile 下載 VPN 憑證，會得到一個 `.ovpn` 的檔案，等等會用到

<img
  src={require('./images/openvpn-download-profile.png').default}
  alt="點擊 Download profile 下載 VPN Client User 的 .ovpn 憑證"
  width="95%"
  style={{ marginBottom: '30px' }}
/>

<br />

## 使用 OpenVPN Client 登入

1. 下載 OpenVPN Client & 安裝

<a
  className="button button--primary"
  href="https://openvpn.net/client/"
  target="_blank"
  rel="noopener noreferrer"
>
  OpenVPN Client ↗
</a>
<br />
<br />

2. 打開 OpenVPN Client，選 Upload File，選擇剛剛下載的 VPN 憑證（.ovpn）

<img
  src={require('./images/openvpn-client-initial-page.png').default}
  alt="OpenVPN Client 初始畫面，選擇 Upload File"
  width="40%"
  style={{ marginBottom: '30px' }}
/>

<img
  src={require('./images/openvpn-client-import-profile.png').default}
  alt="OpenVPN Client 匯入下載的 .ovpn 憑證"
  width="40%"
  style={{ marginBottom: '30px' }}
/>

3. Connect VPN

<img
  src={require('./images/openvpn-client-connect.png').default}
  alt="OpenVPN Client 匯入憑證後點擊 Connect"
  width="40%"
  style={{ marginBottom: '50px' }}
/>
<img
  src={require('./images/openvpn-client-enter-password.png').default}
  alt="OpenVPN Client 連線時輸入 User 密碼"
  width="40%"
  style={{ marginBottom: '50px' }}
/>

4. 連線成功後，即可訪問內部的服務，請前往 [存取 ArgoCD UI](./argocd-access.md)。

<img
  src={require('./images/openvpn-client-connect-success.png').default}
  alt="OpenVPN Client 顯示連線成功狀態"
  width="40%"
  style={{ marginBottom: '50px' }}
/>

## 離場清理

<br />

做完 OpenVPN Admin UI 的設置後，記得移除 Linode 上本次建立的 Firewall rule。

<br />
