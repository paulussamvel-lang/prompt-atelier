# Prompt Atelier · 提示词翻译工坊

本项目采用 [MIT License](LICENSE) 开源，可免费使用、修改、分发及商用；再分发时须保留版权声明与许可证。

把中文画面描述整理成适合 SDXL、Krea 2 和 MiniMax H3 的英文提示词。本地运行，无需 API Key，无第三方依赖。

## 支持的模型

| 模型 | 输出形式 |
| --- | --- |
| SDXL 1.0 / SDXL Turbo | 英文标签与反向提示词 |
| Pony Diffusion XL | 带评分前缀的英文标签 |
| Krea 2 | CORE、SCALE、MATERIAL、ENVIRONMENT、LIGHT、CAMERA、STYLE 七层 Mega-Stack |
| MiniMax H3 | 画面动作、环境声、背景配乐三个字段 |

支持风格选择、描述片段分析、复制、下载与最近 12 条本地历史记录。

## 在线使用

直接打开 **[提示词翻译工坊网页版](https://paulussamvel-lang.github.io/prompt-atelier/)** 即可使用，无需安装 Node.js、启动服务或配置模型。可将网址加入书签或分享给其他人。

翻译在浏览器内完成，历史记录保存在当前浏览器。在线版与之前的 localhost 地址使用各自独立的本地历史记录。

## 本地启动（可选）

1. 安装 [Node.js](https://nodejs.org/)（建议 20 或更新版本）。
2. 下载仓库，在目录中运行：

   ```sh
   npm start
   ```

3. 打开 [http://127.0.0.1:4173](http://127.0.0.1:4173)。

Mac 也可在终端运行 `bash start-mac.command`，或双击启动脚本；Windows 可双击 `启动提示词翻译器.cmd`。在终端按 Ctrl+C 停止服务。无需运行 `npm install`。

## 使用

输入中文或英文画面描述，选择目标模型和风格，点击翻译。支持 Ctrl+Enter / Command+Enter。结果可编辑后复制或下载。

示例：

```text
一位穿着白色衬衫的年轻女性，坐在窗边阅读，午后的阳光从百叶窗洒进来，安静的室内，胶片摄影，温柔的暖色调，细腻的皮肤质感
```

## 翻译与格式说明

当前版本使用本地词典、短语规则与模板，不调用大语言模型。未识别的描述会在分析区提示待确认，可能不会进入生成结果；复杂中文长句建议拆成短语并检查英文结果。

Krea 2 的七层 Mega-Stack 来自用户指定的结构参考，并非官方强制格式。缺少的层使用通用模板补全，不代表基于上下文的智能推断。

MiniMax H3 当前覆盖 `integrated_multimodal_description`、`overall_soundscape`、`non_diegetic_music` 三个基础字段，默认单镜头。尚未实现完整的图生视频、首尾帧对齐、多镜头时间线与对白标记。

格式来源：[Krea 2 提示词指南](https://github.com/krea-ai/krea-2/blob/main/docs/prompting.md)、[MiniMax H3 提示词指南](https://huggingface.co/MiniMaxAI/MiniMax-H3/blob/main/docs/VIDEO_PROMPT_WRITING_GUIDE_base_en.md)。

## 数据保存

输入与历史记录保存在浏览器本机，不发送到外部服务。清除浏览器站点数据会移除历史记录。本地服务器只监听 `127.0.0.1`。
