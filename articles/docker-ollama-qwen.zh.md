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
* GPU：限制显存使用（减少对游戏影响）
* Volume：模型持久化，不随容器删除

---

## 五、安装模型（Qwen2.5-Coder 7B）

```powershell
docker exec -it ollama ollama pull qwen2.5-coder:7b-instruct-q4_K_M
```

首次运行：

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

登录后选择模型：

```
qwen2.5-coder:7b-instruct-q4_K_M
```

---

## 八、日常管理命令

### 启动 / 停止

```powershell
docker start ollama
docker stop ollama
```

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

> 文档维护建议：
>
> * 固定模型版本
> * 不频繁追新
> * 以“可用、稳定”为第一优先级
