---
sidebar_position: 10
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 各 Repo 的 OIDC IAM Role

每個 GitHub Actions OIDC Role 包含兩個 Policy：

- **Trust Policy**：決定哪些 GitHub OIDC subjects 可以呼叫 `sts:AssumeRoleWithWebIdentity`
- **Inline Permissions Policy**：決定 Role 可操作哪些 AWS resources

<Tabs className="unique-tabs">
  <TabItem value="openvpn-dns">

<Tabs className="unique-tabs">
  <TabItem value="trust-policy" label="Trust Policy">
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ExactSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": "repo:KittyChen913@<OWNER_ID>/gitops-demo-openvpn-dns@<REPO_ID>:ref:refs/heads/master"
        }
      }
    },
    {
      "Sid": "TagSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:KittyChen913@<OWNER_ID>/gitops-demo-openvpn-dns@<REPO_ID>:ref:refs/tags/v*"
        }
      }
    }
  ]
}
```

  </TabItem>
  <TabItem value="inline-permissions-policy" label="Inline Permissions Policy">

  ```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "BootstrapTfstateBucket",
			"Effect": "Allow",
			"Action": [
				"s3:CreateBucket",
				"s3:GetBucketVersioning",
				"s3:PutBucketVersioning",
				"s3:GetEncryptionConfiguration",
				"s3:PutEncryptionConfiguration",
				"s3:GetBucketPublicAccessBlock",
				"s3:PutBucketPublicAccessBlock"
			],
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate"
		},
		{
			"Sid": "ListPlatformAccessStateOnly",
			"Effect": "Allow",
			"Action": "s3:ListBucket",
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate",
			"Condition": {
				"StringLike": {
					"s3:prefix": [
						"gitops-demo-openvpn-dns/shared/base/*",
						"gitops-demo-openvpn-dns/shared/credential-bootstrap/*"
					]
				}
			}
		},
		{
			"Sid": "ReadWritePlatformAccessState",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:PutObject"
			],
			"Resource": [
				"arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-openvpn-dns/shared/base/terraform.tfstate",
				"arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-openvpn-dns/shared/credential-bootstrap/terraform.tfstate"
			]
		},
		{
			"Sid": "ManagePlatformAccessStateLock",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:PutObject",
				"s3:DeleteObject"
			],
			"Resource": [
				"arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-openvpn-dns/shared/base/terraform.tfstate.tflock",
				"arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-openvpn-dns/shared/credential-bootstrap/terraform.tfstate.tflock"
			]
		},
		{
			"Sid": "ReadPlatformAccessParameters",
			"Effect": "Allow",
			"Action": "ssm:GetParameter",
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/shared/LINODE_TOKEN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/shared/OPENVPN_CONTACT_EMAIL",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_ADMIN_PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PRIVATE_KEY_B64",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PUBLIC_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_HOST_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_PUBLIC_EGRESS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_CLIENT_CIDR",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DNS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DOMAIN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/platform/argocd/ENDPOINT_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/platform/argocd/ENDPOINT_HOSTNAME",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/platform/argocd/ENDPOINT_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/platform/argocd/ENDPOINT_HOSTNAME",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PASSWORD"
			]
		},
		{
			"Sid": "ManagePlatformAccessParameters",
			"Effect": "Allow",
			"Action": [
				"ssm:PutParameter",
				"ssm:ListTagsForResource",
				"ssm:AddTagsToResource",
				"ssm:RemoveTagsFromResource"
			],
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_ADMIN_PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PRIVATE_KEY_B64",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PUBLIC_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_HOST_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/break-glass/VPNADMIN_SUDO_PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_PUBLIC_EGRESS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_CLIENT_CIDR",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DNS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DOMAIN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PASSWORD"
			]
		},
		{
			"Sid": "DescribeSSMParameters",
			"Effect": "Allow",
			"Action": "ssm:DescribeParameters",
			"Resource": "*"
		},
		{
			"Sid": "DeletePlatformAccessParameters",
			"Effect": "Allow",
			"Action": "ssm:DeleteParameter",
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_ADMIN_PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PRIVATE_KEY_B64",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_PUBLIC_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/ansible/OPENVPN_SSH_HOST_KEY",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/openvpn/break-glass/VPNADMIN_SUDO_PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_PUBLIC_EGRESS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_CLIENT_CIDR",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DNS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DOMAIN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PASSWORD",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PASSWORD"
			]
		}
	]
}
```

  </TabItem>
</Tabs>

  </TabItem>

  <TabItem value="cluster">

<Tabs className="unique-tabs">
  <TabItem value="trust-policy" label="Trust Policy">

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ExactSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": [
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-cluster@<REPO_ID>:environment:dev",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-cluster@<REPO_ID>:environment:prod",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-cluster@<REPO_ID>:pull_request",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-cluster@<REPO_ID>:ref:refs/heads/master"
          ]
        }
      }
    },
    {
      "Sid": "TagSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:KittyChen913@<OWNER_ID>/gitops-demo-cluster@<REPO_ID>:ref:refs/tags/v*"
        }
      }
    }
  ]
}
```

  </TabItem>
  <TabItem value="inline-permissions-policy" label="Inline Permissions Policy">

  ```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "TfstateBucketManageAccess",
			"Effect": "Allow",
			"Action": [
				"s3:ListBucket",
				"s3:CreateBucket",
				"s3:GetBucketVersioning",
				"s3:PutBucketVersioning",
				"s3:GetEncryptionConfiguration",
				"s3:PutEncryptionConfiguration",
				"s3:GetBucketPublicAccessBlock",
				"s3:PutBucketPublicAccessBlock"
			],
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate"
		},
		{
			"Sid": "TfstateClusterObjectAccess",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:PutObject",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-cluster/*"
		},
		{
			"Sid": "SSMClusterParameterReadWrite",
			"Effect": "Allow",
			"Action": [
				"ssm:PutParameter",
				"ssm:GetParameter",
				"ssm:GetParameters",
				"ssm:GetParametersByPath",
				"ssm:DeleteParameter",
				"ssm:AddTagsToResource",
				"ssm:ListTagsForResource"
			],
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/clusters/*",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/clusters/*"
			]
		},
		{
			"Sid": "SSMSharedLinodeTokenRead",
			"Effect": "Allow",
			"Action": "ssm:GetParameter",
			"Resource": "arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/shared/LINODE_TOKEN"
		},
		{
			"Sid": "SSMAutomationVpnIdentityRead",
			"Effect": "Allow",
			"Action": "ssm:GetParameter",
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_PUBLIC_EGRESS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-cluster/PASSWORD"
			]
		},
		{
			"Sid": "SSMDescribeParameters",
			"Effect": "Allow",
			"Action": "ssm:DescribeParameters",
			"Resource": "*"
		}
	]
}
```

  </TabItem>
