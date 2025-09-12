```bash
#!/bin/bash

# 设置 Git 用户信息
git config user.name "xx"
git config user.email "xx@gmail.com"

echo "Git user.name and user.email set successfully!"

// TODO封装成 CLI 命令


```

```bash
ssh-keygen -t ed25519 -C "sddzxjt1688@gmail.com" -f ~/.ssh/id_ed25519_kryon
code ~/.ssh/config
# 配置多账号切换
Host github-kryon
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_kryon

# 添加公钥到 github
```
