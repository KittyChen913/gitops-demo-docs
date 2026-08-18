---
sidebar_position: 6
---

# Backend & Frontend 專案

<img
  src={require('./images/cicd-workflow-backend.png').default}
  alt="CI/CD Workflow Backend"
  width="80%"
  style={{ marginBottom: '20px' }}
/>

<img
  src={require('./images/cicd-workflow-frontend.png').default}
  alt="CI/CD Workflow Frontend"
  width="80%"
  style={{ marginBottom: '50px' }}
/>

在此架構中，Backend 與 Frontend 不走傳統的部屬流程，只在自己專案的 Workflow 中完成 CI，剩下的交給 GitOps 工具（ArgoCD）。
