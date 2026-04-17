# Docker + Ollama（Qwen2.5-Coder 7B）安装与配置指南

> 适用对象：
>
> * Windows 桌面用户
> * 有 NVIDIA GPU（如 RTX 2060 / 3060 / 4060）
> * 想要 **本地、可控、不影响游戏与日常工作的 LLM Coding Assistant**

本文档记录一套 **稳定、可长期使用** 的配置方案，适合放入 GitHub 作为分享与复现指南。

---

## 一、目标架构概览

```
Windows 11
 ├─ Docker Desktop (WSL2 backend)
 │   ├─ Ollama Container
 │   │   └─ Qwen2.5-Coder 7B (Q4_K_M)
 │   └─ Open WebUI Container (可选)
 └─ Browser / VS Code
```

设计目标：

* Docker 隔离（不污染系统）
* 资源可控（CPU / RAM / GPU 都有限制）
* 不用时可 **一键释放资源**
* 适合 Coding / 学习 / 轻量项目（非全自动 Agent）

---

## 二、前置条件

### 1. 硬件建议

* CPU：6 核以上（4 核也可）
* RAM：16GB（推荐 32GB+）
* GPU：NVIDIA 6GB VRAM（RTX 2060 起）

### 2. 软件要求

* Windows 10 / 11
  * 推荐使用Windows 11，安装wsl会直接是wsl2所以没有这方面问题
  * 使用Windows 10，必须要升级到 build 19045 或更高
* Docker Desktop（启用 WSL2）
* NVIDIA 显卡驱动（支持 CUDA）


确认 Docker 已安装：

```powershell
docker --version
```

---

## 三、WSL2 资源配置（非常重要）

Docker Desktop 使用 WSL2，**Docker 可用的 CPU / RAM 上限 = WSL 分配值**。

### 1. 创建或编辑 `.wslconfig`

路径：

```
C:\Users\<你的用户名>\.wslconfig
```

推荐配置：

```ini
[wsl2]
processors=4
memory=32GB
swap=0
```

说明：

* processors：Docker 可见 CPU 上限
* memory：Docker 总内存上限
* swap=0：避免系统卡顿（推荐）

### 2. 重启 WSL 与 Docker

```powershell
wsl --shutdown
```

然后完全退出并重新打开 Docker Desktop。

验证：

```powershell
docker info | findstr CPU
```

---

## 四、启动 Ollama（Docker）

### 1. 拉取 Ollama 镜像

```powershell
docker pull ollama/ollama
```

### 2. 创建 Ollama 容器（推荐配置）

```powershell
docker run -d `
  --name ollama `
  --memory=14g `
  --memory-swap=14g `
  --cpus=3 `
  --gpus all `
  -e OLLAMA_GPU_OVERHEAD=4096 `
  -p 11434:11434 `
  -v ollama:/root/.ollama `
  ollama/ollama
