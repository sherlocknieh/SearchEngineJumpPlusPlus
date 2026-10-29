#!/usr/bin/env node
/**
 * 发布脚本: 按系统日期时间生成版本号, 校验、构建、提交并打标签。
 *
 * 用法:
 *   pnpm release "feat: 支持 xxx"        # 正常发布
 *   pnpm release "fix: 修复 xxx" --push  # 发布并推送分支与标签
 *   pnpm release --dry-run               # 只打印将要使用的版本号
 *
 * 版本号格式为 YYYY.MM.DD.HHmm (本地时间), 若同一分钟内重复发布或系统时间回拨,
 * 会顺延到比当前版本更大的分钟, 保证版本号始终递增。
 */
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_PATH = path.join(root, 'vite.config.js');
const DIST_PATH = path.join(root, 'dist/SearchEngineJump++.user.js');
const VERSION_PATTERN = /(userscript:\s*\{[\s\S]*?version:\s*')([^']+)(')/;

const argv = process.argv.slice(2);
const flags = new Set(argv.filter((arg) => arg.startsWith('--')));
const push = flags.has('--push');
const dryRun = flags.has('--dry-run');
const message = argv
  .filter((arg) => !arg.startsWith('--'))
  .join(' ')
  .trim();

const pad = (value) => String(value).padStart(2, '0');

function formatVersion(date) {
  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
    `${pad(date.getHours())}${pad(date.getMinutes())}`,
  ].join('.');
}

function compareVersions(a, b) {
  const left = a.split('.').map(Number);
  const right = b.split('.').map(Number);
  for (let i = 0; i < Math.max(left.length, right.length); i += 1) {
    const x = left[i] ?? 0;
    const y = right[i] ?? 0;
    if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

function run(command, args, description) {
  console.log(`\n▶ ${description}`);
  const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`${description} 失败 (退出码 ${result.status})`);
}

const configSource = readFileSync(CONFIG_PATH, 'utf8');
const matched = configSource.match(VERSION_PATTERN);
if (!matched) {
  console.error('未能在 vite.config.js 中找到 userscript.version');
  process.exit(1);
}

const previousVersion = matched[2];
const now = new Date();
let version = formatVersion(now);
while (compareVersions(version, previousVersion) <= 0) {
  now.setMinutes(now.getMinutes() + 1);
  version = formatVersion(now);
}

const subject = message || `chore: 发布版本 ${version}`;
const commitMessage = subject.includes(version) ? subject : `${subject}\n\n发布版本: ${version}`;

console.log(`当前版本: ${previousVersion}`);
console.log(`发布版本: ${version}`);
if (dryRun) {
  console.log('\n(dry-run) 未做任何修改');
  process.exit(0);
}

const nextConfig = configSource.replace(
  VERSION_PATTERN,
  (_match, prefix, _version, suffix) => `${prefix}${version}${suffix}`,
);

try {
  writeFileSync(CONFIG_PATH, nextConfig);

  const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
  run(pnpm, ['lint'], '代码检查 (pnpm lint)');
  run(pnpm, ['test'], '单元测试 (pnpm test)');
  run(pnpm, ['build'], '构建产物 (pnpm build)');

  const distSource = readFileSync(DIST_PATH, 'utf8');
  const distVersion = distSource.match(/\/\/ @version\s+(\S+)/)?.[1];
  if (distVersion !== version) {
    throw new Error(`构建产物版本号不一致: 期望 ${version}, 实际 ${distVersion}`);
  }

  run('git', ['add', '-A'], '暂存改动 (git add -A)');
  run('git', ['commit', '-m', commitMessage], `提交 (${subject})`);
  run('git', ['tag', `v${version}`], `创建标签 v${version}`);

  if (push) {
    run('git', ['push', 'origin', 'HEAD', '--tags'], '推送分支与标签 (git push)');
  }
} catch (error) {
  writeFileSync(CONFIG_PATH, configSource);
  console.error(`\n✗ 发布失败: ${error.message}`);
  console.error('已还原 vite.config.js, 请修复后重试。');
  process.exit(1);
}

console.log(`\n✓ 发布完成: ${version}`);
if (!push) console.log('提示: 使用 --push 可自动推送分支与标签。');
