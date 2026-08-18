---
sidebar_position: 0
sidebar_label: "專案介紹"
---

# GitOps Demo 專案介紹

這是一個以 GitOps 為核心的實作練習專案：透過 ArgoCD 熟悉部署流程、探索 Kubernetes 基礎元件、學習 Terraform IaC 腳本撰寫，並沿途累積更多 Cloud 相關知識。

## 如何閱讀本文件

- 想先了解專案怎麼拆分：[專案拆分](./repo-split.md)
- 想知道用了哪些 Cloud 服務：[Cloud 選擇](./cloud.md)
- 想看 GitOps／ArgoCD 部署流程：[CI/CD Workflow 總覽](<./CI／CD Workflow/overview.md>)
- 想直接動手操作：[快速開始 (Quick Start)](./Guides/quick-start.md)

:::info
因長時間部屬雲端資源需不小花費，本專案平時不會保持上線狀態，通常測試完成後就會執行 `terraform destroy` 收回環境。
:::