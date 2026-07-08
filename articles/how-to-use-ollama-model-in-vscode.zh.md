# 如何在 VSCode 使用 Ollama 模型
本篇文章詳細介述如何在 VSCode 中使用 Ollama 加載並啟動 Qwen2.5 創建和編輯文章。


## 環境準備

### 1. 啟動 Docker 容器

首先，你需要啟動一個 [Docker](https://www.docker.com/products/docker-desktop/) 容器來運行 [Ollama](https://ollama.com/) 模型。你可以參考docker網站：

https://hub.docker.com/r/ollama/ollama

或者如果你已經有一個ollama container，可以直接啓動Docker Desktop並運行你現有的ollama container。


### 2. 加載 Qwen2.5 創建器模型
啟動容器後，你可以使用 Ollama 的命令行工具 ollama 加載 Qwen2.5 創建器模型。你可以通過以下命令來加載：

```bash
ollama load qwen-2.5-coder-3b
```
這將在你的 Docker 容器中下載並運行 Qwen2.5 創建器模型。

如果你想從外部加載模型到ollama container，需要使用這個指令

```bash
docker exec -it ollama ollama load qwen-2.5-coder-3b
```
```docker exec -it {ollama}``` 中，```{ollama}```是您的container名字

### 3. 使用 Continue Extension 在 VSCode 中啟動 Ollama 模型
   1. 安裝 [Continue Extension](https://marketplace.visualstudio.com/items?itemName=Continue.continue): 如果你還沒有 Install，可以在 Visual Studio Code 的 Marketplace 中搜索 Continue，然後選擇並安裝。

   2. 配置 Continue: 在 Visual Studio Code 中，找到 Continue 扩展的設定面板。你可以通過按 Ctrl+Shift+P，輸入 Ollama: Configure 來打開設定面板。

   3. 啟動模型: 在設定面板中，選擇 Continue: Ollama, 然後選擇 Qwen2.5-Code-3b。你可以通過點擊面板上的對話框來選擇模型和載入方式。

### 4. 使用 Continue 創建文章
   1. 創建新文件: 在 Visual Studio Code 中，點擊左側的 + 按鈕，然後選擇 Markdown 文件 (md) 或任何其他類型的文件來創建新的文檔。

   2. 使用 Continue 實現功能: 在文檔中，你可以使用 Continue 的功能來生成文章內容。例如，你可以點擊 Continue 組件的對話框，輸入你要撰寫的文章標題和相關資訊，然後選擇 Ollama 模型進行生成。

### 5. 評估與調整
   - 評估生成: 在生成過程中，你可以在 Continue 組件中評估生成的內容。如果有不正確或需要改進的地方，你可以通過點擊對話框中的編輯按鈕來修改生成的內容。
   - 調整模型參數: 如果你需要調高模型的生成品質或優化生成過程，可以根據_CONTINUE 的提示進行調整。

### 6. 模型要求
   - Qwen 2.5 的 coder 模型，context length 可能会有所不同。要获取具体信息，请查看相应的文档或联系开发者。   
   - 此模型能在rtx 2060 6gb vram + 48gb ram 環境下完美運行，實測在問答的過程幾乎以毫無延遲的方式回答。
   - 如果用戶擁有更高配置，推薦使用更强大的模型以加速代碼開發過程。

## 結論
以上是使用 Ollama 模型在 VSCode 中創建文章的基本步驟。通過上述操作，你可以輕鬆地利用 Ollama 的強大功能來生成和編輯文章內容，提升創作效率。如果你在操作過程中遇到任何問題，可以參考 Continue Extension 的官方文档或 Community 門戶以獲取進一步的幫助。

---