</Tabs>

  </TabItem>
  <TabItem value="argocd">

<Tabs className="unique-tabs">
  <TabItem value="trust-policy" label="Trust Policy">

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ExactSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com",
          "token.actions.githubusercontent.com:sub": [
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-argocd@<REPO_ID>:environment:dev",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-argocd@<REPO_ID>:environment:prod",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-argocd@<REPO_ID>:pull_request",
            "repo:KittyChen913@<OWNER_ID>/gitops-demo-argocd@<REPO_ID>:ref:refs/heads/master"
          ]
        }
      }
    },
    {
      "Sid": "TagSubjects",
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::<AWS_ACCOUNT_ID>:oidc-provider/token.actions.githubusercontent.com"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "token.actions.githubusercontent.com:aud": "sts.amazonaws.com"
        },
        "StringLike": {
          "token.actions.githubusercontent.com:sub": "repo:KittyChen913@<OWNER_ID>/gitops-demo-argocd@<REPO_ID>:ref:refs/tags/v*"
        }
      }
    }
  ]
}
```
  </TabItem>
  <TabItem value="inline-permissions-policy" label="Inline Permissions Policy">

  ```json
{
	"Version": "2012-10-17",
	"Statement": [
		{
			"Sid": "TfstateBucketListAccess",
			"Effect": "Allow",
			"Action": "s3:ListBucket",
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate"
		},
		{
			"Sid": "TfstateInfraObjectAccess",
			"Effect": "Allow",
			"Action": [
				"s3:GetObject",
				"s3:PutObject",
				"s3:DeleteObject"
			],
			"Resource": "arn:aws:s3:::kc-gitops-demo-tfstate/gitops-demo-argocd/*"
		},
		{
			"Sid": "SSMParameterRead",
			"Effect": "Allow",
			"Action": [
				"ssm:GetParameter",
				"ssm:GetParameters",
				"ssm:GetParametersByPath"
			],
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/clusters/*",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/clusters/*",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/shared/LINODE_TOKEN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/INTERNAL_DOMAIN",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/network/VPN_PUBLIC_EGRESS_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PROFILE",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/openvpn-dns/automation/ci-argocd/PASSWORD"
			]
		},
		{
			"Sid": "SSMEndpointReadWrite",
			"Effect": "Allow",
			"Action": [
				"ssm:GetParameter",
				"ssm:PutParameter",
				"ssm:ListTagsForResource",
				"ssm:DeleteParameter"
			],
			"Resource": [
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/platform/argocd/ENDPOINT_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/platform/argocd/ENDPOINT_HOSTNAME",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/platform/argocd/ENDPOINT_IP",
				"arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/prod/platform/argocd/ENDPOINT_HOSTNAME"
			]
		},
		{
			"Sid": "DevArgoCDInitialAdminPasswordEscrow",
			"Effect": "Allow",
			"Action": [
				"ssm:GetParameter",
				"ssm:PutParameter"
			],
			"Resource": "arn:aws:ssm:ap-southeast-1:<AWS_ACCOUNT_ID>:parameter/gitops/dev/platform/argocd/ADMIN_PASSWORD"
		},
		{
			"Sid": "SSMParameterMetadataDescribe",
			"Effect": "Allow",
			"Action": "ssm:DescribeParameters",
			"Resource": "*"
		}
	]
}
```


  </TabItem>
</Tabs>



  </TabItem>
</Tabs>

<br />

Trust Policy 與 Permission Policy 中的 `<AWS_ACCOUNT_ID>`、`<OWNER_ID>`、`<REPO_ID>`，請自行代入實際的 Value。

其中這幾個專案的 OIDC token 皆採用 GitHub 於 2026/7/15 新生效的「[OIDC token immutable subject claims](https://github.blog/changelog/2026-04-23-immutable-subject-claims-for-github-actions-oidc-tokens/)」，sub claim 格式為 `repo:OWNER@OWNER-ID/REPO@REPO-ID:...`，所以需使用下述語法，自行取得 `OWNER_ID`、`REPO_ID` 替換。

<br />

查詢語法（[GitHub CLI](https://cli.github.com/)，需先 `gh auth login`）：

```powershell
# OWNER_ID：三個 repository 共用同一個值
gh api users/KittyChen913 --jq .id

# REPO_ID：須逐一查詢，三個 repository 各不相同
gh api repos/KittyChen913/gitops-demo-argocd --jq .id
gh api repos/KittyChen913/gitops-demo-cluster --jq .id
gh api repos/KittyChen913/gitops-demo-openvpn-dns --jq .id
```

