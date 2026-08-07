// Normalises everything under public/images/ to sane dimensions and weight.
//
// WHY: .github/scripts/issue-to-content.mjs downloads submitted images **raw** —
// whatever the submitter dragged into the issue form lands in the repo as-is.
// That's how public/images/authors/miguez-huashi.jpg ended up at 1080x1080 /
// 833KB for a slot that renders at 104px. Compressing that one file by hand
// would fix today and not tomorrow, so this runs in the submission workflow too.
//
// Idempotent by design: a file already inside both the dimension and the byte
// budget is skipped, never re-encoded. That matters because this runs on every
// submission — repeatedly re-encoding a JPEG would visibly rot it.
//
// The file EXTENSION is never changed: content YAML references images by path
// (cover: '/images/works/x.jpg'), so a .jpg must stay a .jpg.
//
// Run from repo root:
//   node scripts/optimize-images.mjs            # rewrite in place
//   node scripts/optimize-images.mjs --dry-run  # report only, touch nothing
import { readdirSync, statSync, existsSync, renameSync, unlinkSync } from 'node:fs';
import sharp from 'sharp';

// 每个目录的预算:maxPx 是长边上限,maxKB 是「超过就值得重编码」的软阈值
// (尺寸已达标但文件仍然过大的图 —— 通常是质量拉满导出的 —— 也会被处理)。
const BUDGET = {
  authors: { maxPx: 400, maxKB: 60 },   // 头像最大渲染 104px;400 已是现有约定的 2x+
  gallery: { maxPx: 1600, maxKB: 500 }, // 截图会被点开看,留足分辨率
  works: { maxPx: 1200, maxKB: 300 },   // 作品封面只做卡片图
};
const QUALITY = 82;
const ROOT = 'public/images';
const DRY = process.argv.includes('--dry-run');

const kb = (bytes) => bytes / 1024;
const fmt = (bytes) => `${kb(bytes).toFixed(0)}KB`;

let touched = 0;
let saved = 0;

for (const [dir, budget] of Object.entries(BUDGET)) {
  const base = `${ROOT}/${dir}`;
  if (!existsSync(base)) continue;

  for (const file of readdirSync(base).sort()) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const path = `${base}/${file}`;
    const before = statSync(path).size;
    const meta = await sharp(path).metadata();
    const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

    const tooBig = longest > budget.maxPx;
    const tooHeavy = kb(before) > budget.maxKB;
    if (!tooBig && !tooHeavy) {
      console.log(`  skip   ${dir}/${file}  ${meta.width}x${meta.height} ${fmt(before)}`);
      continue;
    }

    const why = [tooBig && `${longest}px > ${budget.maxPx}`, tooHeavy && `${fmt(before)} > ${budget.maxKB}KB`]
      .filter(Boolean).join(', ');
    if (DRY) {
      console.log(`  WOULD  ${dir}/${file}  ${meta.width}x${meta.height} ${fmt(before)}  (${why})`);
      touched++;
      continue;
    }

    // sharp 不能原地读写同一个文件,先写临时文件再替换。
    const tmp = `${path}.opt`;
    let pipeline = sharp(path).rotate(); // rotate() 无参 = 按 EXIF 摆正并丢掉 orientation
    if (tooBig) pipeline = pipeline.resize({ width: budget.maxPx, height: budget.maxPx, fit: 'inside', withoutEnlargement: true });

    // 保持原格式(路径已被 YAML 引用,扩展名不能变)。
    if (/\.png$/i.test(file)) pipeline = pipeline.png({ compressionLevel: 9, palette: true });
    else if (/\.webp$/i.test(file)) pipeline = pipeline.webp({ quality: QUALITY });
    else pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true, progressive: true });

    await pipeline.toFile(tmp);
    const after = statSync(tmp).size;

    // 极少数情况下重编码反而更大(源图本来就压得很好),那就保留原图。
    if (after >= before && !tooBig) {
      unlinkSync(tmp);
      console.log(`  keep   ${dir}/${file}  重编码没变小,保留原图`);
      continue;
    }
    renameSync(tmp, path);
    const out = await sharp(path).metadata();
    console.log(`  opt    ${dir}/${file}  ${meta.width}x${meta.height} ${fmt(before)} → ${out.width}x${out.height} ${fmt(after)}  (${why})`);
    touched++;
    saved += before - after;
  }
}

console.log(`\n${DRY ? '[dry-run] ' : ''}${touched} file(s)${DRY ? ' would be' : ''} optimised` +
  (saved > 0 ? `, ${fmt(saved)} saved` : ''));
