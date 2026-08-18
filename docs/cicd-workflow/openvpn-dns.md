---
sidebar_position: 2
---

# OpenVPN & DNS 專案

<img
  src={require('./images/cicd-workflow-s3-bucket.png').default}
  alt="OpenVPN／DNS Terraform state backend 流程"
  width="67%"
  style={{ marginBottom: '30px'}}
/>

此專案是使用 Terraform 做自動化建置的，Terraform state 選擇儲存到 AWS S3，所以 Workflow 第一步會先去建立 S3 Bucket。

<img
  src={require('./images/cicd-workflow-openvpn-dns-2.png').default}
  alt="Terraform 透過 Linode Marketplace 建立 OpenVPN Server"
  width="67%"
  style={{ marginBottom: '30px' , marginTop: '30px' }}
/>

Linode 有提供 Marketplace 快速安裝 OpenVPN 的功能，所以這裡使用 Marketplace 安裝，Linode 會自動建立一個 Node 在裡面安裝 OpenVPN，並幫你做一些基礎設定。

<img
  src={require('./images/cicd-workflow-openvpn-dns-3.png').default}
  alt="在 OpenVPN Node 上安裝 Internal DNS Server（dnsmasq）"
  width="72%"
  style={{ marginBottom: '30px' , marginTop: '30px'}}
/>

這個 DNS 是 for 內部管理服務（ArgoCD UI）使用的，因為內部管理服務沒有要對外開放，所以需自架 Internal DNS Server。此專案為求簡化設定，將 DNS Server 與 OpenVPN 安裝在同台 Node 中。

<img
  src={require('./images/cicd-workflow-openvpn-dns-4.png').default}
  alt="Terraform 為 OpenVPN Node 設置 Firewall"
  width="75%"
  style={{ marginBottom: '30px' , marginTop: '30px'}}
/>

因 Linode Node 預設都有 Public IP 對外開放，所以另外設置 Firewall 避免直接對外暴露。

<img
  src={require('./images/cicd-workflow-openvpn-dns-5.png').default}
  alt="Terraform 建立 VPN Access Profile，並將帳密存入 SSM Parameter Store"
  width="42%"
  style={{ marginBottom: '30px', marginTop: '30px' }}
/>

創建 GitHub Runner 用的 VPN User 帳號，統一存到 AWS SSM，在 AWS OIDC IAM Role 再個別設置每個專案允許存取哪些 Parameter 的權限。


<img
  src={require('./images/cicd-workflow-openvpn-dns-manual.png').default}
  alt="ArgoCD endpoint 同步至 OpenVPN／DNS 的流程"
  width="45%"
  style={{ marginBottom: '30px', marginTop: '30px' }}
/>

這個 Workflow 是<span style={{color: '#eab308'}}>人工手動執行</span>的，需等 ArgoCD 建置完畢，此專案才能將他的 Domain & IP 設定進 dnsmasq。

:::note
實際上 Workflow 還做了很多其他事情，這裡只提核心流程，一些身分驗證、Verify、Health Check 等基本處理就不特別補充了。
:::