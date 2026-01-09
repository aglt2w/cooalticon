import os
import json

# 分类映射（只改这一次，和你想要的分类名对应）
CATEGORY_MAP = {
    "function": "功能标识",
    "category": "服装品类",
    "basic": "基础图标",
    "logo": "LOGO"
}

# 扫描icons文件夹，生成清单
icon_list = []
icons_dir = "./icons"

# 遍历每个分类文件夹
for folder in os.listdir(icons_dir):
    folder_path = os.path.join(icons_dir, folder)
    if not os.path.isdir(folder_path) or folder not in CATEGORY_MAP:
        continue  # 跳过非分类文件夹
    
    # 遍历文件夹里的SVG文件
    for filename in os.listdir(folder_path):
        if filename.endswith(".svg"):
            icon_list.append({
                "folder": folder,
                "filename": filename,
                "category": CATEGORY_MAP[folder],
                "name": filename.replace(".svg", "")
            })

# 写入JSON文件
with open("icon-list.json", "w", encoding="utf-8") as f:
    json.dump(icon_list, f, ensure_ascii=False, indent=2)

print("✅ 图标清单生成完成：icon-list.json")