---
sidebar_position: 14
---

# 後續規劃

看到這裡，應該有人已經發現了，其實目前這套架構還缺少「自動更新 Docker image tag」的流程。

在自動更新機制完成之前，還是得先手動 git commit 調整才能更新 image tag。

目前 VPN Client User 的手動設置流程也還很繁瑣，不太方便。

這個專案不會是最終版本，會持續優化與調整，之後預計會再推出：

- **<span style={{color: '#38bdf8'}}>導入 ArgoCD Image Updater</span>**：把 image tag 更新自動化，不用再手動 commit
- **<span style={{color: '#38bdf8'}}>持續重構</span>**：專案裡還有不少地方寫得比較亂、不夠彈性，之後想朝模組化的方向調整，把重複的邏輯抽出來，讓不同組別可以共用
- **<span style={{color: '#38bdf8'}}>VPN Client 自動核發</span>**：打算再開一個 `gitops-demo-user-provisioning` repo，把核發 VPN Client User 這件事也自動化

謝謝看到這裡的大家～！
