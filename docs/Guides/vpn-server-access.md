---
sidebar_position: 4
---

# SSH 登入 OpenVPN Server（管理員）

本專案因 OpenVPN Server 有設置 Firewall，預設只允許 VPN User 連線（UDP / 1194），沒有另外提供任何外部訪問。

如果<span style={{color: '#f97316'}}>管理人員</span>需訪問 OpenVPN Server 內部進行 Debug，可進行以下流程手動操作：
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

4. 選擇 SSH 類型，加入自己 PC 的 Public IP

<img
  src={require('./images/set-inbound-rule-ssh.png').default}
  alt="設定 Inbound Rule 為 SSH 類型並加入本機 Public IP"
  width="93%"
  style={{ marginBottom: '30px' }}
/>

5. 確認設定無誤，記得按 `Save` 保存設定

<img
  src={require('./images/save-inbound-rule-ssh.png').default}
  alt="確認 SSH Inbound Rule 設定無誤後按 Save 保存"
  width="100%"
  style={{ marginBottom: '30px' }}
/>

<br />
<br />

## 在本機設定連線用的 SSH Private Key

<br />

此專案有在建立 OpenVPN Server 時設定好 ssh key、Linux 帳號供測試使用。

請在本機打開終端機，按照以下命令順序操作。
<br />

去 AWS SSM 取得 `/gitops/platform-access/openvpn/ansible/OPENVPN_SSH_PRIVATE_KEY_B64` 內容，設為 b64 變數
````powershell
$b64 = '<OPENVPN_SSH_PRIVATE_KEY_B64>'
````

設定私鑰暫存位置
````powershell
$keyPath = "$env:TEMP\vpnadmin-key"
````

解碼成 SSH private key
````powershell
[IO.File]::WriteAllBytes($keyPath, [Convert]::FromBase64String($b64.Trim()))
````

限縮 SSH private key 檔案權限，如果不把權限鎖緊，SSH 會直接拒絕使用這把 Private Key

````powershell
icacls $keyPath /inheritance:r
icacls $keyPath /grant:r "${env:USERNAME}:(R)"
````

<br />

## 本機 SSH 連線

<br />

1. 至 Linode 頁面，取得 OpenVPN Server 的 Public IP

<img
  src={require('./images/linode-node-list-vpn.png').default}
  alt="Linode 頁面中取得 OpenVPN Server 的 Public IP"
  width="100%"
  style={{ marginBottom: '40px' }}
/>

2. 使用 sudo user 帳號（`vpnadmin`）登入

   ````powershell
   ssh -i $keyPath -o IdentitiesOnly=yes vpnadmin@<openvpn-server-public-ip>
   ````

   執行 sudo 命令時，會需要輸入 `vpnadmin` 的密碼，可去 AWS SSM 取得 `/gitops/platform-access/openvpn/break-glass/VPNADMIN_SUDO_PASSWORD`

   ````powershell
   [sudo] password for vpnadmin:
   ````

<br />

## 常見的 sudo 診斷命令

````powershell
# 1. OpenVPN Access Server 是否正常
sudo systemctl status openvpnas

# 2. OpenVPN Access Server 最近錯誤
sudo journalctl -u openvpnas -n 100 --no-pager

# 3. Firewall 規則
sudo ufw status verbose

# 4. dnsmasq 是否正常
sudo systemctl status dnsmasq

# 5. dnsmasq 最近錯誤
sudo journalctl -u dnsmasq -n 100 --no-pager
````
<br />

## 離場清理

<br />

輸入 `exit` 即可登出。

登出 SSH 後刪除本次建立的暫存檔：

````powershell
Remove-Item $keyPath
````

最後移除 Linode 上本次建立的 Firewall rule。
