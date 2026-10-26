import { GM_info } from '$';

/**
 * 在控制台打印脚本名称、版本和反馈地址。
 * 输出失败不影响脚本运行，所以整体包在 try/catch 中。
 */
export function printBanner() {
  try {
    const name = GM_info?.script?.name;
    const version = GM_info?.script?.version;
    if (!name) return;
    console.info(
      `\n%c ${name} v${version} \n%c 问题反馈(GitHub):\t\thttps://github.com/MUTED64/SearchEngineJumpPlus/issues/new\t\t\t\t\t\t\t\n%c 问题反馈(GreasyFork):\thttps://greasyfork.org/scripts/454280-searchenginejumpplus-搜索引擎快捷跳转/feedback\t\n`,
      'color:#eee;background:#444;padding:6px 0;border-radius:6px 6px 0 0;',
      'color:#444;background:#eee;padding:6px 0;border-radius:0 6px 0 0',
      'color:#444;background:#eee;padding:6px 0;border-radius:0 0 6px 6px;',
    );
  } catch (e) {
    // ignore
  }
}