```

配置说明：

* RAM 上限：14GB（不会预占）
* CPU：3 核
* GPU：限制显存使用（减少对系统影响）
* Volume：模型持久化，不随容器删除

---

## 五、安装模型
（Qwen3-Coder）
```powershell
docker exec -it ollama ollama pull qwen2.5-coder:7b-instruct-q4_K_M
```

（Qwen2.5-Coder 7B）
```powershell
docker exec -it ollama ollama pull qwen2.5-coder:7b-instruct-q4_K_M
```
---

首次运行 （如果使用qwen2.5）：

```powershell
docker exec -it ollama ollama run qwen2.5-coder:7b-instruct-q4_K_M
```

第一次会看到：

```
Launching Qwen2.5-Coder 7B...
```

等待完成即可（只发生一次）。

---

## 六、Ollama 使用方式

### 1. CLI（命令行）

```powershell
docker exec -it ollama ollama run qwen2.5-coder:7b-instruct-q4_K_M
```
使用batch file 预加载 <code>docker exec -it ollama</code>会更有效率，无论是要检查ollama model list或加载model都会更加方便。

例子：
```
:LOADCOMMAND
echo.
echo Load ollama command...
set /p command=Enter the ollama command to run (e.g., "ollama run llama2:13b --gpu --listen"):
echo Running command: %command%
docker exec -it ollama %command%
pause
```
可以结合菜单，加上其他常用命令配合日常使用，比如 ```ollama list``` 。

### 2. API（供工具 / UI 使用）

Ollama API 地址：

```
http://localhost:11434
```

访问该地址显示：

```
Ollama is running
```

是**正常现象（健康检查）**。

---

在之后的日常使用，其实如果不需要 pull 新 model，也可以不用打开powershell或cmd。

日常使用步骤：
- 打开 docker desktop 软件
- 点击启动 ollama 容器
- 点击启动 web ui 容器


之后可以在web ui里面 switch 已经pull好的model

请理解镜像以及容器的分别，您可以在 docker 的教学里学习。

---

## 七、安装 Web Chat UI（可选）

推荐使用 **Open WebUI**。

### 1. 拉取镜像

```powershell
docker pull ghcr.io/open-webui/open-webui:main
```

### 2. 启动 WebUI

```powershell
docker run -d `
  --name open-webui `
  -p 3000:8080 `
  -e OLLAMA_BASE_URL=http://host.docker.internal:11434 `
  -v open-webui:/app/backend/data `
  ghcr.io/open-webui/open-webui:main
```

### 3. 使用

浏览器打开：

```
http://localhost:3000
```

---

## 八、日常管理命令

### 启动 / 停止

```powershell
docker start ollama
docker stop ollama
```
*也可以用软件启动

### 查看状态

```powershell
docker stats ollama
nvidia-smi
```

### 修改 CPU 限制（无需重建）

```powershell
docker update --cpus=3 ollama
docker restart ollama
```

---

## 九、为什么 RAM 没用满？（FAQ）

这是**正常行为**：

* Docker 的 `--memory` 是上限，不是预分配
* 7B Q4 模型实际只需要 ~6–8GB RAM
* GPU 分担了大量计算

> RAM 用得刚好 = 系统健康

---

## 十、适用与不适用场景

### 适合：

* Coding Assistant
* 学习 LLM / Prompt / Tool
* 本地私有模型
* 稳定使用

### 不适合：

* 全自动 Coding Agent
* 多模型并行
* 超长上下文（16k+）

---

## 十一、总结

这是一套：

* **工程化**
* **稳定**
* **可控**
* **不折腾**

的本地 LLM Docker 使用方案。

适合长期保留在 GitHub，作为：

* 个人笔记
* 分享给朋友
* 本地 AI 项目基础设施

---
模型推荐：

* qwen3.5:4b    
  https://ollama.com/library/qwen3.5:4b
   ```
   ollama run qwen3.5:4b
   ```
* qwen3:4b    
  https://ollama.com/library/qwen3:4b
   ```
   ollama run qwen3:4b
   ```
* qwen2.5-coder:7b
  https://ollama.com/library/qwen2.5-coder
   ```
   ollama run qwen2.5-coder
   ```
其他模型
- freehuntx/qwen3-coder:8b
- qwen3:4b-q4_K_M
- qwen2.5-coder:7b-instruct-q4_K_M

请注意如果是使用docker，在cmd或powershell使用时记得添加前缀
```
docker exec -it ollama
```
完整代码示范
```
docker exec -it ollama ollama run qwen2.5-coder
```


可以用这个网站测试硬件支持的模型   
https://www.canirun.ai/
这个网页的模型只供参考，最新的模型请到 [ollama library](https://ollama.com/library) 网页查看。   
推荐直接选择60分以上的模型(S/A/B)，因为速度远比所有事情更加重要。   
当然也推荐在能力范围里选择比较新的模型，因为新模型架构通常会已经优化过，在各类性能都会比上一代更佳。   
另外，如果只是使用在代码，推荐选择代码专用模型 - https://www.canirun.ai/?use=code

---

## Reference

* api app (container + model) : https://docs.ollama.com/

* web ui app : https://docs.openwebui.com/

* docker (app control) : https://docs.docker.com/get-started/

---
