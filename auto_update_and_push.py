import subprocess
import sys
from datetime import datetime
import os

def run_python_script(script_path):
    """运行指定的Python脚本（用于更新JSON文件）"""
    try:
        print(f"[开始] 运行JSON更新脚本: {script_path}")
        # 调用指定的Python脚本，捕获输出和错误
        result = subprocess.run(
            [sys.executable, script_path],  # 使用当前Python环境执行
            check=True,
            capture_output=True,
            text=True
        )
        print(f"[成功] JSON更新脚本执行完成，输出: {result.stdout}")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[失败] JSON更新脚本执行出错: {e.stderr}")
        return False
    except FileNotFoundError:
        print(f"[失败] 找不到指定的脚本文件: {script_path}")
        return False

def git_commit_and_push(commit_msg=None):
    """执行Git提交和推送操作"""
    # 自动生成提交信息（带时间戳）
    if not commit_msg:
        commit_msg = f"自动更新JSON文件 - {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
    
    git_commands = [
        ["git", "add", "."],  # 添加所有修改/新增的文件
        ["git", "commit", "-m", commit_msg],  # 提交
        ["git", "push", "origin", "main"]  # 推送到main分支（若你的分支是master，改成master）
    ]
    
    # 依次执行Git命令
    for cmd in git_commands:
        try:
            print(f"[开始] 执行Git命令: {' '.join(cmd)}")
            result = subprocess.run(
                cmd,
                check=True,
                capture_output=True,
                text=True,
                cwd=os.getcwd()  # 执行目录为脚本所在目录（即你的本地仓库根目录）
            )
            print(f"[成功] Git命令执行完成: {result.stdout}")
        except subprocess.CalledProcessError as e:
            print(f"[失败] Git命令执行出错: {e.stderr}")
            return False
        except Exception as e:
            print(f"[失败] 未知错误: {str(e)}")
            return False
    return True

if __name__ == "__main__":
    # ==================== 请根据你的实际情况修改以下配置 ====================
    # 你之前写的、用于更新JSON文件的Python脚本路径（绝对路径/相对路径都可以）
    JSON_UPDATE_SCRIPT_PATH = "./generate-icon-list.py"  # 示例路径，替换成你的实际脚本名
    # 自定义提交信息（可选，留空则使用自动生成的带时间戳信息）
    CUSTOM_COMMIT_MSG = ""
    # =======================================================================

    # 步骤1：运行JSON更新脚本
    if not run_python_script(JSON_UPDATE_SCRIPT_PATH):
        print("JSON更新脚本执行失败，终止自动化流程")
        sys.exit(1)
    
    # 步骤2：执行Git提交和推送
    if git_commit_and_push(CUSTOM_COMMIT_MSG):
        print("\n✅ 全部流程完成：JSON文件已更新 + 代码已推送到GitHub")
    else:
        print("\n❌ Git提交/推送失败，请检查仓库状态和网络")
        sys.exit(1)