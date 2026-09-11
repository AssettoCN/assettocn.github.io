// Renders the submission PR description from the JSON summary that
// issue-to-content.mjs wrote to REVIEW_FILE, into PR_BODY_FILE.
//
// Runs after scripts/optimize-images.mjs, so the image sizes it reports are the
// ones that get committed. Before this, the PR body was a single file path, and
// problems like unsplit skill tags or non-URL links went unnoticed in review.
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { BUDGET } from '../../scripts/image-budget.mjs';

const r = JSON.parse(readFileSync(process.env.REVIEW_FILE, 'utf8'));

// 表单内容是投稿者写的:转义 Markdown / HTML;@ 后插零宽空格,免得 PR 描述里 @ 到别人;
// 换行转 <br> 才能放进表格。
const esc = (s) => String(s)
  .replace(/[\\`*_[\]<>#|~&]/g, '\\$&')
  .replace(/@/g, '@​')
  .replace(/\r?\n/g, '<br>');
const clip = (s, max = 800) => { const a = Array.from(String(s)); return a.length > max ? `${a.slice(0, max).join('')}…` : String(s); };
const kb = (bytes) => bytes / 1024;

const warnings = [...r.warnings];
const images = r.images.map((img) => {
  const bytes = existsSync(img.path) ? statSync(img.path).size : 0;
  const budget = BUDGET[img.dir];
  const over = Boolean(budget) && kb(bytes) > budget.maxKB;
  if (over) {
    // optimize-images.mjs 不改扩展名(YAML 按路径引用),PNG 格式的照片往往压不进预算
    const hint = img.path.endsWith('.png') ? '(PNG 照片很难压小,可以请投稿者换成 JPG 重新上传)' : '';
    warnings.push(`「${img.label}」压缩后仍有 ${kb(bytes).toFixed(0)}KB,超过预算 ${budget.maxKB}KB${hint}`);
  }
  return { ...img, bytes, budget, over };
});

const out = [
  `由投稿 #${r.issue} 自动生成 · 类型 \`${r.kind}\` · 投稿账号 \`${r.submitter || '未知'}\``,
  `Auto-generated from submission #${r.issue}.`,
  '',
  `Closes #${r.issue}`,
  '',
];
// notice 由脚本拼出(账号名、条目 id 都已限定字符),本身带 Markdown,不转义
if (r.notice) out.push('> [!WARNING]', `> ${r.notice}`, '');

out.push('### 自动检查', '');
if (warnings.length) out.push(...warnings.map((w) => `- ⚠️ ${esc(w)}`));
else out.push('- ✅ 未发现异常');

out.push('', '### 条目内容', '',
  r.update ? `更新已有条目 \`${r.path}\`。下表是更新后的完整内容,具体改了什么见 **Files changed**。` : `新增 \`${r.path}\`。`,
  '', '| 字段 | 内容 |', '|---|---|',
  ...r.fields.map(([k, v]) => `| ${esc(k)} | ${esc(clip(v))} |`));

if (images.length) {
  out.push('', '### 图片', '', '| 预览 | 文件 |', '|---|---|');
  for (const img of images) {
    const size = `${kb(img.bytes).toFixed(0)}KB${img.budget ? ` · 预算 ${img.budget.maxKB}KB` : ''}${img.over ? ' ⚠️' : ''}`;
    // source 已在下载时校验为 GitHub 附件地址,URL 序列化会把引号编码掉,可以直接放进属性
    out.push(`| <img src="${img.source}" width="240" alt="${img.label}"> | \`${img.path}\`<br>${size} |`);
  }
}

out.push('', '---', '审核合并即上线;合并会自动关闭原 issue。', 'Merge to publish; merging closes the original issue.');
writeFileSync(process.env.PR_BODY_FILE, out.join('\n') + '\n');
console.log(out.join('\n'));
